// Project illustration studio: a small 3D product-shot renderer on three.js.
//
// A scene builds one to three objects from rounded primitives, extruded shapes and tubes, in a
// handful of studio materials (glass, frosted glass, glossy plastic, clay, metal, glow, printed
// paper). The studio supplies everything else and keeps it identical across projects: the camera,
// the lights, the reflections, the background, the bloom and the framing for each surface.
//
//   import { renderScene } from './engine.js';
//   await renderScene(canvas, scene, 1600, 840, 2);

import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { ICONS } from './icons.js';

export { THREE };
const col = (c) => new THREE.Color(c);

// ---------------------------------------------------------------- materials
// The only materials a banner uses, tuned to the studio light. Bodies are satin (charcoal or
// off-white); colour, glass and metal are small accents; one part may glow.
// Albedo above #dadae0 clips to white and looks like clip art; brighter colours are pulled down to it.
const lum = (c) => 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
const CAP = lum(new THREE.Color('#dadae0'));
function capAlbedo(c) { const y = lum(c); return y > CAP ? c.multiplyScalar(CAP / y) : c; }
// How strong each accent's glow is drawn, so every hue reads at the same lightness: greens and ambers
// are bright to the eye and get less, blues and violets get more.
export function accentGain(hex) {
  const hsl = {}; new THREE.Color(hex).getHSL(hsl); const h = hsl.h * 360;
  if (h >= 38 && h <= 165) return 0.45;
  if (h >= 205 && h <= 300) return 1.6;
  return 1;
}
// Twelve accents around the colour wheel. Give neighbours in the project list different ones, and take the
// project's brand colour where it has one, so the set does not repeat the same few colours.
export const ACCENTS = {
  coral: '#ff6a55', orange: '#fb923c', amber: '#fbbf24', lime: '#a3e635', emerald: '#34d399', teal: '#2dd4bf',
  cyan: '#22d3ee', sky: '#38bdf8', blue: '#4f7cff', violet: '#8b6cf6', magenta: '#e84cc4', rose: '#f43f75',
};
export const mat = {
  satin: (color, o = {}) => new THREE.MeshPhysicalMaterial({ color: capAlbedo(col(color)), roughness: o.rough ?? (lum(col(color)) > 0.35 ? 0.5 : 0.45), metalness: 0, clearcoat: o.clearcoat ?? 0.4, clearcoatRoughness: 0.2, envMapIntensity: o.env ?? 1 }),
  charcoal: (o = {}) => mat.satin(o.color ?? '#363640', o),
  // off-white is darker than it looks: under the key light #c4c4ca renders as a clean white without blooming
  offwhite: (o = {}) => mat.satin(o.color ?? '#c4c4ca', o),
  // glass for small accent pieces only
  glass: (tint = '#ffffff', o = {}) => new THREE.MeshPhysicalMaterial({
    color: col(o.color ?? '#ffffff'), metalness: 0, roughness: o.rough ?? 0.1, transmission: o.transmission ?? 0.9, thickness: o.thickness ?? 0.5,
    ior: o.ior ?? 1.45, attenuationColor: col(tint), attenuationDistance: o.depth ?? 0.8, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: o.env ?? 1.6,
  }),
  // metal for hardware: hinges, shackles, rings
  metal: (color = '#c9ccd3', o = {}) => new THREE.MeshPhysicalMaterial({ color: col(color), roughness: o.rough ?? 0.35, metalness: 1, envMapIntensity: o.env ?? 1.6, clearcoat: 0.2, clearcoatRoughness: 0.3 }),
  // the one lit part
  glow: (color, o = {}) => new THREE.MeshStandardMaterial({ color: col(color), emissive: col(color), emissiveIntensity: o.intensity ?? 2.6, roughness: 0.4 }),
  // printed surfaces drawn with tex(): photos, pages, labels
  // o.emissive (0..1): let the picture give off a little light of its own, such as a lit screen or a sunset
  print: (map, o = {}) => new THREE.MeshPhysicalMaterial({ map, roughness: o.rough ?? 0.5, clearcoat: o.gloss ?? 0.3, clearcoatRoughness: 0.25, transparent: !!o.transparent, emissive: o.emissive ? col('#ffffff') : col('#000000'), emissiveMap: o.emissive ? map : null, emissiveIntensity: o.emissive ?? 0 }),
};

