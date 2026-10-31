// Appwrite Arena: AI models ranked on Appwrite benchmarks.
// One object: a three-step podium with the logo's cube, lit rose, on the top step.
import { ACCENTS } from '../engine.js';

export default {
  slug: 'appwrite-arena',
  title: 'Appwrite Arena',
  tagline: 'AI models benchmarked on Appwrite tasks',
  echoText: 'ARENA',
  logo: '/public/projects/appwrite-arena.svg',
  accent: ACCENTS.rose,
  build({ mat, geo, mesh, group, label }) {
    const w = 0.8, d = 0.8, gap = 0.025;
    const steps = [[-(w + gap), 0.78, '2'], [0, 1.1, '1'], [w + gap, 0.56, '3']];
    const parts = [];
    for (const [x, h, n] of steps) {
      parts.push(mesh(geo.box(w, h, d, 0.05), mat.charcoal(), { p: [x, h / 2, 0] }));
      const num = label(n, { height: 0.24, color: '#8f8f9a', weight: 700 });
      num.position.set(x, h - 0.25, d / 2 + 0.004);
      parts.push(num);
    }
    // the cube rests on the winner's step, corner forward like the logo
    const cubeMat = mat.glow(ACCENTS.rose, { intensity: 0.55 }); cubeMat.roughness = 0.35;
    const cube = mesh(geo.box(0.5, 0.5, 0.5, 0.075), cubeMat, { p: [0, 1.1 + 0.25, 0], r: [0, 45, 0] });
    return group([...parts, cube], { r: [0, -14, 0] });
  },
  cast({ mat, geo, mesh, group, surface, center, floorY }) {
    const fy = floorY - center.y;
    // the runners-up: two smaller cubes resting on the floor either side, unlit
    const cube = (s, p, ry) => mesh(geo.box(s, s, s, s * 0.15), mat.charcoal({ color: '#42424d' }), { p: [p[0], fy + s / 2, p[1]], r: [0, ry, 0] });
    const left = cube(0.5, [-1.95, -1.5], 38), right = cube(0.44, [1.9, -1.7], 52);
    return group(surface === 'cover' ? [right] : [left, right]);
  },
};
