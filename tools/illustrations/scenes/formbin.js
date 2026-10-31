// FormBin: a free backend for HTML forms; submissions land in a bin instead of an inbox.
// One object: the logo's arch-shaped bin, a light grey body with a dark arch panel and lip so its shape reads,
// orange light from its slot, and a printed form half posted into it with one field underlined in orange.
import { ACCENTS } from '../engine.js';

// the logo's arch: a half-circle on top of a box with softened bottom corners
function arch(THREE, R = 0.7, straight = 0.95, r = 0.1) {
  const s = new THREE.Shape(), y0 = -(straight + R) / 2, yc = y0 + straight;
  s.moveTo(-R + r, y0); s.lineTo(R - r, y0); s.quadraticCurveTo(R, y0, R, y0 + r);
  s.lineTo(R, yc); s.absarc(0, yc, R, 0, Math.PI, false);
  s.lineTo(-R, y0 + r); s.quadraticCurveTo(-R, y0, -R + r, y0);
  return s;
}

export default {
  slug: 'formbin',
  title: 'FormBin',
  tagline: 'A free backend for HTML forms',
  echoText: 'FORMBIN',
  accent: ACCENTS.orange,
  elevation: 28,
  build({ THREE, mat, geo, mesh, group, tex }) {
    // a white object needs contrast to read: a mid-light grey body, and dark parts (panel, lip) that draw its shape
    const body = mat.offwhite({ color: '#a2a2ab' });
    const dark = mat.charcoal({ color: '#2a2a32' });
    // the shape is drawn 0.05 small: the bevel grows the sides back to a 1.5 wide, 1.75 tall arch
    const bin = mesh(geo.extrude(arch(THREE), 0.75, { bevel: 0.05 }), body);
    const apex = 0.125 + 0.75;
    // a shallow raised panel on the front repeats the arch, so the face has an edge to catch the light
    const panel = mesh(geo.extrude(arch(THREE, 0.56, 0.8, 0.08), 0.03, { bevel: 0.014 }), dark, { p: [0, -0.02, 0.44] });
    // the slot: a raised lip sunk into the crown, and the light inside it, the only lit part
    const lip = mesh(geo.box(0.92, 0.22, 0.24, 0.04), dark, { p: [0, apex - 0.06, 0] });
    const slot = mesh(geo.box(0.86, 0.1, 0.16, 0.02), mat.glow(ACCENTS.orange, { intensity: 1.8 }), { p: [0, apex + 0.07, 0] });
    // the form: a title, three underlined fields (the second one focused, in violet) and a submit button
    const page = tex(512, 810, (ctx, w, h) => {
      const ink = '#34343d', rule = '#9a9aa4', m = 44;
      const rr = (x, y, ww, hh, r, fill) => { ctx.beginPath(); ctx.roundRect(x, y, ww, hh, r); ctx.fillStyle = fill; ctx.fill(); };
      rr(m, 48, w * 0.44, 30, 15, ink);
      const field = (y, typed, focus) => {
        rr(m, y, w * 0.2, 13, 6.5, rule);
        if (typed) rr(m, y + 30, w * typed, 20, 10, ink);
        rr(m, y + 62, w - 2 * m, focus ? 7 : 5, 3, focus ? ACCENTS.orange : rule);
      };
      field(140, 0.32, false); field(270, 0.18, true); field(400, 0, false);
      rr(m, 540, w * 0.36, 58, 29, ink);
    });
    const paper = group([
      mesh(geo.box(0.8, 1.26, 0.022, 0.012), mat.offwhite({ color: '#c2c2c8', rough: 0.6, clearcoat: 0.1 })),
      mesh(new THREE.PlaneGeometry(0.74, 1.17), mat.print(page, { transparent: true, gloss: 0.1 }), { p: [0, 0.005, 0.0115] }),
    ], { p: [0, apex + 0.45, 0], r: [5, 0, -4] });
    return group([bin, panel, lip, slot, paper], { r: [0, -12, 0] });
  },
  // the cast, more mail on its way in: a form page on the left and an envelope on the right, both leaning towards the slot
  cast({ THREE, mat, geo, mesh, group, tex, surface, size }) {
    const hw = (size.x * 0.906 + size.z * 0.423) / 2;
    const stock = mat.offwhite({ color: '#c2c2c8', rough: 0.6, clearcoat: 0.1 });
    // a shorter form: a title, three underlined fields and a button, none of them focused
    const page = tex(512, 740, (ctx, w) => {
      const ink = '#34343d', rule = '#9a9aa4', m = 44;
      const rr = (x, y, ww, hh, r, fill) => { ctx.beginPath(); ctx.roundRect(x, y, ww, hh, r); ctx.fillStyle = fill; ctx.fill(); };
      rr(m, 48, w * 0.4, 30, 15, ink);
      for (const y of [150, 280, 410]) { rr(m, y, w * 0.2, 13, 6.5, rule); rr(m, y + 62, w - 2 * m, 5, 2.5, rule); }
      rr(m, 540, w * 0.34, 58, 29, ink);
    });
    const form = group([
      mesh(geo.box(0.66, 0.95, 0.022, 0.012), stock),
      mesh(new THREE.PlaneGeometry(0.6, 0.87), mat.print(page, { transparent: true, gloss: 0.1 }), { p: [0, 0, 0.0115] }),
    ], { p: [-(hw + 0.6), 0.05, -1.5], r: [8, 28, -18] });
    // the envelope: a flat pocket, its closed flap a shade darker so the V reads
    const flap = new THREE.Shape(); flap.moveTo(-0.42, 0.28); flap.lineTo(0.42, 0.28); flap.lineTo(0, -0.05); flap.closePath();
    const envelope = group([
      mesh(geo.box(0.86, 0.58, 0.035, 0.015), stock),
      mesh(geo.extrude([flap], 0.012, { bevel: 0.005 }), mat.offwhite({ color: '#adadb5', rough: 0.6, clearcoat: 0.1 }), { p: [0, 0.115, 0.022] }),
    ], { p: [hw + 0.55, -0.05, -1.65], r: [10, -26, 18] });
    return group(surface === 'cover' ? [envelope] : [form, envelope]);
  },
};
