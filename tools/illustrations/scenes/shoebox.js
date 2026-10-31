// Shoebox: a private photo gallery other apps can sign in to.
// One object: the logo's box, its lid lifted open at the back, three printed landscapes standing inside.
import { ACCENTS } from '../engine.js';

const BW = 1.7, BH = 0.8, BD = 1.15, T = 0.07; // the box

// a printed landscape: dark hills under a cyan dusk; `sun` adds the one light
function landscape(tex, kind) {
  const w = 512, h = 640, horizon = 0.6 * h;
  const map = tex(w, h, (ctx) => {
    const sky = ctx.createLinearGradient(0, 0, 0, horizon); sky.addColorStop(0, '#102c38'); sky.addColorStop(0.5, '#1d7a8c'); sky.addColorStop(1, '#45d8ec');
    ctx.fillStyle = sky; ctx.fillRect(0, 0, w, horizon);
    const water = ctx.createLinearGradient(0, horizon, 0, h); water.addColorStop(0, '#15454f'); water.addColorStop(1, '#0b0b10');
    ctx.fillStyle = water; ctx.fillRect(0, horizon, w, h - horizon);
    if (kind === 'sun') { ctx.fillStyle = '#eafcff'; ctx.beginPath(); ctx.arc(0.64 * w, 0.4 * h, 0.07 * w, 0, Math.PI * 2); ctx.fill(); }
    if (kind === 'moon') { ctx.fillStyle = '#9fe8f2'; ctx.beginPath(); ctx.arc(0.3 * w, 0.3 * h, 0.05 * w, 0, Math.PI * 2); ctx.fill(); }
    const ridge = (pts, color) => { ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(0, h); pts.forEach(([x, y]) => ctx.lineTo(x * w, y * h)); ctx.lineTo(w, h); ctx.fill(); };
    if (kind === 'sun') { ridge([[0, 0.5], [0.2, 0.36], [0.4, 0.5], [0.58, 0.44], [0.8, 0.56], [1, 0.48]], '#1a2a30'); ridge([[0, 0.62], [0.3, 0.52], [0.5, 0.6], [0.72, 0.5], [1, 0.62]], '#13161b'); }
    if (kind === 'moon') { ridge([[0, 0.56], [0.25, 0.46], [0.55, 0.42], [0.85, 0.5], [1, 0.46]], '#1a2a30'); ridge([[0, 0.66], [0.2, 0.6], [0.45, 0.63], [0.7, 0.57], [1, 0.64]], '#13161b'); }
    if (kind === 'sea') { ridge([[0, 0.58], [0.3, 0.58], [0.42, 0.52], [0.52, 0.5], [0.64, 0.55], [0.7, 0.58], [1, 0.58]], '#13161b'); ctx.fillStyle = '#0d0d12'; ctx.fillRect(0, 0.62 * h, w, h); }
  });
  if (kind !== 'sun') return { map };
  const em = tex(w, h, (ctx) => {
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, h);
    const g = ctx.createRadialGradient(0.64 * w, 0.4 * h, 0.07 * w, 0.64 * w, 0.4 * h, 0.22 * w); g.addColorStop(0, 'rgba(34,211,238,0.5)'); g.addColorStop(1, 'rgba(34,211,238,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(0.64 * w, 0.4 * h, 0.07 * w, 0, Math.PI * 2); ctx.fill();
  });
  return { map, em };
}

