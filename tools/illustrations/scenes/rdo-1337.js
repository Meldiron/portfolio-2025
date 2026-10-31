// Rdo1337: the website of a Slovak Counter-Strike pro who streams on Kick.
// One object: a charcoal gaming headset with its mic boom down, a Kick-green ring lit on the ear cup.
// (A floating LIVE chip was tried and dropped: unreadable small, and chips read as clip art.)
import { ACCENTS } from '../engine.js';

export default {
  slug: 'rdo-1337',
  title: 'Rdo1337',
  tagline: 'The website of a Slovak Counter-Strike pro',
  echoText: '1337',
  logo: '/public/projects/rdo1337.png',
  accent: ACCENTS.lime,
  build({ mat, geo, mesh, group }) {
    const shell = mat.charcoal(), soft = mat.charcoal({ color: '#24242a', rough: 0.7, clearcoat: 0 }), steel = mat.metal('#bfc2c9', { rough: 0.3 });
    const cup = (side) => {
      const parts = [
        mesh(geo.cylinder(0.4, 0.4, 0.3, 96), shell, { r: [0, 0, 90] }),
        mesh(geo.torus(0.31, 0.11), soft, { p: [-side * 0.17, 0, 0], r: [0, 90, 0] }),
        mesh(geo.cylinder(0.3, 0.33, 0.06, 96), shell, { p: [side * 0.17, 0, 0], r: [0, 0, 90] }),
      ];
      if (side > 0) parts.push(mesh(geo.torus(0.24, 0.022), mat.glow(ACCENTS.lime, { intensity: 2.2 }), { p: [side * 0.205, 0, 0], r: [0, 90, 0] }));
      return group(parts, { p: [side * 0.86, 0, 0] });
    };
    const band = group([
      mesh(geo.torus(0.86, 0.075, Math.PI), shell, { p: [0, 0.5, 0] }),
      mesh(geo.torus(0.78, 0.05, Math.PI * 0.8), soft, { p: [0, 0.5, 0], r: [0, 0, 18] }),
    ]);
    const yoke = (side) => mesh(geo.box(0.08, 0.26, 0.16, 0.03), steel, { p: [side * 0.86, 0.42, 0] });
    // the mic boom, from the left cup forward and down to the capsule
    const boom = mesh(geo.tube([[-0.92, -0.12, 0.12], [-0.9, -0.42, 0.42], [-0.66, -0.62, 0.66], [-0.38, -0.66, 0.76]], 0.035), shell);
    const capsule = mesh(geo.capsule(0.07, 0.12), soft, { p: [-0.34, -0.66, 0.78], r: [0, 0, 80] });
    return group([band, cup(-1), cup(1), yoke(-1), yoke(1), boom, capsule], { r: [4, -22, 0] });
  },
  // the cast, the rest of his desk: a charcoal gaming mouse on the left, one W keycap on the right
  cast({ mat, geo, mesh, group, surface, size }) {
    const hw = (size.x * 0.906 + size.z * 0.423) / 2; // the headset's half-width as the camera sees it
    const shell = mat.charcoal(), soft = mat.charcoal({ color: '#24242a', rough: 0.7, clearcoat: 0 }), cap = mat.charcoal({ color: '#2c2c34' });
    const legend = mat.offwhite({ color: '#b0b0b8' });
    // the mouse: a low ellipsoid on a flat skirt, the button split and the wheel at its nose, the cable running off it
    const mouse = group([
      mesh(geo.sphere(0.3, 64), shell, { p: [0, 0.02, 0], s: [0.7, 0.46, 1.25] }),
      mesh(geo.box(0.4, 0.06, 0.72, 0.03), soft, { p: [0, -0.1, 0] }),
      mesh(geo.box(0.014, 0.05, 0.3, 0.006), soft, { p: [0, 0.13, 0.2] }),
      mesh(geo.cylinder(0.05, 0.05, 0.045, 48), soft, { p: [0, 0.145, 0.16], r: [0, 0, 90] }),
      mesh(geo.tube([[0, -0.02, 0.36], [-0.04, -0.06, 0.56], [-0.26, -0.1, 0.7]], 0.016), shell), // the cable curls away from the headset's mic
    ], { p: [-(hw + 0.5), -0.45, -1.5], r: [34, 40, 0], s: 1.25 });
    // the keycap: a chiclet with its W built from four bars
    const bar = (a, b, t = 0.04) => {
      const dx = b[0] - a[0], dy = b[1] - a[1];
      return mesh(geo.box(t, Math.hypot(dx, dy) + t * 0.6, 0.02, t / 2), legend, { p: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 0], r: [0, 0, (Math.atan2(-dx, dy) * 180) / Math.PI] });
    };
    const W = [[-0.12, 0.1], [-0.06, -0.1], [0, 0.03], [0.06, -0.1], [0.12, 0.1]];
    const keycap = group([
      mesh(geo.box(0.6, 0.3, 0.6, 0.08), cap),
      group(W.slice(1).map((b, i) => bar(W[i], b)), { p: [0, 0.16, 0], r: [-90, 0, 0] }),
    ], { p: [hw + 0.5, -0.2, -1.7], r: [30, -30, 8] });
    return group(surface === 'cover' ? [keycap] : [mouse, keycap]);
  },
};
