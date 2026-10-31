// Lay out exported banners the way the site shows them, for review.
//
//   node tools/illustrations/review.mjs <dir with exports> [--only a,b] [--out review.png]
//
// One row per project: the cover at 800 x 420, the home carousel card (its own render) at its real 300 x 160, and the
// list strip at its real 592 x 150, on the site's black. Judge the banners here, not in the studio.
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const req = createRequire(import.meta.url);
const sharp = req(process.env.SHARP ?? 'sharp');
const args = process.argv.slice(2);
const dir = path.resolve(args[0]);
const opt = (k, d) => { const i = args.indexOf('--' + k); return i < 0 ? d : args[i + 1]; };
const only = opt('only')?.split(',');
const out = path.resolve(opt('out', path.join(dir, 'review.png')));

const slugs = (await fs.readdir(dir)).filter((f) => f.endsWith('.webp') && !f.includes('-strip') && !f.includes('-card')).map((f) => f.replace('.webp', '')).filter((s) => !only || only.includes(s));
const PAD = 28, ROW = 420 + PAD, W = PAD + 800 + PAD + 300 + PAD + 592 + PAD;
const composites = [];
for (const [i, slug] of slugs.entries()) {
  const y = PAD + i * ROW;
  const cover = await sharp(path.join(dir, `${slug}.webp`)).resize(800, 420).png().toBuffer();
  const cardFile = path.join(dir, `${slug}-card.webp`);
  const card = await sharp(await fs.access(cardFile).then(() => cardFile, () => path.join(dir, `${slug}.webp`))).resize(300, 160, { fit: 'cover', position: 'top' }).png().toBuffer();
  composites.push({ input: cover, left: PAD, top: y }, { input: card, left: PAD * 2 + 800, top: y });
  try {
    const strip = await sharp(path.join(dir, `${slug}-strip.webp`)).resize(592, 210).png().toBuffer();
    composites.push({ input: strip, left: PAD * 3 + 800 + 300, top: y });
  } catch {}
  const label = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="40"><text x="0" y="26" font-family="Inter, Helvetica, sans-serif" font-size="22" fill="#9a9aa2">${slug}</text></svg>`);
  composites.push({ input: label, left: PAD * 2 + 800, top: y + 200 });
}
await sharp({ create: { width: W, height: PAD + slugs.length * ROW, channels: 3, background: '#000000' } }).composite(composites).png().toFile(out);
console.log(out);