// ---------------------------------------------------------------- geometry
export const geo = {
  // a box with rounded edges and corners
  box: (w, h, d, r = 0.08, seg = 8) => new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2, h / 2, d / 2)),
  sphere: (r, seg = 64) => new THREE.SphereGeometry(r, seg, seg / 2),
  cylinder: (rt, rb, h, seg = 64) => new THREE.CylinderGeometry(rt, rb, h, seg),
  torus: (r, tube, arc = Math.PI * 2) => new THREE.TorusGeometry(r, tube, 32, 96, arc),
  capsule: (r, len) => new THREE.CapsuleGeometry(r, len, 12, 32),
  // 2D shapes for extrude()
  roundRect(w, h, r) {
    const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
    r = Math.min(r, w / 2, h / 2);
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r);
    s.quadraticCurveTo(x + w, y + h, x + w - r, y + h); s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    return s;
  },
  circle(r, x = 0, y = 0) { const s = new THREE.Shape(); s.absarc(x, y, r, 0, Math.PI * 2, false); return s; },
  // Shapes from SVG path data (y down, as in SVG); scaled so the drawing is `size` tall and centred.
  svg(d, size = 1, viewBoxH) {
    const data = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`);
    const shapes = data.paths.flatMap((p) => SVGLoader.createShapes(p));
    const box = new THREE.Box2();
    shapes.forEach((s) => s.getPoints(32).forEach((p) => box.expandByPoint(p)));
    const h = viewBoxH ?? box.max.y - box.min.y, k = size / h, cx = (box.min.x + box.max.x) / 2, cy = (box.min.y + box.max.y) / 2;
    const map = (v) => new THREE.Vector2((v.x - cx) * k, -(v.y - cy) * k);
    return shapes.map((s) => {
      const out = new THREE.Shape(s.getPoints(64).map(map));
      out.holes = s.holes.map((h2) => new THREE.Path(h2.getPoints(64).map(map)));
      return out;
    });
  },
  // Extrude 2D shapes into a solid with rounded (bevelled) edges, centred on the origin.
  extrude(shapes, depth = 0.2, o = {}) {
    const b = o.bevel ?? Math.min(0.06, depth * 0.4);
    const g = new THREE.ExtrudeGeometry(shapes, { depth, bevelEnabled: b > 0, bevelThickness: b, bevelSize: o.bevelSize ?? b, bevelSegments: o.bevelSegments ?? 10, curveSegments: o.curveSegments ?? 64 });
    g.center(); g.computeVertexNormals();
    return g;
  },
  // A tube through 3D points; open tubes get round caps at both ends.
  tube(points, r = 0.05, o = {}) {
    const pts = points.map((p) => (p.isVector3 ? p : new THREE.Vector3(...p)));
    const curve = new THREE.CatmullRomCurve3(pts, !!o.closed, 'centripetal');
    const t = new THREE.TubeGeometry(curve, o.segments ?? Math.max(64, points.length * 8), r, 24, !!o.closed);
    if (o.closed || o.caps === false) return t;
    const cap = (p) => new THREE.SphereGeometry(r, 24, 12).translate(p.x, p.y, p.z);
    return mergeGeometries([t.toNonIndexed(), cap(curve.getPoint(0)).toNonIndexed(), cap(curve.getPoint(1)).toNonIndexed()]);
  },
};

// A Lucide line icon as glass or metal tubing: each stroke becomes a tube with round ends.
export function icon(name, material, o = {}) {
  const inner = ICONS[name];
  if (!inner) throw new Error(`icon ${name} is not in icons.js`);
  const size = o.size ?? 1, r = o.radius ?? size * 0.045, k = size / 24;
  const data = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${inner}</svg>`);
  const group = new THREE.Group();
  for (const p of data.paths) for (const sp of p.subPaths) {
    const pts = sp.getSpacedPoints(Math.max(24, Math.round(sp.getLength() * 6))).map((v) => new THREE.Vector3((v.x - 12) * k, -(v.y - 12) * k, 0));
    const closed = sp.autoClose || pts[0].distanceTo(pts[pts.length - 1]) < 1e-3;
    if (closed) pts.pop();
    group.add(new THREE.Mesh(geo.tube(pts, r, { closed }), material));
    if (!closed) for (const e of [pts[0], pts[pts.length - 1]]) { const cap = new THREE.Mesh(geo.sphere(r, 24), material); cap.position.copy(e); group.add(cap); }
  }
  return group;
}

// A canvas texture: draw(ctx, w, h) paints it.
export function tex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 16;
  return t;
}

// Flat text for printed labels (keycap legends, a tag, a page), as a transparent plane `height` tall.
export function label(str, o = {}) {
  const px = 256, font = `${o.weight ?? 600} ${px}px Inter, ui-sans-serif, system-ui, sans-serif`;
  const m = document.createElement('canvas').getContext('2d'); m.font = font;
  const w = Math.ceil(m.measureText(str).width + px * 0.2), h = Math.ceil(px * 1.3);
  const t = tex(w, h, (ctx) => { ctx.font = font; ctx.fillStyle = o.color ?? '#ffffff'; ctx.textBaseline = 'middle'; ctx.textAlign = 'center'; if (o.track) ctx.letterSpacing = `${o.track * px}px`; ctx.fillText(str, w / 2, h / 2); });
  const H = o.height ?? 0.2;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry((H * w) / h, H), new THREE.MeshPhysicalMaterial({ map: t, transparent: true, roughness: 0.5, emissive: o.glow ? col(o.color ?? '#fff') : col('#000'), emissiveMap: o.glow ? t : null, emissiveIntensity: o.glow ?? 0, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }));
  return mesh;
}

