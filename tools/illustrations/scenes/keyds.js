// KeyDS: an internal platform that distributes software licence keys.
// One object: a charcoal key with the logo's ring-shaped bow, a lime enamel inlay along its blade the only light,
// and a small paper tag on its key ring printed with a licence key.
import { ACCENTS } from '../engine.js';

export default {
  slug: 'keyds',
  title: 'KeyDS',
  tagline: 'Software licence keys, managed and distributed',
  echoText: 'KEYDS',
  logo: '/public/projects/keyds.svg',
  accent: ACCENTS.emerald,
  build({ THREE, mat, geo, mesh, group, label }) {
    const body = mat.charcoal(), steel = mat.metal('#cfd2d8', { rough: 0.38 });
    // the bow: the logo's donut, the key ring hanging through its hole
    const bowShape = geo.circle(0.44); bowShape.holes.push(geo.circle(0.23));
    const bow = mesh(geo.extrude([bowShape], 0.13, { bevel: 0.035 }), body);
    // the blade, with a channel on its face holding the lime inlay
    const shaft = mesh(geo.box(1.4, 0.24, 0.14, 0.05), body, { p: [1.1, 0, 0] });
    const channel = mesh(geo.box(1.0, 0.08, 0.03, 0.012), mat.charcoal({ color: '#1c1c22' }), { p: [0.98, 0.02, 0.07] });
    const inlay = mesh(geo.box(0.96, 0.026, 0.024, 0.01), mat.glow(ACCENTS.emerald, { intensity: 0.75 }), { p: [0.98, 0.02, 0.078] });
    // the bit: three teeth under the tip
    const tooth = (x, h) => mesh(geo.box(0.13, h, 0.12, 0.025), body, { p: [x, -0.12 - h / 2 + 0.05, 0] });
    const teeth = [tooth(1.3, 0.2), tooth(1.5, 0.3), tooth(1.7, 0.22)];
    // the ring stands through the bow's hole; the tag hangs from its far side
    const ring = mesh(geo.torus(0.19, 0.022), steel, { p: [-0.39, 0, 0], r: [90, 0, 0] });
    // a small luggage-style tag: pointed at the ring end, its hole at the group's origin
    const tagShape = new THREE.Shape();
    tagShape.moveTo(0.14, 0); tagShape.lineTo(0, 0.18); tagShape.lineTo(-0.95, 0.18); tagShape.lineTo(-0.95, -0.18); tagShape.lineTo(0, -0.18); tagShape.closePath();
    tagShape.holes.push(geo.circle(0.042, -0.06, 0));
    const paper = mesh(geo.extrude([tagShape], 0.012, { bevel: 0.004 }), mat.offwhite({ color: '#b2b2b8', rough: 0.8, clearcoat: 0, env: 0.6 }));
    paper.position.set(-0.345, 0, 0); // extrude() centres the shape (x from -0.95 to 0.14); this puts the hole back at the origin
    const eyelet = mesh(geo.torus(0.05, 0.011), steel);
    const code = label('K7Q-29X', { height: 0.22, color: '#1c1c22', weight: 700 });
    code.position.set(-0.47, 0, 0.012);
    const tag = group([paper, eyelet, code], { p: [-0.58, 0, 0], r: [6, 28, 4] });
    // turned away from the camera so the blade foreshortens, rolled so the key runs diagonally
    return group([bow, shaft, channel, inlay, ...teeth, ring, tag], { r: [-12, -22, -24] });
  },
  cast({ mat, geo, mesh, group, surface, center, floorY }) {
    const fy = floorY - center.y;
    const steel = mat.metal('#cfd2d8', { rough: 0.38 });
    // the box the software ships in, standing on the right: a plain off-white panel on its front, a lime band under it
    const box = group([
      mesh(geo.box(0.58, 0.8, 0.2, 0.035), mat.charcoal()),
      mesh(geo.extrude(geo.roundRect(0.4, 0.26, 0.05), 0.012, { bevel: 0.005 }), mat.offwhite({ color: '#b2b2b8' }), { p: [0, 0.14, 0.111] }),
      mesh(geo.box(0.4, 0.035, 0.016, 0.008), mat.satin(ACCENTS.emerald, { rough: 0.5 }), { p: [0, -0.06, 0.108] }),
    ], { p: [1.55, fy + 0.4, -1.6], r: [0, -32, 0] });
    // a plainer key lying on the left
    const key = group([
      mesh(geo.torus(0.2, 0.06), steel),
      mesh(geo.box(0.8, 0.08, 0.05, 0.02), steel, { p: [0.6, 0, 0] }),
      mesh(geo.box(0.08, 0.16, 0.05, 0.02), steel, { p: [0.86, -0.1, 0] }),
      mesh(geo.box(0.08, 0.12, 0.05, 0.02), steel, { p: [0.7, -0.08, 0] }),
    ], { p: [-1.55, fy + 0.12, -1.5], r: [-58, 0, 28], s: 0.72 });
    return group(surface === 'cover' ? [box] : [key, box]);
  },
};
