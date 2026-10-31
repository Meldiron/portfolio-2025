// RSGuessr: GeoGuessr for RuneScape 3; look at a screenshot, drop a pin on the map of Gielinor.
// One object: the logo's white map pin with its gold ring (the only light), dropped on the peak of a charcoal map
// puck whose contour lines are cut into its top like an engraving.
import { ACCENTS } from '../engine.js';

// one hill's outline at radius r around (cx, cy): the same irregularity at every radius, so the rings nest
function contour(THREE, cx, cy, r, n = 96, seed = 0) {
  const s = new THREE.Shape();
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2, k = 1 + 0.17 * Math.sin(2 * a + 0.7 + seed * 0.9) + 0.12 * Math.cos(3 * a - 1.2 + seed * 1.7) + 0.07 * Math.sin(5 * a + 0.4 + seed * 2.3);
    const x = cx + Math.cos(a) * r * k * 1.18, y = cy + Math.sin(a) * r * k;
    i ? s.lineTo(x, y) : s.moveTo(x, y);
  }
  s.closePath();
  return s;
}

export default {
  slug: 'rsguessr',
  title: 'RSGuessr',
  tagline: 'GeoGuessr for RuneScape 3',
  echoText: 'RSGUESSR',
  accent: ACCENTS.amber,
  elevation: 22,
  build({ THREE, mat, geo, mesh, group }) {
    const body = mat.offwhite({ color: '#bcbcc4' });
    // the pin: a ball on a cone that meets it tangentially, the tip at the origin
    const R = 0.55, cy = 1.0, tang = R * R / cy, tr = R * Math.sqrt(1 - (R / cy) ** 2);
    const ball = mesh(geo.sphere(R), body, { p: [0, cy, 0] });
    const cone = mesh(geo.cylinder(tr, 0.015, cy - tang), body, { p: [0, (cy - tang) / 2, 0] });
    // the logo's gold, as one crisp lit dot set into a dark socket on the face of the ball
    const socket = mesh(geo.cylinder(0.2, 0.2, 0.06, 64), mat.charcoal({ color: '#202026' }), { p: [0, cy, R - 0.035], r: [90, 0, 0] });
    const dot = mesh(geo.cylinder(0.14, 0.14, 0.04, 64), mat.glow(ACCENTS.amber, { intensity: 1.4 }), { p: [0, cy, R - 0.005], r: [90, 0, 0] });
    // the pin stands upright on the centre of the map, turned so its gold dot faces the camera (the camera looks from
    // 25 degrees to the right; the whole group turns 6 more)
    const pin = group([ball, cone, socket, dot], { p: [0, -0.035, 0], r: [0, 19, 0] });

    // the map puck: a dark base and a charcoal top plate with ring-shaped grooves cut through it, so the
    // contour lines are engraved (their walls catch the key, their floors sit in the darker base)
    // the contour rings are centred on the pin's tip, so the pin stands on the peak of the map
    const PR = 0.95, w = 0.03, hx = 0, hy = 0, radii = [0.5, 0.35, 0.2];
    const base = mesh(geo.extrude([geo.circle(PR)], 0.1, { bevel: 0.03 }), mat.charcoal({ color: '#1f1f25' }), { p: [0, -0.13, 0], r: [-90, 0, 0] });
    const top = geo.circle(PR - 0.005); top.holes.push(contour(THREE, hx, hy, radii[0] + w, 96, 0));
    const plates = [top];
    radii.forEach((r, i) => {
      const s = contour(THREE, hx, hy, r - w, 96, i);
      if (radii[i + 1]) s.holes.push(contour(THREE, hx, hy, radii[i + 1] + w, 96, i + 1));
      plates.push(s);
    });
    const plate = mesh(geo.extrude(plates, 0.03, { bevel: 0.012, bevelSegments: 4 }), mat.charcoal(), { p: [0, -0.027, 0], r: [-90, 0, 0] });
    return group([base, plate, pin], { r: [0, 6, 0] });
  },
  // the cast: a rolled clue scroll on the left, a small pile of gold on the right, both resting on the ground behind the puck
  cast({ mat, geo, mesh, group, accent, surface, size, center, floorY }) {
    const hw = (size.x * 0.906 + size.z * 0.423) / 2, fy = floorY - center.y;
    const parchment = mat.offwhite({ color: '#c8c2b4', rough: 0.6, clearcoat: 0.1 });
    const tie = mat.satin(accent, { rough: 0.5, clearcoat: 0.2 });
    const gold = mat.metal('#e0a93a', { rough: 0.3, env: 2.2 });
    // the scroll: a roll of parchment with its loose edge along one side, tied round the middle in the project's gold
    const inner = mat.offwhite({ color: '#9d9788', rough: 0.7, clearcoat: 0 });
    const scroll = group([
      mesh(geo.cylinder(0.15, 0.15, 0.78, 48), parchment),
      ...[-1, 1].map((s) => mesh(geo.cylinder(0.1, 0.1, 0.01, 48), inner, { p: [0, s * 0.393, 0] })), // the roll's inner turns, seen at each end
      mesh(geo.box(0.03, 0.78, 0.016, 0.006), parchment, { p: [0.145, 0, 0.045] }),
      mesh(geo.torus(0.155, 0.022), tie, { r: [90, 0, 0] }),
      mesh(geo.sphere(0.04, 24), tie, { p: [0, 0, 0.17] }),
    ], { p: [-(hw + 0.5), fy + 0.15, -1.5], r: [0, 42, 78] });
    // the gold: a short stack, two coins fallen flat beside it and one leaning on the stack
    const coin = (at) => mesh(geo.cylinder(0.15, 0.15, 0.035, 48), gold, at);
    const coins = group([
      coin({ p: [0, 0.018, 0] }), coin({ p: [0.03, 0.053, -0.02], r: [0, 20, 0] }), coin({ p: [-0.02, 0.088, 0.01], r: [0, -15, 0] }), coin({ p: [0.01, 0.123, -0.01], r: [0, 35, 0] }),
      coin({ p: [0.3, 0.018, 0.14], r: [0, 50, 0] }), coin({ p: [-0.3, 0.018, 0.12], r: [0, -40, 0] }),
      coin({ p: [0.25, 0.1, -0.08], r: [0, 0, -35] }),
    ], { p: [hw + 0.5, fy, -1.6], r: [0, -10, 0], s: 1.2 });
    return group(surface === 'cover' ? [coins] : [scroll, coins]);
  },
};
