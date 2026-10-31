// Render project illustrations to image files.
//
//   node tools/illustrations/export.mjs                      every project
//   node tools/illustrations/export.mjs --only keyds,carden  some projects
//   node tools/illustrations/export.mjs --out <dir> --sheet  also write overview.png for review
//
// Writes <out>/<slug>.webp (1600 x 840: project page), <out>/<slug>-og.jpg (1200 x 630: Open Graph), <out>/<slug>-card.webp
// (600 x 320: the 300 x 160 home carousel card at 2x) and <out>/<slug>-strip.webp (1184 x 420: the
// 592 x 210 list strip at 2x). Both are rendered larger
// and scaled down, for clean edges.
// Needs playwright, sharp and three (devDependencies). Uses the GPU through Metal on macOS;
// set GL=swiftshader to render on the CPU instead.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const req = createRequire(import.meta.url);
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf('--' + k); return i < 0 ? d : args[i + 1]; };
const out = path.resolve(root, opt('out', 'public/projects/illustrations'));
const only = opt('only')?.split(',');
const variant = opt('variant', '');
const sizesWanted = opt('sizes')?.split(',');
const threeDir = process.env.THREE_DIR ?? path.dirname(path.dirname(req.resolve('three')));
const { chromium } = await import(process.env.PLAYWRIGHT ?? 'playwright');
const sharp = req(process.env.SHARP ?? 'sharp');
const SIZES = [
  { suffix: '', surface: 'cover', w: 1600, h: 840, dpr: 2, ow: 1600, oh: 840 },
  { suffix: '-card', surface: 'card', w: 300, h: 160, dpr: 4, ow: 600, oh: 320 },
  { suffix: '-strip', surface: 'strip', w: 592, h: 210, dpr: 4, ow: 1184, oh: 420 },
];

const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png' };
const server = http.createServer(async (rq, rs) => {
  try {
    const u = decodeURIComponent(new URL(rq.url, 'http://x').pathname);
    const file = u.startsWith('/vendor/three/') ? path.join(threeDir, u.slice('/vendor/three/'.length)) : path.join(root, u);
    if (!file.startsWith(root) && !file.startsWith(threeDir)) throw new Error('outside');
    rs.writeHead(200, { 'content-type': types[path.extname(file)] ?? 'application/octet-stream', 'cache-control': 'no-store' });
    rs.end(await fs.readFile(file));
  } catch { rs.writeHead(404); rs.end(); }
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}/tools/illustrations/studio.html`;

const gl = process.env.GL === 'swiftshader' ? ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] : ['--use-angle=metal', '--enable-gpu'];
const browser = await chromium.launch({ args: gl });
const page = await browser.newPage({ viewport: { width: 1700, height: 1000 } });
page.on('pageerror', (e) => console.error('page error:', e.message));
page.on('console', (m) => m.type() === 'error' && console.error('console:', m.text()));
await fs.mkdir(out, { recursive: true });
// every scene file is a project; a broken scene only fails its own render
const slugs = (await fs.readdir(path.join(here, 'scenes'))).filter((f) => f.endsWith('.js') && f !== 'index.js').map((f) => f.slice(0, -3)).sort();
for (const slug of slugs.filter((x) => !only || only.includes(x))) {
  for (const s of SIZES.filter((x) => !sizesWanted || sizesWanted.includes(x.surface))) {
    await page.goto(`${base}?p=${slug}&w=${s.w}&h=${s.h}&dpr=${s.dpr}&surface=${s.surface}&v=${encodeURIComponent(variant)}`);
    await page.waitForFunction(() => window.__done === true, null, { timeout: 120000 });
    const err = await page.evaluate(() => window.__error);
    if (err) { console.error(slug, err); continue; }
    const data = await page.evaluate(() => (document.querySelector('#out') ?? document.querySelector('canvas')).toDataURL('image/png'));
    const png = Buffer.from(data.split(',')[1], 'base64');
    await sharp(png).resize(s.ow, s.oh, { kernel: 'lanczos3' }).webp({ quality: 90, effort: 5 }).toFile(path.join(out, `${slug}${s.suffix}.webp`));
    // the Open Graph image: the cover as a 1200 x 630 JPEG, because not every platform shows WebP previews
    if (s.surface === 'cover') await sharp(png).resize(1200, 630, { kernel: 'lanczos3' }).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(out, `${slug}-og.jpg`));
  }
  process.stdout.write(slug + ' ');
}
if (args.includes('--sheet')) {
  await page.goto(base + `?only=${only ? only.join(',') : ''}&all=1`);
  await page.waitForFunction(() => window.__done === true, null, { timeout: 600000 });
  await page.screenshot({ path: path.join(out, 'overview.png'), fullPage: true });
}
console.log('\ndone:', out);
await browser.close();
server.close();
