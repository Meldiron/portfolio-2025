// Almost Moments: guests add their photos of an event through a QR code, no app needed.
// One object: an off-white instant camera, a party photo rising from its slot, the shutter lit amber.
import { ACCENTS } from '../engine.js';

// the print: an instant photo of an evening party, white border, wider at the bottom
function partyPhoto(tex) {
  return tex(480, 600, (ctx, w, h) => {
    ctx.fillStyle = '#f4f2ee'; ctx.fillRect(0, 0, w, h);
    const m = 30, pw = w - 2 * m, ph = h - m - 112;
    ctx.save(); ctx.beginPath(); ctx.rect(m, m, pw, ph); ctx.clip();
    const sky = ctx.createLinearGradient(0, m, 0, m + ph);
    sky.addColorStop(0, '#1d1a3f'); sky.addColorStop(0.55, '#4a2a52'); sky.addColorStop(1, '#c2552f');
    ctx.fillStyle = sky; ctx.fillRect(m, m, pw, ph);
    // string lights across the top, soft bokeh
    const lights = [[60, 95], [120, 128], [182, 150], [246, 160], [310, 150], [372, 128], [432, 95]];
    for (const [x, y] of lights) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, 30);
      g.addColorStop(0, 'rgba(255,214,140,0.95)'); g.addColorStop(0.35, 'rgba(255,190,90,0.55)'); g.addColorStop(1, 'rgba(255,170,60,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 30, 0, Math.PI * 2); ctx.fill();
    }
    ctx.strokeStyle = 'rgba(255,220,160,0.35)'; ctx.lineWidth = 2; ctx.beginPath();
    ctx.moveTo(40, 85); ctx.quadraticCurveTo(246, 200, 452, 85); ctx.stroke();
    // balloons drifting up on the left
    const balloon = (x, y, r, c) => { const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r); g.addColorStop(0, '#ffffff'); g.addColorStop(0.08, c); g.addColorStop(1, c); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(x, y, r, r * 1.15, 0, 0, Math.PI * 2); ctx.fill(); };
    balloon(112, 300, 44, '#f26d5b'); balloon(170, 250, 38, '#fbbf24'); balloon(96, 212, 32, '#e9e5ff');
    // confetti
    const bits = [[300, 230, 20], [340, 300, -30], [390, 260, 60], [260, 330, 15], [420, 350, -50], [230, 400, 40], [360, 400, 70], [300, 370, -10]];
    const cols = ['#fbbf24', '#f5f1ea', '#ff6a55', '#ffd27a'];
    bits.forEach(([x, y, a], i) => { ctx.save(); ctx.translate(x, y); ctx.rotate((a * Math.PI) / 180); ctx.fillStyle = cols[i % 4]; ctx.fillRect(-9, -4, 18, 8); ctx.restore(); });
    // a warm crowd of silhouettes at the bottom
    ctx.fillStyle = '#2a1430';
    const heads = [[70, 455, 26], [138, 440, 30], [212, 462, 28], [290, 438, 32], [366, 458, 27], [430, 446, 29]];
    for (const [x, y, r] of heads) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.fillRect(x - r * 1.5, y + r * 0.7, r * 3, 200); }
    ctx.restore();
  });
}

