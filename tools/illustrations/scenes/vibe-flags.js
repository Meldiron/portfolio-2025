// Vibe Flags: feature flags with no server; the toolbar of toggles is the product.
// One object: an off-white toggle switched on, its track lit deep violet, with a flag planted in the knob.
import { ACCENTS } from '../engine.js';

// a pill outline with true semicircular ends
function stadium(THREE, w, h) {
  const s = new THREE.Shape(), r = h / 2, x = w / 2 - r;
  s.absarc(x, 0, r, -Math.PI / 2, Math.PI / 2, false);
  s.absarc(-x, 0, r, Math.PI / 2, Math.PI * 1.5, false);
  s.closePath();
  return s;
}
// a pennant pointing -x from the pole, its edges bowing a little like cloth
function pennant(THREE, len, h) {
  const s = new THREE.Shape();
  s.moveTo(0, h / 2);
  s.quadraticCurveTo(-len * 0.5, h * 0.42, -len, 0);
  s.quadraticCurveTo(-len * 0.5, -h * 0.42, 0, -h / 2);
  s.closePath();
  return s;
}

export default {
  slug: 'vibe-flags',
  title: 'Vibe Flags',
  tagline: 'Feature flags with no server, no config, no build step',
  echoText: 'FLAGS',
  logo: '/public/projects/vibe-flags.svg',
  accent: ACCENTS.blue,
  key: 3.0, env: 0.1, // exposed for the white body: the rig is balanced for charcoal, so a white at full key and room light clips
  bloom: 0.14, // the lane is a large emitter; at the usual bloom its halo turns the white housing lavender
  build({ THREE, mat, geo, mesh, group }) {
    const W = 2.3, H = 1.12, D = 0.4, rim = 0.2, bevel = 0.05;
    const face = (D + 2 * bevel) / 2; // the housing's front face
    const housing = stadium(THREE, W, H);
    housing.holes.push(stadium(THREE, W - 2 * rim, H - 2 * rim));
    const white = mat.offwhite({ color: '#dadae0' });
    const body = mesh(geo.extrude(housing, D, { bevel }), white);
    // the lit lane, just below the face so a thin ring of light shows round the knob; a touch larger than the hole so no seam shows.
    // It is pure light with no albedo, lit low, so the key light cannot wash it from deep violet to lavender.
    const violet = mat.glow(ACCENTS.blue, { intensity: 0.85 }); violet.color.set('#000000');
    const lane = mesh(geo.extrude(stadium(THREE, W - 2 * rim + 0.04, H - 2 * rim + 0.04), 0.3, { bevel: 0.01 }), violet, { p: [0, 0, face - 0.03 - 0.16] });
    // the knob, switched on: at the right end of the lane, standing proud of the face
    const kr = (H - 2 * rim) / 2 - 0.03, kx = W / 2 - rim - (H - 2 * rim) / 2;
    const knobDepth = 0.24, knobBevel = 0.06;
    const knob = mesh(geo.extrude([geo.circle(kr)], knobDepth, { bevel: knobBevel }), white, { p: [kx, 0, face + 0.19 - (knobDepth + 2 * knobBevel) / 2] });
    // the flag planted in the top of the knob, large enough to read on the home card
    const steel = mat.metal('#cfd2d8', { rough: 0.35 });
    const kz = face + 0.19 - (knobDepth + 2 * knobBevel) / 2;
    const poleH = 1.3, len = 0.96, fh = 0.54;
    const pole = mesh(geo.cylinder(0.02, 0.02, poleH), steel, { p: [kx, kr + poleH / 2 - 0.06, kz] });
    const finial = mesh(geo.sphere(0.038, 32), steel, { p: [kx, kr + poleH - 0.06, kz] });
    // extrude centres the pennant, so its root sits at +len/2: shift it so the root meets the pole
    const flag = mesh(geo.extrude(pennant(THREE, len, fh), 0.024, { bevel: 0.008 }), white, { p: [kx - len / 2 + 0.014, kr + poleH - 0.06 - fh / 2 - 0.03, kz] });
    return group([body, lane, knob, pole, finial, flag], { r: [0, -12, 0] });
  },
  cast({ THREE, mat, geo, mesh, group, surface }) {
    const W = 2.3, H = 1.12, D = 0.4, rim = 0.2, bevel = 0.05, face = (D + 2 * bevel) / 2;
    // a second toggle on the left, switched off: charcoal, its lane dark, the knob at the left end
    const housing = stadium(THREE, W, H); housing.holes.push(stadium(THREE, W - 2 * rim, H - 2 * rim));
    const kr = (H - 2 * rim) / 2 - 0.03, kx = W / 2 - rim - (H - 2 * rim) / 2;
    const off = group([
      mesh(geo.extrude(housing, D, { bevel }), mat.charcoal({ color: '#4a4a56' })),
      mesh(geo.extrude(stadium(THREE, W - 2 * rim + 0.04, H - 2 * rim + 0.04), 0.3, { bevel: 0.01 }), mat.charcoal({ color: '#1c1c22' }), { p: [0, 0, face - 0.03 - 0.16] }),
      mesh(geo.extrude([geo.circle(kr)], 0.24, { bevel: 0.06 }), mat.offwhite({ color: '#9a9aa2' }), { p: [-kx, 0, face + 0.01] }),
    ], { p: [-2.05, -0.4, -1.5], r: [0, 20, -4], s: 0.42 });
    // a loose pennant on the right, its pole tipped over
    const steel = mat.metal('#cfd2d8', { rough: 0.35 });
    const poleH = 0.8, len = 0.6, fh = 0.34;
    const flag = group([
      mesh(geo.cylinder(0.014, 0.014, poleH), steel),
      mesh(geo.sphere(0.028, 32), steel, { p: [0, poleH / 2, 0] }),
      mesh(geo.extrude(pennant(THREE, len, fh), 0.02, { bevel: 0.007 }), mat.offwhite({ color: '#dadae0' }), { p: [-len / 2 + 0.01, poleH / 2 - fh / 2 - 0.03, 0] }),
    ], { p: [2.0, 0.25, -1.7], r: [0, -14, -38] });
    return group(surface === 'cover' ? [flag] : [off, flag]);
  },
};
