// Carden: a calm picture puzzle; swap cards until the picture comes back together.
// One object: an off-white card, lifted and turned a little as if mid-swap, with the logo's lotus raised on its face:
// five amber petals standing in a charcoal bowl.
import { ACCENTS } from '../engine.js';

// a petal: a broad almond, rounded at the base, bluntly pointed at the tip; its base at the origin, its tip at (0, len)
function petalShape(THREE, len, wid) {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.bezierCurveTo(-wid * 1.45, len * 0.1, -wid * 1.3, len * 0.62, 0, len);
  s.bezierCurveTo(wid * 1.3, len * 0.62, wid * 1.45, len * 0.1, 0, 0);
  return s;
}
// the bowl the petals stand in: a shallow dish, its rim dipping a little at the centre; centred on the origin
function bowlShape(THREE, w) {
  const s = new THREE.Shape();
  s.moveTo(-w / 2, 0.16); s.quadraticCurveTo(0, 0.08, w / 2, 0.16); s.quadraticCurveTo(0, -0.5, -w / 2, 0.16); s.closePath();
  return s;
}

export default {
  slug: 'carden',
  title: 'Carden',
  tagline: 'A calm picture puzzle for iPhone and the web',
  echoText: 'CARDEN',
  accent: ACCENTS.amber,
  bloom: 0.14, // the lotus is a large emitter; at the usual bloom its halo blurs the card face
  build({ THREE, mat, geo, mesh, group }) {
    const stock = mat.offwhite({ rough: 0.55, clearcoat: 0.25 });
    const card = mesh(geo.extrude(geo.roundRect(1.0, 1.4, 0.09), 0.05, { bevel: 0.02 }), stock);
    const face = 0.025 + 0.02; // the card's front face
    // the petals are pure light with no albedo, so they stay crisp and even under the key light (the bevels still catch
    // it); the centre is the accent, the pairs behind it step down in amber
    const glow = (hex, intensity) => { const m = mat.glow(hex, { intensity }); m.color.set('#000000'); return m; };
    const centre = glow(ACCENTS.amber, 1.3), mid = glow('#f0a21e', 1.1), outer = glow('#e08a1a', 1.0);
    // every petal grows from one point just inside the bowl's rim; extrude() centres the petal, so its base sits at (0, -len/2) locally
    const [bx, by] = [0, -0.16];
    const petal = (deg, len, wid, m, z) => {
      const a = THREE.MathUtils.degToRad(deg);
      return mesh(geo.extrude([petalShape(THREE, len, wid)], 0.05, { bevel: 0.012 }), m, { p: [bx + (len / 2) * Math.sin(a), by + (len / 2) * Math.cos(a), z], r: [0, 0, -deg] });
    };
    const lotus = [
      petal(-66, 0.42, 0.14, outer, face + 0.02), petal(66, 0.42, 0.14, outer, face + 0.02),
      petal(-34, 0.56, 0.15, mid, face + 0.035), petal(34, 0.56, 0.15, mid, face + 0.035),
      petal(0, 0.68, 0.16, centre, face + 0.05),
    ];
    const bowl = mesh(geo.extrude([bowlShape(THREE, 0.84)], 0.04, { bevel: 0.01 }), mat.charcoal({ color: '#2e2e38' }), { p: [0, by - 0.06 - 0.16 + 0.005, face + 0.065] });
    // two more cards fanned behind it, so it reads as a deck being played
    const back = mat.offwhite({ color: '#a9a9b0', rough: 0.55, clearcoat: 0.25 });
    const fan = [-8, -16].map((deg, i) => mesh(geo.extrude(geo.roundRect(1.0, 1.4, 0.09), 0.05, { bevel: 0.02 }), back, { p: [-0.14 * (i + 1), -0.05 * (i + 1), -0.09 * (i + 1)], r: [0, 0, deg] }));
    return group([...fan, card, ...lotus, bowl], { r: [-10, -4, 6] });
  },
  cast({ THREE, mat, geo, mesh, group, surface }) {
    const stock = mat.offwhite({ rough: 0.55, clearcoat: 0.25 }), back = mat.offwhite({ color: '#a9a9b0', rough: 0.55, clearcoat: 0.25 });
    const blank = () => mesh(geo.extrude(geo.roundRect(1.0, 1.4, 0.09), 0.05, { bevel: 0.02 }), stock);
    // one card face down on the left, tipped over as if just dropped; its back carries the deck's plain inset panel
    const down = group([blank(), mesh(geo.extrude(geo.roundRect(0.78, 1.18, 0.07), 0.012, { bevel: 0.005 }), back, { p: [0, 0, -0.056] })], { p: [-1.4, -0.5, -1.5], r: [118, 0, 12], s: 0.56 });
    // one card mid-air on the right, face up and turned away, one petal of the picture on its face in satin amber
    const petal = mesh(geo.extrude([petalShape(THREE, 0.62, 0.17)], 0.05, { bevel: 0.012 }), mat.satin(ACCENTS.amber, { rough: 0.5 }), { p: [0, -0.02, 0.082], r: [0, 0, 8] });
    const up = group([blank(), petal], { p: [1.4, 0.3, -1.6], r: [-10, 34, -18], s: 0.56 });
    return group(surface === 'cover' ? [up] : [down, up]);
  },
};
