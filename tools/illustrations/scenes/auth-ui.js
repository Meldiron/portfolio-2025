// Auth UI: a hosted, brandable login page for Appwrite apps (2023).
// One object: an ID badge on a charcoal clip, an avatar and two lines printed on it, its chip the only light.
import { ACCENTS } from '../engine.js';

export default {
  slug: 'auth-ui',
  title: 'Auth UI',
  tagline: 'A hosted, customisable login page for Appwrite',
  echoText: 'LOGIN',
  accent: ACCENTS.magenta,
  build({ mat, geo, mesh, group }) {
    const ink = mat.charcoal({ color: '#2e2e36' });
    const steel = mat.metal('#cfd2d8', { rough: 0.38 });
    const front = 0.045;
    const card = mesh(geo.extrude([geo.roundRect(1.3, 1.8, 0.14)], 0.05, { bevel: 0.02 }), mat.offwhite({ color: '#b0b0b8' })); // the default off-white blows out under the studio key
    // printed: a slot for the strap, an avatar, a name and a line under it
    const print = (shape, p) => mesh(geo.extrude([shape], 0.012, { bevel: 0.005 }), ink, { p: [p[0], p[1], front + 0.004] });
    const slot = print(geo.roundRect(0.36, 0.08, 0.04), [0, 0.74]);
    const avatar = print(geo.circle(0.23), [0, 0.36]);
    const name = print(geo.roundRect(0.7, 0.085, 0.042), [0, -0.06]);
    const line = print(geo.roundRect(0.44, 0.085, 0.042), [0, -0.24]);
    const chip = mesh(geo.extrude([geo.roundRect(0.3, 0.22, 0.045)], 0.025, { bevel: 0.008 }), mat.glow(ACCENTS.magenta, { intensity: 2.2 }), { p: [-0.36, -0.6, front + 0.012] });
    const badge = group([card, slot, avatar, name, line, chip], { r: [0, 0, -5] });
    // the clip: a strap through the slot, a charcoal body, a steel ring for the lanyard
    const strap = mesh(geo.box(0.18, 0.4, 0.03, 0.012), ink, { p: [0, 0.98, front + 0.016] });
    const clip = mesh(geo.box(0.5, 0.26, 0.16, 0.05), ink, { p: [0, 1.25, 0] });
    const ring = mesh(geo.torus(0.1, 0.028), steel, { p: [0, 1.46, 0] });
    return group([badge, strap, clip, ring], { r: [0, -10, 0] });
  },
  // the cast: a blank badge lying face down on the left, a small steel key on the right
  cast({ mat, geo, mesh, group, surface, size, center, floorY }) {
    const hw = (size.x * 0.906 + size.z * 0.423) / 2, fy = floorY - center.y;
    const ink = mat.charcoal({ color: '#2e2e36' }), steel = mat.metal('#cfd2d8', { rough: 0.38 });
    // its strap still through the slot, so a blank card still says badge
    const blank = group([
      mesh(geo.extrude([geo.roundRect(0.66, 0.92, 0.07)], 0.04, { bevel: 0.015 }), mat.offwhite({ color: '#b0b0b8' })),
      mesh(geo.extrude([geo.roundRect(0.2, 0.05, 0.025)], 0.01, { bevel: 0.004 }), ink, { p: [0, 0.37, 0.038] }),
      mesh(geo.box(0.11, 0.34, 0.026, 0.01), ink, { p: [0, 0.54, 0.05] }),
    ], { p: [-(hw + 0.65), fy + 0.25, -1.5], r: [-45, 20, 8] });
    const key = group([
      mesh(geo.torus(0.17, 0.05), steel),
      mesh(geo.box(0.7, 0.07, 0.045, 0.02), steel, { p: [0.52, 0, 0] }),
      mesh(geo.box(0.07, 0.14, 0.045, 0.02), steel, { p: [0.76, -0.09, 0] }),
      mesh(geo.box(0.07, 0.11, 0.045, 0.02), steel, { p: [0.62, -0.07, 0] }),
    ], { p: [hw + 0.45, -0.55, -1.5], r: [-60, 0, 24] });
    return group(surface === 'cover' ? [key] : [blank, key]);
  },
};
