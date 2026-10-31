// Universal Prompt: write a prompt once, get deep links that open it in fourteen AI chats.
// One object: an off-white speech bubble with the cursor lit, and three small bubbles peeling off it.
import { ACCENTS } from '../engine.js';

// a rounded speech bubble, centred, with a tail on the bottom edge pointing down-left
function bubble(THREE, w, h, r, tail) {
  const s = new THREE.Shape(), x0 = -w / 2, y0 = -h / 2, x1 = w / 2, y1 = h / 2;
  s.moveTo(x0 + r, y1);
  s.lineTo(x1 - r, y1); s.absarc(x1 - r, y1 - r, r, Math.PI / 2, 0, true);
  s.lineTo(x1, y0 + r); s.absarc(x1 - r, y0 + r, r, 0, -Math.PI / 2, true);
  if (tail) {
    const tx = x0 + tail.x, tipX = tx + tail.dx, tipY = y0 + tail.dy;
    s.lineTo(tx + tail.w, y0);
    s.quadraticCurveTo(tx + tail.w * 0.35, tipY * 0.55 + y0 * 0.45, tipX, tipY);
    s.quadraticCurveTo(tx - tail.dx * 0.1, y0 + tail.dy * 0.3, tx, y0);
  }
  s.lineTo(x0 + r, y0); s.absarc(x0 + r, y0 + r, r, -Math.PI / 2, -Math.PI, true);
  s.lineTo(x0, y1 - r); s.absarc(x0 + r, y1 - r, r, Math.PI, Math.PI / 2, true);
  s.closePath();
  return s;
}

export default {
  slug: 'universal-prompt',
  title: 'Universal Prompt',
  tagline: 'Write a prompt once, open it in any AI chat',
  echoText: 'PROMPT',
  logo: '/public/projects/universal-prompt.svg',
  accent: ACCENTS.teal,
  key: 3.0, env: 0.1, // exposed for the white body: the rig is balanced for charcoal, so a white at full key and room light clips
  build({ THREE, mat, geo, mesh, group }) {
    const W = 1.9, H = 1.3, D = 0.36, tail = { x: 0.34, w: 0.42, dx: -0.2, dy: -0.34 };
    const body = mesh(geo.extrude(bubble(THREE, W, H, 0.34, tail), D, { bevel: 0.05 }), mat.offwhite({ color: '#e0e0e6' }));
    const cy = -tail.dy / 2; // extrude centres the whole outline, tail included
    const face = (D + 0.1) / 2;
    // two lines of prompt, and the cursor still blinking after the second
    const ink = mat.charcoal({ color: '#2b2b33' });
    const line = (w, x, y) => mesh(geo.extrude([geo.roundRect(w, 0.1, 0.05)], 0.03, { bevel: 0.01 }), ink, { p: [x, y, face + 0.005] });
    const left = -0.6;
    const lines = [line(0.82, left + 0.41, cy + 0.2), line(0.5, left + 0.25, cy - 0.12)];
    const cursor = mesh(geo.extrude([geo.roundRect(0.09, 0.5, 0.035)], 0.045, { bevel: 0.014 }), mat.glow(ACCENTS.teal, { intensity: 2.4 }), { p: [left + 0.5 + 0.1, cy - 0.12, face + 0.01] });
    // three small bubbles leave the top-right corner in an arc, each a little smaller and more turned
    const small = (w, h, d, p, r) => mesh(geo.extrude(bubble(THREE, w, h, w * 0.2, { x: w * 0.18, w: w * 0.22, dx: -w * 0.1, dy: -h * 0.25 }), d, { bevel: d * 0.14 }), mat.charcoal(), { p, r });
    const satellites = [
      small(0.58, 0.42, 0.17, [1.4, cy + 0.94, 0.02], [0, 18, -8]),
      small(0.46, 0.33, 0.14, [1.82, cy + 1.3, -0.06], [0, 32, -14]),
      small(0.36, 0.26, 0.11, [2.18, cy + 1.6, -0.14], [0, 46, -20]),
    ];
    return group([body, ...lines, cursor, ...satellites], { r: [0, -10, 0] });
  },
  cast({ THREE, mat, geo, mesh, group, surface }) {
    // two more chats the prompt opens in, drifting off behind, one each side; plainer than the three on the bubble
    const chat = (w, h, d, p, r) => mesh(geo.extrude(bubble(THREE, w, h, w * 0.2, { x: w * 0.18, w: w * 0.22, dx: -w * 0.1, dy: -h * 0.25 }), d, { bevel: d * 0.14 }), mat.charcoal({ color: '#42424d' }), { p, r });
    const left = chat(0.8, 0.56, 0.2, [-2.2, -0.45, -1.5], [0, 26, 8]);
    const right = chat(0.72, 0.5, 0.18, [2.3, -0.6, -1.8], [0, 152, -6]); // turned round, so its tail points the other way
    return group(surface === 'cover' ? [right] : [left, right]);
  },
};
