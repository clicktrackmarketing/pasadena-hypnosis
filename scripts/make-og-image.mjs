// Builds public/og-default.jpg, the 1200x630 share card every page uses
// (components/seo.ts OG_IMAGE).
//   node scripts/make-og-image.mjs
//
// The home hero photo (still water under fog), darkened on the left so the
// keyed logo and one line of type read on it. Text is drawn by librsvg, so
// it uses a generic serif/sans fallback rather than the site's webfonts.
import sharp from 'sharp';

const W = 1200;
const H = 630;

const photo = await sharp('public/assets/unsplash/hero-still-water.jpg')
  .resize(W, H, { fit: 'cover', position: 'centre' })
  .toBuffer();

const shade = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
<defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
<stop offset="0" stop-color="#14151d" stop-opacity="0.92"/>
<stop offset="0.6" stop-color="#14151d" stop-opacity="0.55"/>
<stop offset="1" stop-color="#14151d" stop-opacity="0.15"/>
</linearGradient></defs>
<rect width="${W}" height="${H}" fill="url(#g)"/>
<text x="80" y="390" font-family="Georgia, 'Times New Roman', serif" font-size="58" fill="#ffffff">Certified Hypnotherapy</text>
<text x="80" y="458" font-family="Georgia, 'Times New Roman', serif" font-size="58" fill="#ffffff">in South Pasadena</text>
<text x="80" y="530" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#A9C4EE">Jason Meissner  ·  In person or online  ·  (626) 616-0143</text>
</svg>`);

const logo = await sharp('public/assets/logo-480.png').resize({ width: 420 }).toBuffer();

await sharp(photo)
  .composite([
    { input: shade, top: 0, left: 0 },
    { input: logo, top: 110, left: 72 },
  ])
  .jpeg({ quality: 84, progressive: true, mozjpeg: true })
  .toFile('public/og-default.jpg');

console.log('wrote public/og-default.jpg');