export default {
  slug: 'shoebox',
  title: 'Shoebox',
  tagline: 'A private photo gallery with its own OAuth2 sign-in',
  echoText: 'SHOEBOX',
  logo: '/public/projects/shoebox.svg',
  accent: ACCENTS.sky,
  build({ THREE, mat, geo, mesh, group, tex }) {
    // the engine's off-white blows out under the key light; a darker stock with a soft coat reads as off-white on black
    const card = mat.offwhite({ color: '#b6b6bc', rough: 0.55, clearcoat: 0.2, env: 0.04 });
    card.clearcoatRoughness = 0.45;
    // the box: four walls as one bevelled ring, and a floor
    const walls = geo.roundRect(BW, BD, 0.06); walls.holes.push(geo.roundRect(BW - 2 * T, BD - 2 * T, 0.03));
    const box = group([
      mesh(geo.extrude([walls], BH - 0.06, { bevel: 0.03 }), card, { r: [-90, 0, 0] }),
      mesh(geo.box(BW - 0.04, 0.07, BD - 0.04, 0.01), card, { p: [0, -BH / 2 + 0.035, 0] }),
    ]);
    // the lid, lifted open at the back and leaning back
    const LW = BW + 0.1, LD = BD + 0.1;
    const rim = geo.roundRect(LW, LD, 0.07); rim.holes.push(geo.roundRect(LW - 0.14, LD - 0.14, 0.035));
    // the lid's inside faces both the key light and the camera and takes about twice the light the box front does;
    // a darker stock displays at the same brightness as the box instead of blowing out
    const lidMat = mat.offwhite({ color: '#96969c', rough: 0.55, clearcoat: 0.2, env: 0.04 });
    lidMat.clearcoatRoughness = 0.45;
    const lid = group([
      mesh(geo.box(LW, 0.08, LD, 0.03), lidMat, { p: [0, 0.04, LD / 2] }),
      mesh(geo.extrude([rim], 0.08, { bevel: 0.02 }), lidMat, { p: [0, -0.06, LD / 2], r: [-90, 0, 0] }),
    ], { p: [0, BH / 2 + 0.03, -BD / 2 - 0.02], r: [-135, 0, 0] }); // leaning well back: nearer upright, its inner face mirrors the key light straight into the camera and blows out
    // three prints standing inside, the front one tallest
    const paper = mat.offwhite({ color: '#b6b6bc', rough: 0.75, clearcoat: 0.05, env: 0.3 });
    const print = (kind, w, h, p, ry) => {
      const { map, em } = landscape(tex, kind);
      const m = mat.print(map, { gloss: 0.45 });
      if (em) { m.emissive = new THREE.Color('#ffffff'); m.emissiveMap = em; m.emissiveIntensity = 1.6; }
      return group([
        mesh(geo.box(w, h, 0.02, 0.004), paper),
        mesh(new THREE.PlaneGeometry(w - 0.09, h - 0.09), m, { p: [0, 0, 0.0105] }),
      ], { p: [p[0], -BH / 2 + 0.07 + h / 2 - 0.01, p[1]], r: [-6, ry, 0] });
    };
    const prints = [print('moon', 0.95, 1.0, [0.14, -0.3], 4), print('sea', 1.0, 1.1, [-0.02, -0.04], -3), print('sun', 0.9, 1.25, [-0.16, 0.22], 6)];
    return group([box, lid, ...prints], { r: [0, -6, 0] });
  },
  cast({ THREE, mat, geo, mesh, group, tex, surface, center, floorY }) {
    const fy = floorY - center.y;
    const paper = mat.offwhite({ color: '#b6b6bc', rough: 0.75, clearcoat: 0.05, env: 0.3 });
    // two loose prints that did not make it into the box, leaning back on the floor either side
    const print = (kind, w, h, p, r) => {
      const { map } = landscape(tex, kind);
      return group([mesh(geo.box(w, h, 0.02, 0.004), paper), mesh(new THREE.PlaneGeometry(w - 0.08, h - 0.08), mat.print(map, { gloss: 0.45 }), { p: [0, 0, 0.0105] })], { p, r });
    };
    const left = print('moon', 0.7, 0.84, [-1.75, fy + 0.4, -1.5], [-16, 24, -3]);
    const right = print('sea', 0.66, 0.8, [1.75, fy + 0.38, -1.7], [-12, -28, 4]);
    return group(surface === 'cover' ? [right] : [left, right]);
  },
};
