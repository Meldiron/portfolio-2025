// HTTP Games: games you play by sending REST requests.
// One object: a charcoal controller with one lit button, and the request it sent hovering above.
import { ACCENTS } from '../engine.js';

function dogbone(THREE, R = 0.66, half = 1.0, h = 0.5) {
  const s = new THREE.Shape();
  const dx = Math.sqrt(R * R - h * h), a = Math.atan2(h, -dx);
  s.moveTo(-half + dx, h); s.lineTo(half - dx, h);
  s.absarc(half, 0, R, a, -a, true);
  s.lineTo(-half + dx, -h);
  s.absarc(-half, 0, R, -(Math.PI - a), Math.PI - a, true);
  return s;
}

export default {
  slug: 'http-games',
  title: 'HTTP Games',
  tagline: 'Games you play by sending REST requests',
  echoText: 'GAMES',
  accent: ACCENTS.cyan,
  build({ THREE, mat, geo, mesh, group, label }) {
    const body = mesh(geo.extrude(dogbone(THREE), 0.34, { bevel: 0.06 }), mat.charcoal());
    const ink = mat.charcoal({ color: '#17171c' });
    const top = 0.235;
    const dpad = group([
      mesh(geo.extrude([geo.roundRect(0.16, 0.5, 0.03)], 0.06, { bevel: 0.02 }), ink),
      mesh(geo.extrude([geo.roundRect(0.5, 0.16, 0.03)], 0.06, { bevel: 0.02 }), ink),
    ], { p: [-1.0, 0, top] });
    const btn = (x, y, m) => mesh(geo.extrude([geo.circle(0.115)], 0.07, { bevel: 0.035 }), m, { p: [1.0 + x, y, top] });
    const quiet = mat.satin('#3b3b45');
    const buttons = [btn(0, 0.24, quiet), btn(-0.24, 0, quiet), btn(0.24, 0, mat.glow(ACCENTS.cyan, { intensity: 2.6 })), btn(0, -0.24, quiet)];
    const pill = (x) => mesh(geo.extrude([geo.roundRect(0.2, 0.065, 0.032)], 0.04, { bevel: 0.015 }), ink, { p: [x, -0.08, top - 0.01], r: [0, 0, 24] });
    const controller = group([body, dpad, ...buttons, pill(-0.17), pill(0.17)], { r: [-24, 0, 0] });
    // the request, hovering over the lit button
    const chipText = label('POST /move', { height: 0.2, color: '#e8f9fd', weight: 600 });
    const chip = group([
      mesh(geo.extrude([geo.roundRect(1.2, 0.36, 0.18)], 0.07, { bevel: 0.025 }), mat.charcoal({ color: '#2a2a32' })),
      chipText,
    ], { p: [1.0, 1.0, 0.1], r: [-6, -10, 0] });
    chipText.position.z = 0.075;
    chip.userData.only = ['cover'];
    return group([controller, chip]);
  },
  // supporting cast (option B): two game cartridges beside the controller, out of focus
  cast({ mat, geo, mesh, group, surface }) {
    const cart = (s) => group([
      mesh(geo.extrude(geo.roundRect(0.92, 1.04, 0.08), 0.18, { bevel: 0.03 }), mat.charcoal({ color: '#2c2c34' })),
      mesh(geo.extrude(geo.roundRect(0.7, 0.56, 0.04), 0.02, { bevel: 0.008 }), mat.offwhite({ color: '#9a9aa2' }), { p: [0, -0.08, 0.12] }),
      ...[-0.27, -0.09, 0.09, 0.27].map((x) => mesh(geo.box(0.07, 0.14, 0.2, 0.02), mat.charcoal({ color: '#24242b' }), { p: [x, 0.47, 0] })),
    ], { s });
    // camera space: x right, y up, z away from the camera; the controller is about 3.3 wide
    const parts = [group([cart(1)], { p: [2.5, 0.05, -1.6], r: [-6, -18, -12] })];
    if (surface !== 'cover') parts.push(group([cart(0.95)], { p: [-2.55, -0.1, -1.9], r: [-4, 20, 10] }));
    return group(parts);
  },
};