// Place a mesh: put(mesh, { p: [x, y, z], r: [rx, ry, rz] in degrees, s: scale })
export function put(obj, o = {}) {
  if (o.p) obj.position.set(...o.p);
  if (o.r) obj.rotation.set(...o.r.map((d) => THREE.MathUtils.degToRad(d)));
  if (o.s !== undefined) Array.isArray(o.s) ? obj.scale.set(...o.s) : obj.scale.setScalar(o.s);
  return obj;
}
export const mesh = (g, m, o) => put(new THREE.Mesh(g, m), o);
export const group = (children, o) => { const g = new THREE.Group(); children.forEach((c) => g.add(c)); return put(g, o); };

// ---------------------------------------------------------------- the studio
// One rig for every banner: near-black ground with the accent's glow behind the object, a key from
// the upper left, a fill at a third of it, two rim kickers from behind, a faint contact shadow and a
// soft puddle of the accent's light under the object. 85 mm lens, 15 degrees up, 25 degrees round.
// Three surfaces: 'cover' (1600 x 840), 'card' (300 x 160, the home carousel) and 'strip' (592 x 150).
export const GROUND = '#0b0b0e';
// The cover carries the project's name and a line on the left (see composeFrame), so its object sits on
// the right. The card and the strip have the title printed next to them on the site: object centred, no text.
const SURFACE = {
  cover: { fill: 0.62, place: [0.67, 0.5] },
  card: { fill: 0.72, place: [0.5, 0.5] },
  strip: { fill: 0.58, place: [0.5, 0.5] },
};

