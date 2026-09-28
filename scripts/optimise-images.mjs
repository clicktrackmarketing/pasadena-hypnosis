/**
 * Image optimisation pass.
 *
 * WHY THIS EXISTS. A measurement at 375px found the homepage pulling 1,881 KB
 * of images before the visitor had scrolled at all. Two files were most of it:
 * the hero backdrop at 686 KB (a 2000px-wide JPEG shown in a 375px viewport)
 * and the logo at 339 KB — a 940x292 PNG displayed 40px tall, on every page of
 * the site.
 *
 * Run with:  node scripts/optimise-images.mjs
 *
 * WHAT IT DOES
 *   1. Emits a -640 and -1280 variant of every large photo so the markup can
 *      offer a srcset and a phone can take the small one.
 *   2. Re-encodes the logo at a sane size.
 *
 * THE LOGO NEEDS CARE, and the reason is in assets.ts: that PNG is keyed
 * artwork whose white ground was converted to alpha with a deliberate ramp,
 * and a naive resample re-introduces the pale halo that work removed. sharp
 * resizes with premultiplied alpha by default, which is exactly the handling
 * that note calls for — but the output is written to a NEW file rather than
 * over the original, so the 940px master stays on disk and any regression is
 * a one-line revert rather than a re-key.
 *
 * Idempotent: skips any variant already on disk with a newer mtime than its
 * source, so re-running is cheap.
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const UNSPLASH = 'public/assets/unsplash';
const ASSETS = 'public/assets';
const WIDTHS = [640, 960, 1280];

/** Files small enough that a variant would not pay for the extra request. */
const MIN_BYTES = 90 * 1024;

const kb = (n) => Math.round(n / 1024);

/*
 * Both the stock library and the real client photographs. The client files —
 * the portrait, the office, the review screenshots, the certificates — are
 * originals: variants are written BESIDE them and the masters are never
 * overwritten, so any regression is a one-line revert rather than a re-shoot.
 */
const DIRS = [UNSPLASH, ASSETS];

async function variants() {
  const files = [];
  for (const dir of DIRS) {
    for (const f of await fs.readdir(dir)) {
      if (f.endsWith('.jpg') && !/-\d+\.jpg$/.test(f)) files.push([dir, f]);
    }
  }
  let made = 0;
  /** file -> [widths available], written out for the runtime srcset helper. */
  const manifest = {};

  for (const [dir, file] of files) {
    const src = path.join(dir, file);
    const { size } = await fs.stat(src);
    const meta = await sharp(src).metadata();
    if (size < MIN_BYTES) continue;

    const have = [];
    for (const w of WIDTHS) {
      if (meta.width <= w) continue;
      const out = path.join(dir, file.replace(/\.jpg$/, `-${w}.jpg`));
      let exists = false;
      try {
        const [s, o] = await Promise.all([fs.stat(src), fs.stat(out)]);
        exists = o.mtimeMs > s.mtimeMs;
      } catch {
        /* variant does not exist yet */
      }
      if (!exists) {
        await sharp(src).resize({ width: w }).jpeg({ quality: 70, mozjpeg: true }).toFile(out);
        made += 1;
        console.log(`  ${file} -> ${w}w  ${kb(size)}KB -> ${kb((await fs.stat(out)).size)}KB`);
      }
      have.push(w);
    }
    if (have.length) manifest[file] = { widths: have, full: meta.width };
  }

  await fs.writeFile('components/image-variants.json', `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`variants: ${made} written, manifest has ${Object.keys(manifest).length} entries`);
}

async function logo() {
  const src = path.join(ASSETS, 'ff2e93841bed4b4d850a45f41c4e464367617fda3ad45f43c022f354278f2485.png');
  const out = path.join(ASSETS, 'logo-480.png');
  const before = (await fs.stat(src)).size;

  /* 480px wide covers the largest on-screen use (h-10 ≈ 129px wide) at 3x
     device pixel ratio with room to spare. palette:true quantises to an
     indexed PNG, which is where nearly all of the saving comes from on
     flat-ink artwork like this. */
  await sharp(src)
    .resize({ width: 480, fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(out);

  const after = (await fs.stat(out)).size;
  console.log(`logo: ${kb(before)}KB -> ${kb(after)}KB  (${out})`);
}

console.log('optimising images...');
await variants();
await logo();
console.log('done');
