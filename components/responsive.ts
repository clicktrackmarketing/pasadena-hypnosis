import VARIANTS from './image-variants.json';

/* ---------------------------------------------------------------------------
   RESPONSIVE IMAGE HELPER.

   WHY THIS EXISTS. Measured on a 375px viewport, the homepage pulled 1,881 KB
   of imagery before the visitor scrolled — every file at its desktop size,
   because every <img> on the site was a bare src with no srcset. A phone was
   downloading a 2000px-wide hero to paint it 375px wide.

   `scripts/optimise-images.mjs` emits -640 and -1280 variants beside each
   large original and records what it produced in image-variants.json. This
   reads that manifest and builds the srcset, so the two cannot drift: an image
   without variants silently returns a bare src rather than advertising files
   that are not on disk and 404ing.

   WHY A MANIFEST RATHER THAN next/image. next/image would be the idiomatic
   answer and would also handle AVIF/WebP. It was not used here because the
   whole site is built on plain <img> inside motion wrappers — ClipReveal
   animates a motion.img, Marquee duplicates its children, several backdrops
   are absolutely positioned at h-full — and converting 36 call sites to
   <Image fill> would have been a far larger, riskier change than adding an
   attribute. This is the smaller intervention that captures most of the win.
   If the site later moves to next/image, delete this file and the script.

   `sizes` is the argument that actually decides which file gets downloaded,
   and a wrong `sizes` is worse than none — it will confidently pick the large
   file on a phone. The presets below describe the real CSS widths each kind
   of image occupies on this site.
--------------------------------------------------------------------------- */

type Entry = { widths: number[]; full: number };
const MANIFEST = VARIANTS as Record<string, Entry>;

/**
 * How wide the image actually renders, per breakpoint.
 *
 * These describe the real CSS width, minus the container's own padding —
 * `card` is not "100vw" on a phone because the 1280px container carries px-4,
 * so a full-bleed card is viewport minus 32px. Overstating by even that much
 * pushes a 2x display over a variant boundary and buys a needlessly large
 * file.
 */
export const SIZES = {
  /** Full-bleed section and hero backdrops. */
  full: '100vw',
  /** Cards in a 1 / 2 / 3-up grid inside the 1280px container (px-4 gutters). */
  card: '(min-width: 1024px) 400px, (min-width: 640px) 46vw, calc(100vw - 32px)',
  /** Half-width feature images beside a column of copy. */
  half: '(min-width: 1024px) 620px, calc(100vw - 32px)',
  /** Small tiles — gallery columns, thumbnails. */
  tile: '(min-width: 640px) 260px, 45vw',
  /**
   * Fixed-width cards on a horizontal rail. These are w-[19rem]/sm:w-[21rem],
   * i.e. genuinely 304px and 336px — NOT viewport-relative. Describing them as
   * a vw fraction made a 375px phone ask for 750px and take the full-size
   * original when the card is 304px wide.
   */
  rail: '(min-width: 640px) 336px, 304px',
} as const;

/**
 * Build the srcset for a local /assets/unsplash image.
 * Returns undefined when the file has no variants, which keeps the attribute
 * off the element entirely rather than emitting a one-entry srcset.
 */
export const srcSetFor = (src: string): string | undefined => {
  const file = src.split('/').pop();
  if (!file) return undefined;
  const entry = MANIFEST[file];
  if (!entry) return undefined;
  const base = src.replace(/\.jpg$/, '');
  const parts = entry.widths.map((w) => `${base}-${w}.jpg ${w}w`);
  parts.push(`${src} ${entry.full}w`);
  return parts.join(', ');
};

/** Spread straight onto an <img>: {...responsive(src, 'card')} */
export const responsive = (src: string, kind: keyof typeof SIZES = 'full') => {
  const srcSet = srcSetFor(src);
  return srcSet ? { srcSet, sizes: SIZES[kind] } : {};
};