// the ground, computed per pixel so the glow is smooth (no 8-bit banding)
function backdropMesh(accent, px, py, aspect, o) {
  const m = new THREE.ShaderMaterial({
    depthTest: false, depthWrite: false,
    uniforms: { ground: { value: col(GROUND) }, accent: { value: col(accent) }, c: { value: new THREE.Vector2(px, 1 - py) }, aspect: { value: aspect }, radius: { value: o.radius }, strength: { value: o.strength }, pitch: { value: o.pitch }, dots: { value: o.dots }, echoTex: { value: o.echoTex ?? null }, echo: { value: o.echoTex ? o.echo : 0 }, wash: { value: o.wash ?? 0 }, horizon: { value: o.horizon ?? 0 }, horizonY: { value: o.horizonY ?? 0.3 }, horizonW: { value: o.horizonW ?? 0.5 }, bA: { value: o.bA ?? [new THREE.Vector4(), new THREE.Vector4(), new THREE.Vector4()] }, bB: { value: o.bB ?? [new THREE.Vector4(), new THREE.Vector4(), new THREE.Vector4()] }, bC: { value: o.bC ?? [new THREE.Vector4(), new THREE.Vector4(), new THREE.Vector4()] } },
    vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 1.0, 1.0); }',
    fragmentShader: `uniform vec3 ground; uniform vec3 accent; uniform vec2 c; uniform float aspect; uniform float radius; uniform float strength; uniform float pitch; uniform float dots; uniform sampler2D echoTex; uniform float echo; uniform float wash; uniform float horizon; uniform float horizonY; uniform float horizonW; uniform vec4 bA[3]; uniform vec4 bB[3]; uniform vec4 bC[3]; varying vec2 vUv;
      void main() {
        vec2 d = (vUv - c) * vec2(aspect, 1.0) / (radius * aspect);
        float g = exp(-dot(d, d) * 2.2) * strength;
        vec2 v = (vUv - 0.5) * vec2(aspect, 1.0);
        float vig = 1.0 - smoothstep(0.35, 1.25, length(v) / max(aspect, 1.0) * 1.6) * 0.5;
        // a faint dot grid, fading out away from the object
        vec2 cell = mod(gl_FragCoord.xy, pitch) - pitch * 0.5;
        float pt = 1.0 - smoothstep(pitch * 0.045, pitch * 0.075, length(cell));
        vec2 dd = (vUv - c) * vec2(aspect, 1.0) / (radius * aspect * 1.25);
        float grid = pt * exp(-dot(dd, dd) * 1.6) * dots;
        float e = echo > 0.0 ? texture2D(echoTex, vUv).a * echo : 0.0;
        vec3 col = (ground + accent * g + vec3(grid) + mix(vec3(1.0), accent, 0.35) * e) * vig;
        // side light: a soft wash of the accent grazing in from the left and right edges
        float ex = min(vUv.x, 1.0 - vUv.x) * aspect / max(aspect, 1.0);
        float sw = exp(-pow(ex / 0.14, 2.0)) * (0.4 + 0.6 * smoothstep(0.0, 0.9, vUv.y));
        col += mix(accent, vec3(1.0), 0.15) * sw * wash;
        // floor light: a thin band of light along the floor line, under the object only, fading out to both sides
        float hy = (vUv.y - horizonY);
        float band = exp(-pow(hy / 0.035, 2.0)) + 0.35 * exp(-pow(hy / 0.12, 2.0)) * step(hy, 0.0);
        float spread = exp(-pow((vUv.x - c.x) * aspect / horizonW, 2.0));
        col += mix(accent, vec3(1.0), 0.25) * band * spread * horizon;
        // light beams: soft shafts of light coming in from the edges of the frame, different on every banner
        for (int i = 0; i < 3; i++) {
          if (bB[i].w <= 0.0) continue;
          vec2 dir = vec2(cos(bA[i].z), sin(bA[i].z));
          vec2 d = (vUv - bA[i].xy) * vec2(aspect, 1.0);
          float along = dot(d, dir), perp = abs(d.x * dir.y - d.y * dir.x);
          // the beam is bB.w wide where it enters the frame and opens up by bA.w as it travels
          float w = bA[i].w * max(along, 0.0) + bB[i].w;
          // bC.x sets how crisp the beam's edges are: 1.4 is hazy, 3.5 is a clean shaft
          float beam = exp(-pow(perp / w, bC[i].x)) * exp(-max(along, 0.0) / bB[i].x) * smoothstep(-0.02, 0.1, along);
          col += mix(bC[i].yzw, vec3(1.0), bB[i].z) * beam * bB[i].y;
        }
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  const q = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), m); q.frustumCulled = false; q.renderOrder = -1000;
  return q;
}
function radialTexture(hex, inner = 1) {
  return tex(256, 256, (ctx) => { const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128); g.addColorStop(0, rgba(hex, inner)); g.addColorStop(0.45, rgba(hex, inner * 0.35)); g.addColorStop(1, rgba(hex, 0)); ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 256); });
}
function rgba(hex, a) { const c = new THREE.Color(hex); return `rgba(${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)},${a})`; }
function floorDecal(map, w, d, o) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshBasicMaterial({ map, transparent: true, opacity: o.opacity, blending: o.additive ? THREE.AdditiveBlending : THREE.NormalBlending, depthWrite: false, toneMapped: false }));
  m.rotation.x = -Math.PI / 2;
  return m;
}
const DitherShader = {
  uniforms: { tDiffuse: { value: null } },
  vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: 'uniform sampler2D tDiffuse; varying vec2 vUv; float h(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); } void main() { vec4 c = texture2D(tDiffuse, vUv); c.rgb += (h(gl_FragCoord.xy) + h(gl_FragCoord.yx + 7.0) - 1.0) / 255.0; gl_FragColor = c; }',
};

// scene: { accent, build(kit), and optional per-scene tuning: fill, place, yaw, elevation, glow, puddle, lift, exposure,
//          surfaces: { card: { fill, place }, strip: { fill, place } } }
export async function renderScene(canvas, scene, W, H, dpr = 2, surface) {
  surface = surface ?? (W / H > 2.6 ? 'strip' : W < 700 ? 'card' : 'cover');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(dpr); renderer.setSize(W, H, false);
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
  renderer.toneMapping = THREE.NeutralToneMapping; renderer.toneMappingExposure = scene.exposure ?? 1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const accent = scene.accent, aspect = W / H;

  const s = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  s.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  s.environmentIntensity = scene.env ?? 0.3;

  const root = await scene.build({ THREE, mat, geo, icon, tex, label, put, mesh, group, accent, surface });
  // parts can opt out of a surface: obj.userData.only = ['cover']
  root.traverse((o) => { if (o.userData?.only && !o.userData.only.includes(surface)) o.visible = false; });
  root.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  // Every banner needs one part that shines: a glowing part, or one that strongly reflects light (polished metal,
  // or a high clearcoat with low roughness). Without one the object looks dead. The export reports it.
  let shines = false;
  root.traverse((o) => {
    const m = o.isMesh && o.visible ? o.material : null;
    if (!m) return;
    if (isEmissive(m) || (m.emissiveMap && m.emissiveIntensity > 0.2)) shines = true;
    if ((m.metalness ?? 0) >= 0.9 && (m.roughness ?? 1) <= 0.22) shines = true;
  });
  if (!shines) console.error(`${scene.slug}: no shining part. Give one part mat.glow, or polished metal (roughness 0.22 or less).`);
  s.add(root); root.updateMatrixWorld(true);
  const box = new THREE.Box3();
  root.traverse((o) => { if (o.isMesh && o.visible && isVisible(o)) box.expandByObject(o); });
  const size = box.getSize(new THREE.Vector3()), center = box.getCenter(new THREE.Vector3());
  const floorY = box.min.y - (scene.lift ?? 0.1) * size.y;

  // lights: the object casts shadows onto itself only
  const K = scene.key ?? 4.8;
  const key = new THREE.DirectionalLight('#ffffff', K); key.position.copy(center).add(new THREE.Vector3(-4, 4.5, 4)); key.target.position.copy(center);
  key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0006; key.shadow.normalBias = 0.02;
  const sc = Math.max(size.x, size.y, size.z) * 0.9 + 0.5; Object.assign(key.shadow.camera, { left: -sc, right: sc, top: sc, bottom: -sc, near: 0.5, far: 40 });
  const fill = new THREE.DirectionalLight('#ffffff', K / 3); fill.position.copy(center).add(new THREE.Vector3(4.5, 1.5, 3)); fill.target.position.copy(center);
  // dark objects need a stronger rim to separate from the ground
  let albedo = 0, nm = 0;
  root.traverse((o) => { if (o.isMesh && o.visible && o.material?.color && !isEmissive(o.material)) { albedo += lum(o.material.color); nm++; } });
  const rimGain = scene.rim ?? (nm && albedo / nm < 0.1 ? 1.8 : 1);
  const rimColor = col('#ffffff').lerp(col(accent), scene.rimTint ?? 0.5);
  const rimR = new THREE.DirectionalLight(rimColor, K * rimGain); rimR.position.copy(center).add(new THREE.Vector3(4, 3, -4.5)); rimR.target.position.copy(center);
  const rimL = new THREE.DirectionalLight(rimColor, K * rimGain); rimL.position.copy(center).add(new THREE.Vector3(-4.5, 2.5, -4)); rimL.target.position.copy(center);
  s.add(key, key.target, fill, fill.target, rimR, rimR.target, rimL, rimL.target);

  // floor: a faint contact shadow right under the object and a soft puddle of the accent's light
  const contact = floorDecal(radialTexture('#000000', 1), size.x * 1.05 + 0.2, Math.max(size.z, 0.3) * 1.3 + 0.2, { opacity: scene.contact ?? 0.55 });
  contact.position.set(center.x, floorY + 0.001, center.z); s.add(contact);
  const pud = floorDecal(radialTexture(accent, 1), size.x * 2 + 0.4, Math.max(size.z, size.x * 0.45) * 2 + 0.4, { opacity: (scene.puddle ?? 0.2) * accentGain(accent), additive: true });
  pud.position.set(center.x, floorY + 0.002, center.z); s.add(pud);

  // camera
  const sf = { ...SURFACE[surface], ...(scene.surfaces?.[surface] ?? {}), ...(surface === 'cover' ? { fill: scene.fill ?? SURFACE.cover.fill, place: scene.place ?? SURFACE.cover.place } : {}) };
  const fov = scene.fov ?? 20, yaw = THREE.MathUtils.degToRad(scene.yaw ?? 25), el = THREE.MathUtils.degToRad(scene.elevation ?? 15);
  const [px, py] = sf.place;
  const dir = new THREE.Vector3(Math.sin(yaw) * Math.cos(el), Math.sin(el), Math.cos(yaw) * Math.cos(el));
  const cam = new THREE.PerspectiveCamera(fov, aspect, 0.1, 200);
  const fovR = THREE.MathUtils.degToRad(fov);
  const projH = size.y * Math.cos(el) + size.z * Math.sin(el);
  const projW = Math.abs(Math.cos(yaw)) * size.x + Math.abs(Math.sin(yaw)) * size.z;
  const maxW = surface === 'strip' ? 0.36 : surface === 'card' ? 0.62 : 0.4; // share of frame width the object may take
  const needH = Math.max(projH / sf.fill, projW / (maxW * aspect));
  const dist = needH / 2 / Math.tan(fovR / 2) + Math.max(size.x, size.z) / 2;
  cam.position.copy(center).addScaledVector(dir, dist); cam.lookAt(center);
  cam.setViewOffset(W, H, -(px - 0.5) * W, -(py - 0.5) * H, W, H);
  cam.updateProjectionMatrix();

  // option C, echo: the project's name set huge and faint behind the object
  let echoTex = null;
  if (scene.echo && (surface !== 'cover' || scene.echoCover)) {
    echoTex = tex(Math.round(W), Math.round(H), (ctx, w, h) => {
      const word = (scene.echoText ?? scene.title).toUpperCase();
      // The word spans the same width on every banner and always stays inside the frame. Long words get
      // smaller; short words are spaced out, so the object hides at most a letter or two, never the word.
      let size = h * (surface === 'cover' ? 0.36 : 0.46), track = 0;
      const target = w * (surface === 'cover' ? 0.5 : 0.84);
      const set = () => { ctx.font = `800 ${size}px Inter, sans-serif`; ctx.letterSpacing = `${track}px`; };
      set();
      let tw = ctx.measureText(word).width;
      if (tw > target) { size *= target / tw; set(); tw = ctx.measureText(word).width; }
      else if (word.length > 1) { track = Math.min(size * 0.22, (target - tw) / (word.length - 1)); set(); }
      ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(word, w * (surface === 'cover' ? px : 0.5) + track / 2, h * 0.5 + size * 0.04);
    });
    echoTex.colorSpace = THREE.NoColorSpace; echoTex.flipY = true;
  }
  // the ground is rendered once into a texture and used as the scene background, so it stays out of the depth of field
  cam.updateMatrixWorld();
  const floorOnScreen = new THREE.Vector3(center.x, floorY, center.z).project(cam);
  // the object's width as a share of the frame width, from its bounding box corners
  let minX = Infinity, maxX = -Infinity;
  for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) { const q = new THREE.Vector3(x, y, z).project(cam); minX = Math.min(minX, q.x); maxX = Math.max(maxX, q.x); }
  const objW = (maxX - minX) / 2;
  // the final style: light beams on every banner, unless a scene turns them off with lights: false
  const beams = (scene.lights ?? true) ? lightBeams(scene.slug + (scene.lightSeed ?? ''), px, 1 - py, aspect, accentGain(accent) * (scene.lightStrength ?? 1), accent) : null;
  const bgScene = new THREE.Scene(), bgCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  bgScene.add(backdropMesh(accent, px, py - 0.03, aspect, { radius: surface === 'strip' ? 0.24 : 0.36, strength: (scene.glow ?? 0.05) * accentGain(accent), pitch: H * dpr / 21, dots: scene.dots ?? 0.02, echoTex, echo: scene.echoStrength ?? 0.03, wash: scene.wash ? scene.washStrength ?? 0.04 * accentGain(accent) : 0, horizon: scene.horizon ? scene.horizonStrength ?? (scene.horizonFull ? 0.14 : 0.22) * accentGain(accent) : 0, horizonY: (floorOnScreen.y + 1) / 2, horizonW: scene.horizonFull ? 99 : Math.max(0.2, objW * aspect * 0.45), ...(beams ?? {}) }));
  const bgRT = new THREE.WebGLRenderTarget(W * dpr, H * dpr, { type: THREE.HalfFloatType });
  renderer.setRenderTarget(bgRT); renderer.render(bgScene, bgCam); renderer.setRenderTarget(null);
  s.background = bgRT.texture;

  // option A, stage: a dark glossy floor that fades into the distance, with a soft reflection of the object
  if (scene.stage) {
    s.fog = new THREE.Fog(GROUND, dist * 0.9, dist * 2.2);
    const mirror = root.clone(true);
    mirror.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; o.material = o.material.clone(); o.material.side = THREE.DoubleSide; o.material.transparent = true; o.material.opacity = 0.32; o.material.depthWrite = false; } });
    const rg = new THREE.Group(); rg.add(mirror); rg.scale.y = -1; rg.position.y = 2 * floorY; s.add(rg);
    // the floor is unlit (a lit plane catches the key as a white blob); it only dims the reflection, and fog fades it out
    const floorMat = new THREE.MeshBasicMaterial({ color: col(GROUND), transparent: true, opacity: 0.8 });
    const fl = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), floorMat); fl.rotation.x = -Math.PI / 2; fl.position.y = floorY - 0.001; fl.receiveShadow = true; fl.renderOrder = 1; s.add(fl);
    contact.renderOrder = 2; pud.renderOrder = 3;
  }

  // option B, supporting cast: a few related props beside the object, out of focus
  let bokeh = null;
  if (scene.useCast && scene.cast) {
    // props are placed in camera space: x to the right of the frame, y up, z away from the camera
    const cast = await scene.cast({ THREE, mat, geo, icon, tex, label, put, mesh, group, accent, surface, center, size, floorY });
    cast.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    const holder = new THREE.Group(); holder.position.copy(center); holder.rotation.y = yaw; holder.add(cast); s.add(holder);
    const focus = dist - Math.max(size.x, size.z) * 0.25; // the object's front half stays sharpest
    bokeh = new BokehPass(s, cam, { focus: focus * (globalThis.__focusK ?? 1), aperture: scene.aperture ?? 0.0035, maxblur: scene.maxblur ?? 0.009 });
  }

  // bloom only what is meant to glow: render the emissive parts alone, blur them, add them back
  const BLOOM = 7;
  root.traverse((o) => { if (o.isMesh && isEmissive(o.material)) o.layers.enable(BLOOM); });
  const bloomRT = new THREE.WebGLRenderTarget(W * dpr, H * dpr, { type: THREE.HalfFloatType });
  const bloomComposer = new EffectComposer(renderer, bloomRT);
  bloomComposer.renderToScreen = false; bloomComposer.setPixelRatio(dpr); bloomComposer.setSize(W, H);
  bloomComposer.addPass(new RenderPass(s, cam));
  bloomComposer.addPass(new UnrealBloomPass(new THREE.Vector2(W, H), scene.bloom ?? 0.28, 0.32, 0));
  const black = new THREE.MeshBasicMaterial({ color: '#000000' }), saved = new Map(), hidden = [];
  s.traverse((o) => {
    if (!o.isMesh) return;
    // the ground and floor decals stay out of the bloom; so do transparent parts such as printed labels
    if (o.renderOrder === -1000 || o.material?.blending === THREE.AdditiveBlending || (o.material?.transparent && !o.layers.isEnabled(BLOOM))) { if (o.visible) { o.visible = false; hidden.push(o); } return; }
    if (!o.layers.isEnabled(BLOOM)) { saved.set(o, o.material); o.material = black; }
  });
  const bgKeep = s.background; s.background = null;
  bloomComposer.render();
  s.background = bgKeep;
  saved.forEach((m, o) => (o.material = m)); hidden.forEach((o) => (o.visible = true));

  const rt = new THREE.WebGLRenderTarget(W * dpr, H * dpr, { type: THREE.HalfFloatType, samples: 8 });
  const composer = new EffectComposer(renderer, rt);
  composer.setPixelRatio(dpr); composer.setSize(W, H);
  composer.addPass(new RenderPass(s, cam));
  if (bokeh) composer.addPass(bokeh);
  const mix = new ShaderPass(new THREE.ShaderMaterial({
    uniforms: { baseTexture: { value: null }, bloomTexture: { value: bloomComposer.renderTarget2.texture } },
    vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: 'uniform sampler2D baseTexture; uniform sampler2D bloomTexture; varying vec2 vUv; void main() { gl_FragColor = texture2D(baseTexture, vUv) + vec4(texture2D(bloomTexture, vUv).rgb, 0.0); }',
  }), 'baseTexture');
  composer.addPass(mix);
  composer.addPass(new OutputPass());
  composer.addPass(new ShaderPass(DitherShader));
  composer.render();
  await new Promise((r) => requestAnimationFrame(r));
  return { renderer, dispose: () => { renderer.dispose(); pmrem.dispose(); rt.dispose(); bloomRT.dispose(); } };
}
// The cover's words: the project's logo, name and one line, set in Inter on the left third, over the render.
// Returns a 2D canvas holding the final image. Card and strip come back unchanged.
export async function composeFrame(gl, scene, W, H, dpr, surface) {
  const out = document.createElement('canvas'); out.width = W * dpr; out.height = H * dpr; out.id = 'out';
  const ctx = out.getContext('2d'); ctx.drawImage(gl, 0, 0, out.width, out.height);
  if (surface !== 'cover' || scene.text === false) return out;
  ctx.scale(dpr, dpr);
  const k = W / 1600, x = 120 * k, maxW = 560 * k;
  const T = 84 * k, t = 33 * k, logoS = 76 * k;
  const wrap = (str, font, max) => {
    ctx.font = font; const words = str.split(' '), lines = []; let cur = '';
    for (const w of words) { const n = cur ? cur + ' ' + w : w; if (ctx.measureText(n).width > max && cur) { lines.push(cur); cur = w; } else cur = n; }
    return [...lines, cur];
  };
  ctx.letterSpacing = `${-0.025 * T}px`;
  const tf = `600 ${T}px Inter, sans-serif`, titleLines = wrap(scene.title, tf, maxW);
  ctx.letterSpacing = '0px';
  const sf = `400 ${t}px Inter, sans-serif`, tagLines = scene.tagline ? wrap(scene.tagline, sf, maxW * 0.92) : [];
  const logo = await new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = scene.logo ?? `/public/projects/${scene.slug}.png`; });
  const h = (logo ? logoS + 34 * k : 0) + titleLines.length * T * 1.04 + (tagLines.length ? 22 * k + tagLines.length * t * 1.38 : 0);
  let y = H / 2 - h / 2;
  if (logo) {
    const r = logo.naturalWidth / logo.naturalHeight, lw = r >= 1 ? logoS : logoS * r, lh = r >= 1 ? logoS / r : logoS;
    ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, logoS, logoS, 18 * k); ctx.fillStyle = 'rgba(255,255,255,0.07)'; ctx.fill(); ctx.restore();
    const pad = 12 * k; ctx.drawImage(logo, x + pad + (logoS - 2 * pad - (lw - 2 * pad * lw / logoS)) / 2 - 0, y + pad + (logoS - 2 * pad - (lh - 2 * pad * lh / logoS)) / 2, lw - 2 * pad * lw / logoS, lh - 2 * pad * lh / logoS);
    y += logoS + 34 * k;
  }
  ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#ededf0'; ctx.font = tf; ctx.letterSpacing = `${-0.025 * T}px`;
  for (const l of titleLines) { y += T * 0.86; ctx.fillText(l, x - 3 * k, y); y += T * 0.18; }
  ctx.letterSpacing = '0px'; ctx.font = sf; ctx.fillStyle = 'rgba(237,237,240,0.6)';
  if (tagLines.length) y += 22 * k;
  for (const l of tagLines) { y += t * 1.0; ctx.fillText(l, x, y); y += t * 0.38; }
  return out;
}
// One to three soft beams of the accent's light, entering from the edges of the frame and aimed at the
// middle of the frame, where the object is. Everything about them comes from a random generator seeded with the project's slug, so every
// banner gets its own light, and the same banner always renders the same way.
// a small seeded random generator (mulberry32 over an FNV-1a hash of the seed string)
function rng(seed) {
  let h = 2166136261;
  for (const c of String(seed)) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => { h += 0x6d2b79f5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
function lightBeams(seed, cx, cy, aspect, gain, accent) {
  const r = rng(seed);
  const between = (a, b) => a + (b - a) * r();
  const n = 1 + Math.floor(r() * 3); // one, two or three beams, never more
  const first = r() < 0.5 ? 'left' : 'right';
  // the banner's mood: some are lit softly, some more boldly
  const mood = between(0.7, 1.35);
  const bA = [], bB = [], bC = [];
  for (let i = 0; i < 3; i++) {
    if (i >= n) { bA.push(new THREE.Vector4()); bB.push(new THREE.Vector4()); bC.push(new THREE.Vector4()); continue; }
    // the first beam comes from one side, the second from the other, a third from the top
    const side = i === 0 ? first : i === 1 ? (first === 'left' ? 'right' : 'left') : 'top';
    const ox = side === 'left' ? -0.03 : side === 'right' ? 1.03 : between(0.3, 0.7);
    const oy = side === 'top' ? 1.05 : between(0.45, 1.05);
    // every beam points at the middle of the frame, or just next to it
    const tx = cx + between(-0.04, 0.04), ty = cy + between(-0.08, 0.05);
    const ang = Math.atan2(ty - oy, (tx - ox) * aspect) + between(-0.04, 0.04);
    // one dominant beam, the others quieter; each with its own base width, spread, reach, edge and tint
    const strength = (i === 0 ? between(0.06, 0.13) : between(0.025, 0.085)) * mood * gain;
    // base width depends on how many beams share the frame: a lone beam is always broad, three stay narrower
    const [bmin, bmax] = n === 1 ? [0.22, 0.32] : n === 2 ? [0.13, 0.24] : [0.1, 0.16];
    const base = between(bmin, bmax), spread = between(0.04, 0.2) * (base > 0.2 ? 0.6 : 1);
    bA.push(new THREE.Vector4(ox, oy, ang, spread));
    bB.push(new THREE.Vector4(between(0.6, 1.6), strength, between(0, 0.45), base));
    // each beam's colour is the accent turned a little around the colour wheel, so a banner holds two or three
    // related tones instead of one flat colour
    const hsl = {}; new THREE.Color(accent).getHSL(hsl);
    const tone = new THREE.Color().setHSL((hsl.h + between(-0.05, 0.05) + 1) % 1, Math.min(1, hsl.s * between(0.85, 1.1)), hsl.l);
    bC.push(new THREE.Vector4(between(1.4, 3.5), tone.r, tone.g, tone.b));
  }
  // cap the banner's total light, weighted by how wide each beam is, so the boldest still never floods the frame
  const total = bB.reduce((t, b) => t + b.y * (0.6 + b.w * 2), 0), cap = 0.19 * gain;
  if (total > cap) bB.forEach((b) => (b.y *= cap / total));
  return { bA, bB, bC };
}
function isEmissive(m) { return !!(m && m.emissive && (m.emissive.r + m.emissive.g + m.emissive.b) > 0 && (m.emissiveIntensity ?? 1) > 0.05 && !m.emissiveMap); }
function isVisible(o) { for (let p = o; p; p = p.parent) if (!p.visible) return false; return true; }
