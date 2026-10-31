// Almost Vault: share a password through a link that opens once.
// One object: a graphite padlock, its steel shackle popped open, the keyhole the only light.
import { ACCENTS } from '../engine.js';

export default {
  slug: 'almost-vault',
  title: 'Almost Vault',
  tagline: 'Share a password through a link that opens once',
  echoText: 'VAULT',
  accent: ACCENTS.coral,
  build({ mat, geo, mesh, group }) {
    const steel = mat.metal('#cfd2d8', { rough: 0.38 });
    const body = mesh(geo.extrude(geo.roundRect(1.5, 1.2, 0.3), 0.56, { bevel: 0.05 }), mat.charcoal(), { p: [0, -0.4, 0] });
    const lit = mat.glow(ACCENTS.coral, { intensity: 3 });
    const keyhole = group([
      mesh(geo.extrude([geo.circle(0.12)], 0.02, { bevel: 0.008 }), lit, { p: [0, 0.06, 0] }),
      mesh(geo.extrude([geo.roundRect(0.1, 0.28, 0.05)], 0.02, { bevel: 0.008 }), lit, { p: [0, -0.1, 0] }),
    ], { p: [0, -0.42, 0.335] });
    const plate = mesh(geo.extrude([geo.circle(0.26)], 0.03, { bevel: 0.015 }), steel, { p: [0, -0.42, 0.31] });
    // the shackle swings open around its right leg
    const shackle = group([
      mesh(geo.torus(0.44, 0.095, Math.PI), steel, { p: [-0.44, 0.48, 0] }),
      mesh(geo.cylinder(0.095, 0.095, 0.72), steel, { p: [0, 0.12, 0] }),
      mesh(geo.cylinder(0.095, 0.095, 0.3), steel, { p: [-0.88, 0.33, 0] }),
    ], { p: [0.44, 0.38, 0], r: [0, 32, 0] });
    return group([body, plate, keyhole, shackle], { r: [0, -8, 0] });
  },
  // supporting cast (option B): a key and a second, closed padlock, out of focus
  cast({ mat, geo, mesh, group, surface }) {
    const steel = mat.metal('#cfd2d8', { rough: 0.38 });
    const key = group([
      mesh(geo.torus(0.2, 0.06), steel),
      mesh(geo.box(0.8, 0.08, 0.05, 0.02), steel, { p: [0.6, 0, 0] }),
      mesh(geo.box(0.08, 0.16, 0.05, 0.02), steel, { p: [0.86, -0.1, 0] }),
      mesh(geo.box(0.08, 0.12, 0.05, 0.02), steel, { p: [0.7, -0.08, 0] }),
    ], { p: [1.55, -0.85, -0.9], r: [-62, 0, 22] });
    const lock = group([
      mesh(geo.extrude(geo.roundRect(1.0, 0.8, 0.2), 0.38, { bevel: 0.04 }), mat.charcoal()),
      mesh(geo.torus(0.3, 0.07, Math.PI), steel, { p: [0, 0.5, 0] }),
      mesh(geo.cylinder(0.07, 0.07, 0.2), steel, { p: [-0.3, 0.42, 0] }),
      mesh(geo.cylinder(0.07, 0.07, 0.2), steel, { p: [0.3, 0.42, 0] }),
    ], { p: [-1.75, -0.35, -1.7], r: [0, 18, -6] });
    return group(surface === 'cover' ? [key] : [key, lock]);
  },
};