export default {
  slug: 'almost-moments',
  title: 'Almost Moments',
  tagline: 'Every guest photo from an event, in one album',
  echoText: 'MOMENTS',
  logo: '/public/projects/almost-moments.svg',
  accent: ACCENTS.orange,
  key: 3.0, env: 0.1, // exposed for the white body: the rig is balanced for charcoal, so a white at full key and room light clips
  build({ THREE, mat, geo, mesh, group, tex }) {
    const W = 1.7, H = 1.12, D = 0.74, zf = D / 2;
    const steel = mat.metal('#cfd2d8', { rough: 0.3 });
    const ink = mat.charcoal({ color: '#121216' });
    const body = mesh(geo.box(W, H, D, 0.12), mat.offwhite({ color: '#e0e0e6' }));
    // the lens: metal ring, charcoal barrel, a thinner ring, then dark glass
    const z = (a) => zf + a;
    const lens = group([
      mesh(geo.cylinder(0.36, 0.36, 0.2), steel, { p: [0, 0, z(0.07)], r: [90, 0, 0] }),
      mesh(geo.cylinder(0.31, 0.31, 0.14), mat.charcoal(), { p: [0, 0, z(0.21)], r: [90, 0, 0] }),
      mesh(geo.cylinder(0.26, 0.255, 0.08), steel, { p: [0, 0, z(0.3)], r: [90, 0, 0] }),
      mesh(geo.cylinder(0.22, 0.22, 0.03), mat.satin('#0c0c10', { rough: 0.08, clearcoat: 1 }), { p: [0, 0, z(0.335)], r: [90, 0, 0] }),
    ], { p: [0.08, -0.06, 0] });
    const finder = mesh(geo.box(0.18, 0.15, 0.06, 0.02), ink, { p: [-0.58, 0.33, zf] });
    const flash = mesh(geo.box(0.3, 0.17, 0.05, 0.03), ink, { p: [0.57, 0.33, zf] });
    // the shutter, lit, in a steel bezel
    const shutter = group([
      mesh(geo.torus(0.12, 0.022), steel, { p: [0, 0, 0.02] }),
      mesh(geo.extrude([geo.circle(0.095)], 0.04, { bevel: 0.018 }), mat.glow(ACCENTS.orange, { intensity: 2.6 }), { p: [0, 0, 0.03] }),
    ], { p: [0.62, -0.25, zf] });
    // the photo rising out of the slot on top
    const PW = 0.72, PH = 1.04, out = 0.74;
    const slot = mesh(geo.box(0.9, 0.05, 0.06, 0.015), ink, { p: [-0.08, H / 2, -0.04] });
    const print = mesh(new THREE.PlaneGeometry(PW, PH), mat.print(partyPhoto(tex), { gloss: 0.5, rough: 0.35 }), { p: [0, 0, 0.0126] });
    const photo = group([mesh(geo.box(PW, PH, 0.024, 0.006), mat.offwhite({ color: '#e4e2dd' })), print], { p: [-0.08, H / 2 - PH / 2 + out, -0.04], r: [-6, 0, 4] });
    return group([body, lens, finder, flash, shutter, slot, photo], { r: [0, -10, 0] });
  },
  // the cast: two more prints from the same evening, loose beside the camera at different tilts
  cast({ THREE, mat, geo, mesh, group, tex, surface, size }) {
    const hw = (size.x * 0.906 + size.z * 0.423) / 2;
    const PW = 0.58, PH = 0.84;
    // the white border, then the picture clipped inside it
    const frame = (ctx, w, h, paint) => {
      ctx.fillStyle = '#f4f2ee'; ctx.fillRect(0, 0, w, h);
      const m = 30, pw = w - 2 * m, ph = h - m - 130;
      ctx.save(); ctx.beginPath(); ctx.rect(m, m, pw, ph); ctx.clip(); paint(m, m, pw, ph); ctx.restore();
    };
    // the dance floor: a mirror ball over a crowd with its arms up
    const dance = (ctx, w, h) => frame(ctx, w, h, (x, y, pw, ph) => {
      const g = ctx.createLinearGradient(0, y, 0, y + ph); g.addColorStop(0, '#2a1b4e'); g.addColorStop(0.6, '#5b2a6a'); g.addColorStop(1, '#8a3f5e');
      ctx.fillStyle = g; ctx.fillRect(x, y, pw, ph);
      const cx = x + pw / 2, cy = y + 90;
      const halo = ctx.createRadialGradient(cx, cy, 10, cx, cy, 120); halo.addColorStop(0, 'rgba(255,230,240,0.9)'); halo.addColorStop(1, 'rgba(255,200,230,0)');
      ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(cx, cy, 120, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#b9b1c8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, y); ctx.lineTo(cx, cy - 36); ctx.stroke();
      ctx.fillStyle = '#d8d2e2'; ctx.beginPath(); ctx.arc(cx, cy, 36, 0, Math.PI * 2); ctx.fill();
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, 36, 0, Math.PI * 2); ctx.clip(); ctx.strokeStyle = 'rgba(90,60,120,0.5)'; ctx.lineWidth = 2;
      for (let i = -24; i <= 24; i += 12) { ctx.beginPath(); ctx.moveTo(cx - 36, cy + i); ctx.lineTo(cx + 36, cy + i); ctx.moveTo(cx + i, cy - 36); ctx.lineTo(cx + i, cy + 36); ctx.stroke(); }
      ctx.restore();
      ctx.fillStyle = 'rgba(255,240,250,0.8)';
      for (const [sx, sy] of [[60, 160], [130, 230], [330, 210], [390, 150], [250, 260], [90, 320], [370, 300]]) { ctx.beginPath(); ctx.arc(sx, sy, 4, 0, Math.PI * 2); ctx.fill(); }
      ctx.fillStyle = '#1b1026'; ctx.strokeStyle = '#1b1026'; ctx.lineCap = 'round';
      for (const [hx, hy, r] of [[80, 440, 26], [160, 420, 30], [250, 445, 28], [340, 425, 31], [420, 448, 27]]) {
        ctx.beginPath(); ctx.arc(hx, hy, r, 0, Math.PI * 2); ctx.fill(); ctx.fillRect(hx - r * 1.4, hy + r * 0.7, r * 2.8, 300);
        ctx.lineWidth = r * 0.5; ctx.beginPath(); ctx.moveTo(hx - r * 1.2, hy + r); ctx.lineTo(hx - r * 1.9, hy - r * 1.6); ctx.moveTo(hx + r * 1.2, hy + r); ctx.lineTo(hx + r * 2.0, hy - r * 1.4); ctx.stroke();
      }
    });
    // the cake: two tiers on a table, four candles lit
    const cake = (ctx, w, h) => frame(ctx, w, h, (x, y, pw, ph) => {
      const g = ctx.createLinearGradient(0, y, 0, y + ph); g.addColorStop(0, '#15172e'); g.addColorStop(1, '#3a2a3a');
      ctx.fillStyle = g; ctx.fillRect(x, y, pw, ph);
      const cx = x + pw / 2, top = y + 300;
      const warm = ctx.createRadialGradient(cx, top - 40, 10, cx, top - 40, 230); warm.addColorStop(0, 'rgba(255,200,110,0.55)'); warm.addColorStop(1, 'rgba(255,170,80,0)');
      ctx.fillStyle = warm; ctx.fillRect(x, y, pw, ph);
      ctx.fillStyle = '#4a3340'; ctx.fillRect(x, top + 150, pw, ph);
      const tier = (tx, ty, tw, th, c, r) => { ctx.fillStyle = c; ctx.beginPath(); ctx.roundRect(tx, ty, tw, th, r); ctx.fill(); };
      tier(cx - 150, top + 60, 300, 100, '#e9d7c3', 14); tier(cx - 150, top + 60, 300, 22, '#d98b7a', 11);
      tier(cx - 100, top - 20, 200, 90, '#f3e6d6', 14); tier(cx - 100, top - 20, 200, 18, '#d98b7a', 9);
      for (const dx of [-60, -20, 20, 60]) {
        ctx.fillStyle = '#f5f1ea'; ctx.fillRect(cx + dx - 5, top - 80, 10, 62);
        const f = ctx.createRadialGradient(cx + dx, top - 92, 2, cx + dx, top - 92, 26); f.addColorStop(0, 'rgba(255,240,180,1)'); f.addColorStop(0.4, 'rgba(255,190,80,0.8)'); f.addColorStop(1, 'rgba(255,150,50,0)');
        ctx.fillStyle = f; ctx.beginPath(); ctx.ellipse(cx + dx, top - 92, 16, 26, 0, 0, Math.PI * 2); ctx.fill();
      }
    });
    const print = (draw, at) => group([
      mesh(geo.box(PW, PH, 0.024, 0.006), mat.offwhite({ color: '#e4e2dd' })),
      mesh(new THREE.PlaneGeometry(PW, PH), mat.print(tex(480, 700, draw), { gloss: 0.5, rough: 0.35 }), { p: [0, 0, 0.0126] }),
    ], at);
    const left = print(dance, { p: [-(hw + 0.65), -0.25, -1.5], r: [-10, 24, -16] });
    const right = print(cake, { p: [hw + 0.55, -0.4, -1.7], r: [-6, -20, 12] });
    return group(surface === 'cover' ? [right] : [left, right]);
  },
};
