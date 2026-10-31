// Auth UI 2.0: drop-in authentication web components for Appwrite.
// One object: the logo's shield in graphite with its check mark lit, and (on the cover only) the tag you drop in beside it.
import { ACCENTS } from '../engine.js';

// the engine's off-white blows out under the key light and blooms; this reads as off-white on black without crossing the bloom threshold
const IVORY = '#bfbfc5';

const SHIELD = 'M32 12l16 7v11c0 10-6.8 18.6-16 22-9.2-3.4-16-12-16-22V19l16-7z';

export default {
  slug: 'auth-ui-2',
  title: 'Auth UI 2.0',
  tagline: 'Drop-in authentication for Appwrite, as web components',
  echoText: 'AUTH',
  logo: '/public/projects/auth-ui-2.svg',
  accent: ACCENTS.violet,
  rim: 2.3, glow: 0.07, // a graphite shield on black needs its edges drawn and a little more ground light behind it
  build({ mat, geo, mesh, group, label }) {
    const shield = mesh(geo.extrude(geo.svg(SHIELD, 1.7), 0.36, { bevel: 0.05 }), mat.charcoal({ color: '#3c3c48' }), { s: [1.08, 1, 1] });
    // the check mark, drawn in light: straight legs, a soft corner
    const leg = (a, b, n) => Array.from({ length: n }, (_, i) => [a[0] + ((b[0] - a[0]) * i) / n, a[1] + ((b[1] - a[1]) * i) / n, 0]);
    const corner = [-0.1, -0.35, 0], R = 0.08;
    const pts = [...leg([-0.42, -0.02], corner, 4), corner, ...leg(corner, [0.44, 0.32], 6).slice(1), [0.44, 0.32, 0]];
    const lit = mat.glow(ACCENTS.violet, { intensity: 2.4 });
    const check = group([
      mesh(geo.tube(pts, R, { segments: 96 }), lit),
      mesh(geo.sphere(R, 24), lit, { p: pts[0] }),
      mesh(geo.sphere(R, 24), lit, { p: pts[pts.length - 1] }),
    ], { p: [0, -0.02, 0.21] });
    const body = group([shield, check], { r: [-5, -14, 0] });
    // the element you drop in, on the cover only; the type is large enough to read there
    const text = label('<authui-sign-in>', { height: 0.28, color: '#2a2a32', weight: 600 });
    text.position.z = 0.058; // just in front of the chip's face (0.03 + the 0.02 bevel)
    const chip = group([mesh(geo.extrude([geo.roundRect(2.04, 0.48, 0.24)], 0.06, { bevel: 0.02 }), mat.offwhite({ color: IVORY })), text], { p: [1.38, 0.98, 0.32], r: [-6, -14, 0] });
    chip.userData.only = ['cover'];
    return group([body, chip]);
  },
  cast({ mat, geo, mesh, group, surface }) {
    const steel = mat.metal('#cfd2d8', { rough: 0.38 });
    // a small key lying on the left
    const key = group([
      mesh(geo.torus(0.2, 0.06), steel),
      mesh(geo.box(0.8, 0.08, 0.05, 0.02), steel, { p: [0.6, 0, 0] }),
      mesh(geo.box(0.08, 0.16, 0.05, 0.02), steel, { p: [0.86, -0.1, 0] }),
      mesh(geo.box(0.08, 0.12, 0.05, 0.02), steel, { p: [0.7, -0.08, 0] }),
    ], { p: [-1.25, -0.4, -1.4], r: [-42, 0, 26], s: 0.6 });
    // a passkey token on the right: an off-white disc, the fingerprint's ridges in charcoal on its face
    const ink = mat.charcoal({ color: '#2a2a32' });
    const ridge = (r, a0, sweep) => mesh(geo.torus(r, 0.011, (sweep * Math.PI) / 180), ink, { p: [0, -0.01, 0.052], r: [0, 0, a0] });
    const token = group([
      mesh(geo.extrude([geo.circle(0.27)], 0.06, { bevel: 0.016 }), mat.offwhite({ color: IVORY })),
      ridge(0.06, 20, 320), ridge(0.105, 60, 240), ridge(0.15, 100, 320), ridge(0.195, 30, 220),
    ], { p: [1.4, -0.35, -1.6], r: [-8, -26, 10] });
    return group(surface === 'cover' ? [token] : [key, token]);
  },
};
