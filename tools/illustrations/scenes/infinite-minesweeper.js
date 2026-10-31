// Infinite Minesweeper: minesweeper on a grid with no edges, with lives.
// One object: a charcoal sea mine, flagged: a coral pennant planted where its top horn was, and its coral core showing
// through a porthole on the front.
import { ACCENTS } from '../engine.js';

// a pennant pointing -x from the pole, its edges bowing a little like cloth
function pennant(THREE, len, h) {
  const s = new THREE.Shape();
  s.moveTo(0, h / 2); s.quadraticCurveTo(-len * 0.5, h * 0.42, -len, 0); s.quadraticCurveTo(-len * 0.5, -h * 0.42, 0, -h / 2); s.closePath();
  return s;
}

export default {
  slug: 'infinite-minesweeper',
  title: 'Infinite Minesweeper',
  tagline: 'Minesweeper on a grid with no edges',
  echoText: 'INFINITE',
  logo: '/public/projects/infinite-minesweeper.svg',
  accent: ACCENTS.coral,
  build({ THREE, mat, geo, mesh, group }) {
    const R = 0.56, shell = mat.charcoal(), steel = mat.metal('#cfd2d8', { rough: 0.35 });
    const ball = mesh(geo.sphere(R, 96), shell);
    // nine horns with rounded tips: the eight corners and the bottom pole; the flag takes the top
    const dirs = [[0, -1, 0]];
    for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) dirs.push([x, y, z]);
    const hornLen = 0.3, hornGeo = geo.cylinder(0.058, 0.095, hornLen, 48), tipGeo = geo.sphere(0.058, 32);
    const horns = dirs.map((d) => {
      const n = new THREE.Vector3(...d).normalize();
      const horn = group([mesh(hornGeo, shell, { p: [0, hornLen / 2, 0] }), mesh(tipGeo, shell, { p: [0, hornLen, 0] })]);
      horn.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), n);
      horn.position.copy(n).multiplyScalar(R - 0.05);
      return horn;
    });
    // the one light: the core, seen through a collared porthole on the front. The core is pure light (no albedo), so the
    // key light cannot blow part of it to white while the collar shades the rest.
    const n = new THREE.Vector3(0.4, 0.06, 0.92).normalize();
    const core = mat.glow(ACCENTS.coral, { intensity: 2.4 }); core.color.set('#000000');
    const collarShape = geo.circle(0.19); collarShape.holes.push(geo.circle(0.13));
    const porthole = group([
      mesh(geo.extrude([collarShape], 0.1, { bevel: 0.015 }), shell, { p: [0, 0, 0.03] }),
      mesh(geo.extrude([geo.circle(0.136)], 0.02, { bevel: 0.005 }), core, { p: [0, 0, 0.02] }), // just proud of the sphere, well inside the collar
    ]);
    porthole.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), n);
    porthole.position.copy(n).multiplyScalar(R);
    // the flag, planted on top
    const poleH = 0.7, poleTop = R - 0.05 + poleH, len = 0.52;
    const boss = mesh(geo.cylinder(0.07, 0.095, 0.08), shell, { p: [0, R - 0.02, 0] });
    const pole = mesh(geo.cylinder(0.016, 0.016, poleH), steel, { p: [0, R - 0.05 + poleH / 2, 0] });
    const finial = mesh(geo.sphere(0.032, 32), steel, { p: [0, poleTop, 0] });
    // extrude centres the pennant, so its root sits at +len/2: shift it so the root meets the pole
    const flag = mesh(geo.extrude(pennant(THREE, len, 0.32), 0.02, { bevel: 0.006 }), mat.satin(ACCENTS.coral, { rough: 0.5, clearcoat: 0.2 }), { p: [-len / 2 + 0.012, poleTop - 0.19, 0] });
    return group([ball, ...horns, porthole, boss, pole, finial, flag], { r: [8, 0, -12] });
  },
  // the cast: a second, smaller mine on the left, still unflagged; a revealed tile showing a 1 on the right
  cast({ THREE, mat, geo, mesh, group, surface, size }) {
    const hw = (size.x * 0.906 + size.z * 0.423) / 2;
    const shell = mat.charcoal();
    const R = 0.24, hornLen = 0.13, hornGeo = geo.cylinder(0.025, 0.042, hornLen, 32), tipGeo = geo.sphere(0.025, 16);
    const dirs = [[0, 1, 0], [0, -1, 0]];
    for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) dirs.push([x, y, z]);
    const mine = group([mesh(geo.sphere(R, 64), shell), ...dirs.map((d) => {
      const n = new THREE.Vector3(...d).normalize();
      const horn = group([mesh(hornGeo, shell, { p: [0, hornLen / 2, 0] }), mesh(tipGeo, shell, { p: [0, hornLen, 0] })]);
      horn.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), n);
      horn.position.copy(n).multiplyScalar(R - 0.02);
      return horn;
    })], { p: [-(hw + 0.55), -0.3, -1.6], r: [10, 20, 15], s: 1.15 });
    // the tile: an off-white square with a chunky 1 standing proud of its face
    const one = (h) => {
      const w = h * 0.22, f = h * 0.26, g = h * 0.22, t = h * 0.2, s = new THREE.Shape();
      s.moveTo(-w / 2, -h / 2); s.lineTo(w / 2, -h / 2); s.lineTo(w / 2, h / 2); s.lineTo(-w / 2, h / 2);
      s.lineTo(-w / 2 - f, h / 2 - g); s.lineTo(-w / 2 - f, h / 2 - g - t); s.lineTo(-w / 2, h / 2 - t); s.closePath();
      return s;
    };
    const tile = group([
      mesh(geo.box(0.72, 0.72, 0.16, 0.05), mat.offwhite({ color: '#b8b8c0' })),
      mesh(geo.extrude(one(0.4), 0.02, { bevel: 0.006 }), mat.charcoal({ color: '#2a2a32' }), { p: [0.02, 0, 0.09] }),
    ], { p: [hw + 0.55, -0.15, -1.5], r: [22, -28, 6] });
    return group(surface === 'cover' ? [tile] : [mine, tile]);
  },
};
