// Co na to AI: a daily Czech survey game where 100 AI models answer and the player guesses the eight most common answers.
// One object: one cell of a Pragotron split-flap board with PIVO flipping in, its lower half still hanging on the falling flap,
// and the blue "?" hint key lit next to it.
import { ACCENTS } from '../engine.js';

const W = 1.9, H = 1.0, D = 0.45; // the word cell
const K = 0.74; // the hint key next to it
const GAP = 0.05; // between the two housings
const SPLIT = 0.03; // the dark line where the flaps meet
const INSET = 0.08; // the cards sit this far inside the housing's face
const FRONT = D / 2;
const CARD_H = H / 2 - INSET - SPLIT / 2;
const WORD_H = 0.64; // the full height of the printed word
const FLAP_TILT = -38; // how far the falling flap has swung out from the face, in degrees

// Half of a printed word on a plane, cut at the split line: 'top' keeps the upper half, 'bottom' the lower.
function halfWord(THREE, tex, str, half, o = {}) {
  const px = 256, font = `${o.weight ?? 800} ${px}px Inter, ui-sans-serif, system-ui, sans-serif`;
  const m = document.createElement('canvas').getContext('2d'); m.font = font;
  const w = Math.ceil(m.measureText(str).width + px * 0.2), h = Math.ceil(px * 1.3);
  const t = tex(w, h, (ctx) => { ctx.font = font; ctx.fillStyle = o.color ?? '#ffffff'; ctx.textBaseline = 'middle'; ctx.textAlign = 'center'; if (o.track) ctx.letterSpacing = `${o.track * px}px`; ctx.fillText(str, w / 2, h / 2); });
  t.repeat.set(1, 0.5); t.offset.set(0, half === 'top' ? 0.5 : 0);
  const height = o.height ?? 0.6;
  return new THREE.Mesh(new THREE.PlaneGeometry((height * w) / h, height / 2), new THREE.MeshPhysicalMaterial({ map: t, transparent: true, roughness: 0.5, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }));
}

export default {
  slug: 'co-na-to-ai',
  title: 'Co na to AI',
  tagline: 'Daily Czech survey game answered by 100 AI models',
  accent: ACCENTS.blue,
  bloom: 0.16, // the key is a large emitter; at the usual bloom its halo swallows the question mark
  build({ THREE, mat, geo, mesh, group, label, tex }) {
    const housing = mat.charcoal({ color: '#30303a' });
    const card = mat.charcoal({ color: '#15151b', rough: 0.55 });
    const line = mat.charcoal({ color: '#0b0b0e', rough: 0.8 });
    const kx = W / 2 + GAP + K / 2;
    const ink = { color: '#e6e6ec', weight: 800, track: 0.02, height: WORD_H };

    // the two housings, side by side
    const wordBox = mesh(geo.box(W, H, D, 0.04), housing);
    const keyBox = mesh(geo.box(K, H, D, 0.04), housing, { p: [kx, 0, 0] });

    // the fixed upper card already shows the top half of PIVO; the lower card behind the flap is still blank
    const halfGeo = geo.box(W - INSET * 2, CARD_H, 0.04, 0.01);
    const upper = mesh(halfGeo, card, { p: [0, SPLIT / 2 + CARD_H / 2, FRONT + 0.012] });
    const lower = mesh(halfGeo, card, { p: [0, -(SPLIT / 2 + CARD_H / 2), FRONT + 0.012] });
    const upperWord = halfWord(THREE, tex, 'PIVO', 'top', ink);
    upperWord.position.set(0, SPLIT / 2 + WORD_H / 4, FRONT + 0.036);
    const split = mesh(geo.box(W - INSET * 2, SPLIT, 0.02, 0.004), line, { p: [0, 0, FRONT + 0.04] });

    // the falling flap, hinged on the split line and swung out towards the camera, carries the bottom half of PIVO
    const flapWord = halfWord(THREE, tex, 'PIVO', 'bottom', ink);
    flapWord.position.set(0, -(SPLIT / 2 + WORD_H / 4), 0.028);
    const flap = group([
      mesh(geo.box(W - INSET * 2, CARD_H, 0.025, 0.006), card, { p: [0, -(SPLIT / 2 + CARD_H / 2), 0] }),
      flapWord,
    ], { p: [0, 0, FRONT + 0.03], r: [FLAP_TILT, 0, 0] });

    // the shining part: the hint key, a blue plate with a question mark, split like the flaps
    const keyFace = mesh(geo.box(K - INSET * 2, H - INSET * 2, 0.04, 0.01), mat.glow(ACCENTS.blue, { intensity: 0.55 }), { p: [kx, 0, FRONT + 0.012] });
    const mark = label('?', { height: 0.5, color: '#0b1a33', weight: 800 });
    mark.position.set(kx, -0.01, FRONT + 0.036);
    const keySplit = mesh(geo.box(K - INSET * 2, SPLIT, 0.02, 0.004), line, { p: [kx, 0, FRONT + 0.04] });

    return group([wordBox, keyBox, upper, lower, upperWord, split, flap, keyFace, mark, keySplit], { p: [-kx / 2, 0, 0], r: [0, -14, 0] });
  },
};
