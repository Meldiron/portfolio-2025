// Meraline: ask AI anything from ⌥ Space in any Mac app, then let it go.
// One object: the ⌥ keycap with its legend lit violet, and the logo's sparkle mascot perched on its front corner.
import { ACCENTS } from '../engine.js';

// the engine's off-white blows out under the key light and blooms; this reads as off-white on black without crossing the bloom threshold
const IVORY = '#bfbfc5';

function sparkleShape(THREE, r, pinch) {
  const s = new THREE.Shape(), ry = r * 1.18, rx = r * 0.88; // the logo's star is a little taller than wide
  s.moveTo(0, ry);
  s.quadraticCurveTo(pinch, pinch, rx, 0); s.quadraticCurveTo(pinch, -pinch, 0, -ry);
  s.quadraticCurveTo(-pinch, -pinch, -rx, 0); s.quadraticCurveTo(-pinch, pinch, 0, ry);
  return s;
}
// a glyph drawn in light: straight tube segments with round joints
function polyline(geo, mesh, group, pts, r, material) {
  const parts = pts.map((p) => mesh(geo.sphere(r, 24), material, { p }));
  for (let i = 1; i < pts.length; i++) parts.push(mesh(geo.tube([pts[i - 1], pts[i]], r, { segments: 2, caps: false }), material));
  return group(parts);
}
function arc(cx, cy, r, a0, a1, n = 10) {
  return Array.from({ length: n + 1 }, (_, i) => { const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a), 0]; });
}
// a keycap: a rounded square that tapers towards its top, so the sides catch the key light and it reads as a key, not a slab
function keycapGeo(geo, w, h, bevel, taper) {
  const g = geo.extrude(geo.roundRect(w, w, 0.16), h, { bevel });
  g.computeBoundingBox();
  const pos = g.attributes.position, z0 = g.boundingBox.min.z, z1 = g.boundingBox.max.z;
  for (let i = 0; i < pos.count; i++) {
    const k = 1 - (1 - taper) * ((pos.getZ(i) - z0) / (z1 - z0));
    pos.setXY(i, pos.getX(i) * k, pos.getY(i) * k);
  }
  g.computeVertexNormals();
  return g;
}

export default {
  slug: 'meraline',
  title: 'Meraline',
  tagline: 'Ask AI from ⌥ Space in any Mac app, then let it go',
  echoText: 'MERALINE',
  accent: ACCENTS.magenta,
  fill: 0.7, elevation: 26, // the fit measures the tilted key's box, so 0.7 puts the key itself at about 45% of the height
  build({ THREE, mat, geo, mesh, group }) {
    const W = 0.9, H = 0.3, BEVEL = 0.08, TAPER = 0.86;
    const key = mesh(keycapGeo(geo, W, H, BEVEL, TAPER), mat.charcoal(), { r: [-90, 0, 0] });
    // the ⌥ legend on the top face, drawn as tubing: a short bar top left running into the diagonal and out along the
    // bottom, and a second short bar top right
    const top = H / 2 + BEVEL, k = 0.28, lit = mat.glow(ACCENTS.magenta, { intensity: 2.2 }), r = 0.032;
    const G = (x, y) => [x * k, top + r * 0.4, -y * k];
    const legend = group([
      polyline(geo, mesh, group, [G(-1, 0.78), G(-0.42, 0.78), G(0.42, -0.78), G(1, -0.78)], r, lit),
      polyline(geo, mesh, group, [G(0.3, 0.78), G(1, 0.78)], r, lit),
    ]);
    // the mascot: an off-white sparkle with closed eyes and a smile, perched on the key's back right corner (clear of the
    // legend), standing upright in the world and leaning out a little
    const face = mat.charcoal({ color: '#17171c' });
    const star = mesh(geo.extrude([sparkleShape(THREE, 0.36, 0.08)], 0.1, { bevel: 0.025 }), mat.offwhite({ color: IVORY }));
    const z = 0.05 + 0.025 + 0.004;
    const mascot = group([
      star,
      // closed eyes curve down at their ends like the logo's (the arc runs over its centre; y is up), the smile runs under its centre
      mesh(geo.tube(arc(-0.08, 0.02, 0.04, 25, 155), 0.012), face, { p: [0, 0, z] }),
      mesh(geo.tube(arc(0.08, 0.02, 0.04, 25, 155), 0.012), face, { p: [0, 0, z] }),
      mesh(geo.tube(arc(0, -0.03, 0.033, 215, 325), 0.012), face, { p: [0, 0, z] }),
    ], { p: [0.47, 0.58, -0.52], r: [-20, 18, -16] }); // its lower point rests on the top's corner at (0.36, 0.215, -0.35)
    // tilted towards the camera so the legend reads
    return group([key, legend, mascot], { r: [24, -6, 0] });
  },
  cast({ THREE, mat, geo, mesh, group, surface }) {
    const W = 0.9, H = 0.3, BEVEL = 0.08, TAPER = 0.86, top = H / 2 + BEVEL;
    // the ⌘ key on the left, its legend in off-white tubing: a square with a loop at each corner
    const pale = mat.offwhite({ color: '#b0b0b8' }), r = 0.024, a = 0.085, b = 0.052;
    const G = (x, y) => [x, top + r * 0.4, -y];
    const legend = group([
      polyline(geo, mesh, group, [G(-a, -a), G(a, -a), G(a, a), G(-a, a), G(-a, -a)], r, pale),
      ...[[1, 1], [-1, 1], [-1, -1], [1, -1]].map(([sx, sy]) => mesh(geo.torus(b, r), pale, { p: G(sx * (a + b * 0.55), sy * (a + b * 0.55)), r: [90, 0, 0] })),
    ]);
    const cmd = group([mesh(keycapGeo(geo, W, H, BEVEL, TAPER), mat.charcoal(), { r: [-90, 0, 0] }), legend], { p: [-1.35, -0.25, -1.5], r: [22, 16, 0], s: 0.56 });
    // a small empty speech bubble on the right: the answer still to come
    const ivory = mat.offwhite({ color: IVORY });
    const tail = new THREE.Shape(); tail.moveTo(-0.13, -0.08); tail.lineTo(-0.19, -0.24); tail.lineTo(0, -0.08); tail.closePath();
    const bubble = group([
      mesh(geo.extrude(geo.roundRect(0.5, 0.34, 0.13), 0.11, { bevel: 0.028 }), ivory),
      mesh(geo.extrude([tail], 0.11, { bevel: 0.028 }), ivory, { p: [-0.095, -0.16, 0] }),
    ], { p: [1.3, 0.1, -1.6], r: [0, -22, 6] });
    return group(surface === 'cover' ? [bubble] : [cmd, bubble]);
  },
};
