// Because Life Happens: what investments promise at 65 versus what life actually leaves.
// One object: an off-white piggy bank, one rose coin flipping in the air above its slot, and a hairline crack down its flank.
import { ACCENTS } from '../engine.js';

// the engine's off-white blows out under the key light and blooms; this reads as off-white on black without crossing the bloom threshold
const IVORY = '#bfbfc5';

const A = 0.95, B = 0.72, C = 0.72; // the body's radii
// a point on the +z flank of the body, lifted off the surface by `lift`
const onFlank = (x, y, lift = 0) => [x, y, C * Math.sqrt(Math.max(0, 1 - (x / A) ** 2 - (y / B) ** 2)) + lift];

export default {
  slug: 'because-life-happens',
  title: 'Because Life Happens',
  tagline: 'What savings promise at 65, and what life leaves',
  echoText: 'LIFE',
  logo: '/public/projects/because-life-happens.svg',
  accent: ACCENTS.rose,
  build({ THREE, mat, geo, mesh, group }) {
    const shell = mat.offwhite({ color: IVORY });
    const ink = mat.charcoal({ color: '#1a1a20' });
    const body = mesh(geo.sphere(1, 128), shell, { s: [A, B, C] });
    const legs = [[0.5, 0.33], [0.5, -0.33], [-0.5, 0.33], [-0.5, -0.33]].map(([x, z]) => mesh(geo.capsule(0.13, 0.2), shell, { p: [x, -0.6, z] }));
    // snout, a rounded puck emerging from the head, with two dark nostrils
    const snout = mesh(geo.extrude([geo.circle(0.28)], 0.16, { bevel: 0.07 }), shell, { p: [0.95, -0.06, 0], r: [0, 90, 0] });
    const nostrils = [0.1, -0.1].map((z) => mesh(geo.extrude([geo.circle(0.04)], 0.02, { bevel: 0.006 }), ink, { p: [1.1, -0.05, z], r: [0, 90, 0] }));
    // ears: soft pointed leaves, tilted out and leaning back
    const earShape = new THREE.Shape();
    earShape.moveTo(-0.15, 0); earShape.quadraticCurveTo(-0.04, 0.12, 0, 0.32); earShape.quadraticCurveTo(0.04, 0.12, 0.15, 0); earShape.closePath();
    const earGeo = geo.extrude([earShape], 0.05, { bevel: 0.018 });
    const ears = [1, -1].map((s) => mesh(earGeo, shell, { p: [0.46, 0.62, s * 0.3], r: [s * 22, 0, -14] }));
    const eyes = [1, -1].map((s) => { const [x, y, z] = onFlank(0.66, 0.2, -0.02); return mesh(geo.sphere(0.045, 32), ink, { p: [x, y, s * z] }); });
    // the slot on top, and the coin tossed above it, mid-flip: its faces are the one light, its rim is satin rose so the
    // tilted disc reads as a coin and not a blob. The faces carry no albedo, so the key light cannot blow them to white.
    const slot = mesh(geo.box(0.46, 0.04, 0.1, 0.015), ink, { p: [-0.12, 0.7, 0] });
    const lit = mat.glow(ACCENTS.rose, { intensity: 2.0 }); lit.color.set('#000000');
    const coin = group([
      mesh(geo.cylinder(0.28, 0.28, 0.07, 96), mat.satin(ACCENTS.rose, { rough: 0.45 }), { r: [90, 0, 0] }),
      mesh(geo.extrude([geo.circle(0.25)], 0.012, { bevel: 0.004 }), lit, { p: [0, 0, 0.036] }),
      mesh(geo.extrude([geo.circle(0.25)], 0.012, { bevel: 0.004 }), lit, { p: [0, 0, -0.036] }),
    ], { p: [-0.08, 1.08, 0.08], r: [-65, 55, 0] }); // its face turned about 60 degrees from the camera, so the rim shows
    // a fine crack running down the flank, under the slot
    const crackPts = [[-0.3, 0.55], [-0.24, 0.42], [-0.35, 0.3], [-0.27, 0.16], [-0.38, 0.0], [-0.3, -0.16], [-0.4, -0.3], [-0.34, -0.44]].map(([x, y]) => onFlank(x, y, 0.003));
    const crack = mesh(geo.tube(crackPts, 0.008, { segments: 160 }), ink);
    // the curly tail
    const tailPts = [[-0.9, 0.02, 0], [-1.02, -0.04, 0.02], [-1.12, 0.06, 0.04], [-1.08, 0.18, 0.02], [-0.97, 0.19, 0], [-0.93, 0.1, -0.02]];
    const tail = mesh(geo.tube(tailPts, 0.032), shell);
    return group([body, ...legs, snout, ...nostrils, ...ears, ...eyes, slot, coin, crack, tail], { r: [0, -16, 0] });
  },
  cast({ THREE, mat, geo, mesh, group, surface, center, floorY }) {
    const fy = floorY - center.y;
    const steel = mat.metal('#cfd2d8', { rough: 0.42 });
    // a short stack of coins on the floor to the left, each slipped a little off the one below
    const coinGeo = geo.extrude([geo.circle(0.36)], 0.06, { bevel: 0.013 });
    const coins = group([0, 1, 2, 3, 4].map((i) => mesh(coinGeo, steel, { p: [Math.sin(i * 2.3) * 0.035, 0.043 + i * 0.086, Math.cos(i * 1.9) * 0.035], r: [90, 0, i * 29] })), { p: [-2.0, fy, -1.5] });
    // an hourglass on the right: off-white bulbs between two charcoal plates, on three steel posts
    const profile = [[0.05, -0.34], [0.21, -0.31], [0.25, -0.2], [0.13, -0.05], [0.045, 0], [0.13, 0.05], [0.25, 0.2], [0.21, 0.31], [0.05, 0.34]].map(([r, y]) => new THREE.Vector2(r, y));
    const plate = geo.extrude([geo.circle(0.31)], 0.05, { bevel: 0.014 });
    const post = geo.cylinder(0.017, 0.017, 0.76);
    const hourglass = group([
      mesh(new THREE.LatheGeometry(profile, 48), mat.offwhite({ color: '#b4b4bb' })),
      mesh(plate, mat.charcoal(), { p: [0, -0.38, 0], r: [90, 0, 0] }),
      mesh(plate, mat.charcoal(), { p: [0, 0.38, 0], r: [90, 0, 0] }),
      ...[90, 210, 330].map((a) => mesh(post, steel, { p: [0.27 * Math.cos((a * Math.PI) / 180), 0, 0.27 * Math.sin((a * Math.PI) / 180)] })),
    ], { p: [2.1, fy + 0.42, -1.7], r: [0, -24, 0] });
    return group(surface === 'cover' ? [hourglass] : [coins, hourglass]);
  },
};
