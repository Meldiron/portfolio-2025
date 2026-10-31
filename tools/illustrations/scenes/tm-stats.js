// TMStats: a Trackmania medal dashboard, every map's author, gold, silver and bronze medal in one place.
// One object: a matte gold medal with a dark enamel "1", hanging from a charcoal neck ribbon that twists once on its
// way down. Nothing glows: the polished gold catches the light strongly on its own.
import { ACCENTS } from '../engine.js';

// a chunky sans-serif numeral 1, `h` tall, as a 2D shape centred on its stem
function one(THREE, h = 0.5) {
  const w = h * 0.2, f = h * 0.28, g = h * 0.22, t = h * 0.2, s = new THREE.Shape();
  s.moveTo(-w / 2, -h / 2); s.lineTo(w / 2, -h / 2); s.lineTo(w / 2, h / 2); s.lineTo(-w / 2, h / 2);
  s.lineTo(-w / 2 - f, h / 2 - g); s.lineTo(-w / 2 - f, h / 2 - g - t); s.lineTo(-w / 2, h / 2 - t);
  s.closePath();
  return s;
}

// a cloth ribbon: a strip `w` wide and `t` thick swept along a closed curve through `pts`. A ribbon takes its
// orientation from what it hangs on, not from the curve, so frame(u, P) says which way its face points at the point
// u (0..1) along the curve ({ up }) and how far it is twisted about its own axis there ({ twist }, radians).
function ribbon(THREE, pts, w, t, frame, segs = 240) {
  const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)), true, 'centripetal');
  const pos = [], idx = [];
  // four faces, each a strip two vertices wide: (side, normal) signs of its two corners
  const faces = [[-1, 1, 1, 1], [1, 1, 1, -1], [1, -1, -1, -1], [-1, -1, -1, 1]];
  faces.forEach(([b0, n0, b1, n1], f) => {
    for (let i = 0; i <= segs; i++) {
      const u = i / segs, P = curve.getPointAt(u % 1), T = curve.getTangentAt(u % 1).normalize();
      const { up, twist } = frame(u, P);
      const N = up.clone().addScaledVector(T, -up.dot(T)).normalize().applyAxisAngle(T, twist);
      const B = new THREE.Vector3().crossVectors(T, N);
      for (const [b, n] of [[b0, n0], [b1, n1]]) { const v = P.clone().addScaledVector(B, b * w / 2).addScaledVector(N, n * t / 2); pos.push(v.x, v.y, v.z); }
      if (i < segs) { const k = f * (segs + 1) * 2 + i * 2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); } // wound so every face points outward
    }
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}
const smooth = (a, b, x) => { const k = Math.min(1, Math.max(0, (x - a) / (b - a))); return k * k * (3 - 2 * k); };

export default {
  slug: 'tm-stats',
  title: 'TMStats',
  tagline: 'Trackmania medals, compared with friends',
  echoText: 'MEDALS',
  accent: ACCENTS.amber,
  build({ THREE, mat, geo, mesh, group }) {
    // polished gold: the shining part of this banner is a strong reflection, not a glow
    const gold = mat.metal('#e0a93a', { rough: 0.16, env: 2.6 });
    const enamel = mat.charcoal({ color: '#26262d', rough: 0.4, clearcoat: 0.6 });
    const cloth = mat.charcoal({ color: '#2b2b33', rough: 0.65, clearcoat: 0.1 });

    // the medal: a domed face (a flattened sphere) in a rounded rim, a fine raised ring and the enamel "1"
    const R = 0.62;
    const face = mesh(geo.sphere(R - 0.02, 96), gold, { s: [1, 1, 0.13] });
    const rim = mesh(geo.torus(R - 0.045, 0.045), gold);
    const inner = mesh(geo.torus(0.46, 0.012), gold, { p: [0, 0, 0.055] });
    const numeral = mesh(geo.extrude(one(THREE, 0.5), 0.03, { bevel: 0.01 }), enamel, { p: [0.02, 0, 0.082] });
    const loop = mesh(geo.torus(0.085, 0.03), gold, { p: [0, R + 0.05, 0] });

    // the neck ribbon: one closed loop that comes over the top at the back, down both straps in a V behind the
    // medal's loop; the right strap turns over once on its way down
    const y = R + 0.05;
    const path = [
      [0, y + 0.98, -0.88], [-0.48, y + 1.0, -0.66], [-0.58, y + 0.94, -0.32], [-0.46, y + 0.7, -0.09], [-0.22, y + 0.32, -0.07],
      [0, y + 0.07, -0.08], [0.22, y + 0.32, -0.07], [0.46, y + 0.7, -0.09], [0.58, y + 0.94, -0.32], [0.48, y + 1.0, -0.66],
    ];
    // round the back and over the shoulders the ribbon faces away from the neck; down the chest it faces the camera.
    // The right strap turns over once, gently, all the way from the medal to the shoulder; the half turn it then
    // carries to the closing point is invisible, the cross-section being symmetric.
    const neck = new THREE.Vector3(0, y + 0.5, -0.38), front = new THREE.Vector3(0, 0, 1);
    const frame = (u, P) => {
      const chest = smooth(0.14, 0.3, u) * (1 - smooth(0.7, 0.86, u));
      return { up: P.clone().sub(neck).normalize().lerp(front, chest), twist: Math.PI * smooth(0.5, 0.78, u) };
    };
    const band = mesh(ribbon(THREE, path, 0.3, 0.02, frame), cloth);
    return group([face, rim, inner, numeral, loop, band], { r: [0, -12, 0] });
  },
  // the cast: the silver and the bronze, smaller, each on a short loop of the same ribbon
  cast({ mat, geo, mesh, group, surface, size }) {
    const hw = (size.x * 0.906 + size.z * 0.423) / 2;
    const cloth = mat.charcoal({ color: '#2b2b33', rough: 0.65, clearcoat: 0.1 });
    const silver = mat.metal('#c6c9d0', { rough: 0.3, env: 2.0 });
    const bronze = mat.metal('#b8763f', { rough: 0.35, env: 2.0 });
    const medal = (R, metal, at) => group([
      mesh(geo.sphere(R - 0.015, 64), metal, { s: [1, 1, 0.13] }),
      mesh(geo.torus(R - 0.035, 0.035), metal),
      mesh(geo.torus(R * 0.72, 0.009), metal, { p: [0, 0, 0.04] }),
      mesh(geo.torus(0.05, 0.02), metal, { p: [0, R + 0.03, 0] }),
      // a short ribbon: two straps rising from the loop in a V and leaning back, the way a medal icon draws it
      ...[-1, 1].map((s) => mesh(geo.box(0.13, 0.56, 0.02, 0.01), cloth, { p: [s * 0.1, R + 0.3, -0.06], r: [-18, 0, -s * 20] })),
    ], at);
    const left = medal(0.28, silver, { p: [-(hw + 0.6), -0.75, -1.5], r: [0, 18, -8] });
    const right = medal(0.26, bronze, { p: [hw + 0.6, -0.85, -1.7], r: [0, -16, 7] });
    return group(surface === 'cover' ? [medal(0.28, silver, { p: [hw + 0.55, -0.8, -1.7], r: [0, -16, 7] })] : [left, right]);
  },
};
