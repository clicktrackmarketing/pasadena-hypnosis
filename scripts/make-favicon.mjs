// Builds the favicon set from one SVG: app/icon.svg, app/apple-icon.png and
// app/favicon.ico (a 32px PNG inside an ICO wrapper).
//   node scripts/make-favicon.mjs
//
// The mark is the logo's spiral "O", in the logo's orange, on the black tile
// the header sets the wordmark on. It is drawn here rather than cut from the
// logo because the logo's spiral is a hairline that vanishes at 16px.
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const spiral = (turns, steps, rIn, rOut) => {
  const pts = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const a = t * turns * Math.PI * 2 - Math.PI / 2;
    const r = rIn + (rOut - rIn) * t;
    pts.push(`${i ? 'L' : 'M'}${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
};

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
<rect width="100" height="100" rx="22" fill="#000"/>
<path d="${spiral(2.25, 240, 3, 36)}" fill="none" stroke="#F2A541" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

writeFileSync('app/icon.svg', svg);
await sharp(Buffer.from(svg)).resize(180, 180).png().toFile('app/apple-icon.png');

const png = await sharp(Buffer.from(svg)).resize(32, 32).png().toBuffer();
const head = Buffer.alloc(22);
head.writeUInt16LE(0, 0); // reserved
head.writeUInt16LE(1, 2); // type: icon
head.writeUInt16LE(1, 4); // one image
head.writeUInt8(32, 6); // width
head.writeUInt8(32, 7); // height
head.writeUInt16LE(1, 10); // colour planes
head.writeUInt16LE(32, 12); // bits per pixel
head.writeUInt32LE(png.length, 14);
head.writeUInt32LE(22, 18); // offset of the PNG
writeFileSync('app/favicon.ico', Buffer.concat([head, png]));
console.log('wrote app/icon.svg, app/apple-icon.png, app/favicon.ico');
