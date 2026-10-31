// Rewrite_: practise typing by retyping the books you read.
// One object: an open book resting flat, the first line of the right page retyped in lime with the text cursor
// waiting at its end.
import { ACCENTS } from '../engine.js';

// a page of text as grey word-bars, drawn into a transparent texture; `skip` leaves room for the typed part of line 1
function pageTexture(tex, seed, skip = 0) {
  let r = seed; const rnd = () => (r = (r * 16807) % 2147483647) / 2147483647;
  return tex(512, 670, (ctx, w, h) => {
    ctx.fillStyle = '#7a7a84';
    const m = 30, lh = 46, bar = 15, gap = 14, lines = 13;
    for (let i = 0; i < lines; i++) {
      const y = 36 + i * lh, last = i === lines - 1 || i === 6;
      let x = m + (i === 0 ? skip : i === 7 ? 44 : 0);
      const end = w - m - (last ? 60 + rnd() * 120 : 0);
      while (x < end - 24) {
        const len = Math.min(end - x, 40 + rnd() * 100);
        ctx.beginPath(); ctx.roundRect(x, y, len, bar, bar / 2); ctx.fill();
        x += len + gap;
      }
    }
  });
}

export default {
  slug: 'rewrite',
  title: 'Rewrite_',
  tagline: 'Learn to type by rewriting the books you read',
  echoText: 'REWRITE',
  accent: ACCENTS.lime,
  // the book is propped up 30 degrees towards the camera, so its pages face us
  elevation: 18,
  puddle: 0.12,
  build({ THREE, mat, geo, mesh, group, tex, put }) {
    const cover = mat.charcoal({ color: '#2b2b33' });
    const paper = mat.offwhite({ color: '#bdbdc3', rough: 0.65, clearcoat: 0.08 });
    const lit = mat.glow(ACCENTS.lime, { intensity: 2.0 });
    const PW = 0.84, PH = 1.1, px = PW / 512; // the printed area and its texel size
    const top = 0.165; // top of a page block
    const sheet = (map) => put(new THREE.Mesh(new THREE.PlaneGeometry(PW, PH), mat.print(map, { transparent: true, gloss: 0.05 })), { r: [-90, 0, 0] });
    // a board lying flat, and the page block on it, tilted 4 degrees so the pages rise a little towards the gutter
    const half = (side, map, extra = []) => {
      const board = mesh(geo.box(1.1, 0.07, 1.5, 0.02), cover, { p: [side * 0.55, 0.035, 0] });
      const block = mesh(geo.box(0.98, 0.1, 1.32, 0.025), paper, { p: [side * 0.51, 0.115, 0] });
      const print = sheet(map); print.position.set(side * 0.51, top + 0.002, 0);
      return group([board, group([block, print, ...extra], { p: [0, 0.02, 0], r: [0, 0, -side * 4] })]);
    };
    // the right page: the first line retyped in lime, the cursor right after it
    const typed = 270, m = 30, line1 = -PH / 2 + (36 + 7.5) * px;
    const x0 = 0.51 - PW / 2 + m * px;
    const right = half(1, pageTexture(tex, 7, typed + 30), [
      mesh(geo.box(typed * px, 0.014, 0.05, 0.008), lit, { p: [x0 + typed * px / 2, top + 0.006, line1] }),
      mesh(geo.box(0.026, 0.016, 0.1, 0.006), lit, { p: [x0 + typed * px + 0.024, top + 0.007, line1] }),
    ]);
    const left = half(-1, pageTexture(tex, 3));
    const spine = mesh(geo.box(0.16, 0.085, 1.5, 0.03), cover, { p: [0, 0.0425, 0] });
    return group([left, right, spine], { r: [30, 6, 0] });
  },
  // the cast: two keycaps off the typist's keyboard, E and W, on the left; the next book, closed, on the right
  cast({ mat, geo, mesh, group, surface, size }) {
    const hw = (size.x * 0.906 + size.z * 0.423) / 2;
    const cover = mat.charcoal({ color: '#2b2b33' }), stock = mat.offwhite({ color: '#b0b0b8' }), paper = mat.offwhite({ color: '#bdbdc3', rough: 0.65, clearcoat: 0.08 });
    const ink = mat.charcoal({ color: '#2a2a32' });
    // a legend is a few bars: box bars rotated to run from a to b
    const bar = (a, b, t = 0.034) => {
      const dx = b[0] - a[0], dy = b[1] - a[1];
      return mesh(geo.box(t, Math.hypot(dx, dy) + t * 0.6, 0.02, t / 2), ink, { p: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 0], r: [0, 0, (Math.atan2(-dx, dy) * 180) / Math.PI] });
    };
    const strokes = (pts) => pts.slice(1).map((b, i) => bar(pts[i], b));
    const E = [bar([-0.07, 0.09], [-0.07, -0.09]), bar([-0.07, 0.09], [0.07, 0.09]), bar([-0.07, 0], [0.05, 0]), bar([-0.07, -0.09], [0.07, -0.09])];
    const W = strokes([[-0.1, 0.09], [-0.05, -0.09], [0, 0.03], [0.05, -0.09], [0.1, 0.09]]);
    const keycap = (legend, at) => group([mesh(geo.box(0.44, 0.22, 0.44, 0.06), stock), group(legend, { p: [0, 0.115, 0], r: [-90, 0, 0] })], at);
    const keys = group([
      keycap(E, { p: [-0.26, 0.02, 0.1], r: [0, 14, 0] }),
      keycap(W, { p: [0.26, 0, -0.14], r: [0, -10, 0] }),
    ], { p: [-(hw + 0.55), -0.15, -1.6], r: [32, 20, 0] });
    // the closed book: two boards round a page block, the spine on its left
    const book = group([
      mesh(geo.box(0.76, 0.05, 1.02, 0.015), cover, { p: [0.02, 0.145, 0] }),
      mesh(geo.box(0.7, 0.22, 0.98, 0.01), paper, { p: [0.03, 0, 0] }),
      mesh(geo.box(0.76, 0.05, 1.02, 0.015), cover, { p: [0.02, -0.145, 0] }),
      mesh(geo.box(0.07, 0.34, 1.02, 0.025), cover, { p: [-0.37, 0, 0] }),
    ], { p: [hw + 0.55, -0.15, -1.7], r: [22, -24, 0] });
    return group(surface === 'cover' ? [book] : [keys, book]);
  },
};
