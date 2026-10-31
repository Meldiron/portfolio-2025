// Odyc Play: pixel games where every sprite is written as text.
// One object: a chunky voxel flamingo, the logo's bird, standing on one leg on a dark game tile lit pink along its top.
import { ACCENTS } from '../engine.js';

const SPRITE = [
  '...PPP......',
  '..PPPPP.....',
  'BBPKPPP.....',
  'KB...PP.....',
  '.....PP.....',
  '....PP......',
  '....PP......',
  '.....PP.....',
  '.....PPPPP..',
  '....PPPWWWP.',
  '....PPPPWWPP',
  '.....PPPPPP.',
  '......L.....',
  '......L.....',
  '......L.....',
  '.....LLL....',
];

export default {
  slug: 'odyc-play',
  title: 'Odyc Play',
  tagline: 'Make pixel games and share them with friends',
  echoText: 'ODYC',
  logo: '/public/projects/odyc-play.svg',
  accent: '#f58bb8',
  build({ mat, geo, mesh, group }) {
    const P = 0.17, cube = geo.box(P, P, P, P * 0.08);
    const sat = (c) => mat.satin(c, { rough: 0.45, clearcoat: 0.3 });
    const M = { P: sat('#f590ba'), W: sat('#e2689c'), B: sat('#fbbf24'), L: sat('#f6a93b'), K: mat.charcoal({ color: '#1b1b20' }) };
    const vox = [];
    SPRITE.forEach((row, j) => [...row].forEach((ch, i) => {
      if (ch === '.') return;
      const deep = j >= 8 && j <= 11 ? [-0.5, 0.5] : [0];
      for (const z of deep) vox.push(mesh(cube, M[ch], { p: [(i - 5.5) * P, (7.5 - j) * P, z * P] }));
    }));
    const tile = mesh(geo.box(1.0, 0.12, 0.7, 0.05), mat.charcoal(), { p: [0.0, -8.4 * P, 0] });
    // the shining part: the tile is a game tile, its top edge lit in the logo's pink, like a platform in a pixel game
    const lit = mesh(geo.box(0.9, 0.02, 0.6, 0.01), mat.glow('#f58bb8', { intensity: 0.75 }), { p: [0, -8.4 * P + 0.065, 0] });
    return group([...vox, tile, lit], { r: [0, 18, 0] });
  },
  // supporting cast (option B): two more little sprites, a heart and a coin, out of focus
  cast({ mat, geo, mesh, group, surface }) {
    const P = 0.13, cube = geo.box(P, P, P, P * 0.08);
    const sprite = (rows, colors, at) => group(rows.flatMap((row, j) => [...row].map((ch, i) => ch === '.' ? null : mesh(cube, mat.satin(colors[ch], { rough: 0.45, clearcoat: 0.3 }), { p: [(i - row.length / 2) * P, (rows.length / 2 - j) * P, 0] })).filter(Boolean)), at);
    const heart = sprite(['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ef5b7a' }, { p: [-1.75, -0.1, -1.5], r: [0, 16, -8] });
    const coin = sprite(['.YYY.', 'YYWYY', 'YYWYY', 'YYWYY', '.YYY.'], { Y: '#f6b73c', W: '#fde68a' }, { p: [1.65, 0.45, -1.7], r: [0, -14, 10] });
    return group(surface === 'cover' ? [coin] : [heart, coin]);
  },
};
