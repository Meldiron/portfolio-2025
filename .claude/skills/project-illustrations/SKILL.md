---
name: project-illustrations
description: Make the banner illustration for a portfolio project (project list strip, home carousel card, project page cover, Open Graph image) as a 3D product shot with the in-repo three.js studio. Use when adding a project, replacing a banner, or changing the illustration tooling.
---

# Project illustrations

Every project banner on matejbaco.eu is a small 3D product shot: **one object on near-black, lit by a few soft beams of the project's colour**. They are built and lit in code with `tools/illustrations/` (three.js, rendered on the GPU through Playwright). No image model is involved.

**The final design, approved by the client on 2026-10-31.** Every banner has:
- one 3D object at the centre, with exactly one shining part;
- the near-black studio ground with the accent's glow behind the object;
- one to three light beams of the accent's colour, coming in from the edges and aimed at the middle;
- no background word;
- the project's logo, name and one line on the left of the cover only.

The engine does all of this by default. A new scene needs only its object, accent, tagline and logo.

The bar is a designer's banner, not a program's output. The client's references are Appwrite's blog covers (appwrite.io/blog) and Apple's product illustrations. The client rejected busy banners, many colours, interface mockups and anything that looks generated.

## The art direction (fixed for all banners)

The studio in `engine.js` already does all of this. Do not override it per scene unless a critique says so.

- **Ground**: `#0B0B0E` and a soft vignette.
  - One smooth radial glow in the project's accent sits behind the object.
  - It is computed per pixel and dithered, so it never bands.
  - Its strength is balanced per hue (`accentGain`), so every accent reads at the same lightness: greens and ambers at 0.45x, blues and violets at 1.6x.
- **Light**: the same rig on every banner.
  - Key from the upper left.
  - Fill from the right at a third of the key.
  - Two rim kickers from behind, left and right, tinted halfway to the accent so both edges separate from the black.
  - Environment light at 0.3.
  - Dark objects automatically get a stronger rim.
  - Bloom is selective: only `mat.glow` parts bloom. Lit white surfaces never haze.
- **Camera**: 85 mm equivalent (FOV 20), 15 degrees above, 25 degrees round to the right.
- **Surfaces**: three, each rendered on its own, never cropped from another.
  - The cover: 1600 x 840, also the Open Graph image. Laid out like an Appwrite blog cover.
    - Left third: the project's logo, its name in Inter 600, and one line in Inter 400. Drawn by `composeFrame`.
    - Right: the object, filling 62% of the height or 40% of the width, centred at x = 0.67.
  - The home card: 300 x 160. The object at 72%, centred. No text: the site prints the title right under it.
  - The list strip: 592 x 210, a taller card than the old 150. The object at 58%, centred, with room above and below it. No text: the title and description sit right above it.

  A part that only makes sense large (a small text chip) sets `obj.userData.only = ['cover']`.
- **Floor**: invisible, except for a faint contact shadow and a soft puddle of the accent's light under the object.
  - There is no cast shadow on the floor.
  - The object shadows only itself.
- **Materials**:
  - Bodies are satin: `mat.charcoal()` or `mat.offwhite()`, or `mat.satin(color)` for a part that is naturally coloured (the pink flamingo).
  - `mat.metal()` is only for hardware: shackles, rings, hinges.
  - `mat.glass()` is only for a small accent piece.
  - `mat.glow(accent)` lights exactly one part. Colour covers about 15% of the object or less.
- **Accent**: one per project, from the twelve `ACCENTS`: coral, orange, amber, lime, emerald, teal, cyan, sky, blue, violet, magenta, rose.
  - Take the project's brand colour where it has one (KeyDS emerald, FormBin orange, Rdo1337 Kick lime).
  - Projects next to each other in the list use different accents, and no accent appears more than three times in the set.
  - The light beams turn each beam's colour slightly round the colour wheel (at most 18 degrees), so a banner holds two or three related tones. Larger shifts turn amber olive and orange red; keep them small.

## The light beams (part of the final design)

Every banner gets light beams by default (`lights` is on unless a scene sets `lights: false`).
- **Count:** one to three soft beams of the accent's light enter from the frame edges. The first comes from the left or right, the second from the other side, a third from the top. Never more than three.
- **Aim:** every beam points at the middle of the frame, or just next to it.
- **Base width:** depends on how many beams share the frame.
  - A single beam is always broad (0.22 to 0.32 of the frame).
  - Two are medium (0.13 to 0.24).
  - Three stay narrower (0.10 to 0.16).
  - No beam is ever thin.
- **Variety:** each banner gets:
  - an overall mood, from soft to bold;
  - one dominant beam and quieter others;
  - for each beam: its own spread, reach, edge crispness (hazy to clean shaft) and tint;
  - a colour turned at most 18 degrees round the colour wheel from the accent.
- **Cap:** the total light per banner is capped, so even a bold one never floods the frame.
- **Seed:** all of it comes from a random generator seeded with the slug, so every banner differs and a banner always renders the same way.
- **Tuning:** if a banner's arrangement does not suit its object, set `lightSeed: 'b'` (any string) to roll a new one, or `lightStrength: 0.8` to scale it.

**Tried and not used.** The engine keeps these as flags for experiments only:
- the background word (`echo`, `echoText`);
- the side light (`wash`);
- the floor light under the object or across the full width (`horizon`, `horizonFull`).

**Rejected by the client, do not use:**
- floating supporting props (`useCast`, `cast()`);
- a glossy reflective floor (`stage`).

## The words on the cover

- **The name** is the project's name exactly as the site shows it.
- **The line** says what the project is in at most about nine words.
  - It is concrete: the thing and who or what it is for. "Games you play by sending REST requests". "Share a password through a link that opens once".
  - No slogan words. Follow the writer skill: no em dashes, no contractions, no possessive 's.
- **No other text** on the cover, except a chip the scene itself draws as part of the object.

## Every banner has one shining part

Each banner needs one part that shines: a `mat.glow` part, or one that strongly reflects light. Strong reflection means polished metal with roughness 0.22 or less, like the TMStats gold medal. Without one, the object looks dead. The engine checks this, and the export prints `<slug>: no shining part` if a scene has none. A dark object with no glow can light its base instead (Odyc Play's game tile lit pink along its top).

## Rules for the whole set

Judge every banner in the context of the full list, not on its own.

- **Accent rhythm.** Six accents, at most four banners each, and no two neighbours in the list share a hue.
- **Alternate bodies** between white and charcoal down the list where the subject allows.
- **Vary the pose**, keeping the rig. A few objects airborne or mid-action (a coin mid-flip, a photo sliding out), one or two resting flat, the rest in a confident 3/4 view.
- **No repeated gimmick.** A glowing ring on a key, a headset, a mine and a pin reads as a template. Give each object its own specific lit detail.
- **Text chips:** at most three across the whole set, on the cover only, with at least 28 px cap height at 1600 x 840.
- **Bend, twist or groove flat slabs** (ribbons, contours, cables). Flat untextured slabs read as placeholder geometry.
- **No hot white.** Albedo is capped at `#dadae0`. If a white object still looks blown, lower the scene's `key` and `env`.

## Lessons from fixing banners

- **White objects need contrast or they read as a blob** (FormBin). A large white body at full brightness, with every part the same white, shows no shape at all. Fix:
  - drop the body to a light grey (about `#a2a2ab`);
  - make the parts that define the shape dark: a charcoal front panel, lip, base or slot;
  - let one colour come from the glowing part.

  Check the strip: you should be able to name the object's parts, not only its outline.
- **Centred is about what the eye centres on, not the bounding box** (RSGuessr). The engine centres the bounding box, but the eye centres on the hero and its relation to what it stands on. Fixes:
  - details on the base (contour rings, engravings, a spotlight on a puck) must be concentric with the hero, not offset;
  - stand the hero upright, without a sideways lean;
  - turn the hero's key face (the dot, the screen, the label) towards the camera. Rotate it by the camera yaw (25 degrees) minus the group's own turn.

## Lessons from the first 20 banners

These cost time to find. Apply them from the start.

- **White bodies.** `mat.offwhite()` defaults to `#c4c4ca`, which renders as clean white under the key light.
  - Brighter stocks bloom and clip.
  - A large white object may also need `key: 3.0` and `env: 0.1` on the scene.
  - Small white parts on a charcoal object look right at about `#b0b0b8`.
- **Glow strength by hue.** Coral and rose wash to white above an intensity of about 1.9. Amber, lime and cyan hold up to about 2.4. Violet holds up to about 2.2. Glow only small parts: a large glowing area turns pastel.
- **Flat metal looks muddy.** It mirrors the dark room. Use metal only on curved hardware (rings, shackles, rims, poles).
- **Flat objects** (a mouse, a book, a card lying down) need a higher camera: `elevation: 30` to `36`. Otherwise you see an edge, not the object.
- **Printed pictures** take `mat.print(map, { emissive: 0.4 })` when a lit area inside them should glow (a sunset, a screen).
- **Text labels** sit a hair in front of their surface. `label()` already pushes itself forward in depth, so it never flickers into the face behind it.
- **Tubes** made with `geo.tube` get round caps at both ends unless `caps: false` is passed.
- **Physical metaphors beat interface.** A padlock, a piggy bank, an ID badge or a headset reads at 300 x 160. A sign-in form or a dashboard does not.
- **When an object reads as a blob** at card size (a mouse seen from above), change the object, not the lighting.

## Files

| Path | What it is |
| --- | --- |
| `tools/illustrations/engine.js` | The studio, the materials (`mat`), `ACCENTS`, the geometry helpers (`geo`), and `icon`, `label`, `tex`, `mesh`, `group`, `put`. |
| `tools/illustrations/icons.js` | Lucide icons (ISC). `icon(name, material)` turns one into tubing. |
| `tools/illustrations/scenes/<slug>.js` | One scene per project. |
| `tools/illustrations/scenes/index.js` | The list of scenes, in site order. Only the studio overview uses it. |
| `tools/illustrations/studio.html` | Renders one frame (`?p=slug&w=&h=&dpr=`) or an overview (`?all=1`, `?only=a,b`). |
| `tools/illustrations/export.mjs` | Renders `<slug>.webp` (1600 x 840 cover), `<slug>-og.jpg` (1200 x 630 Open Graph), `<slug>-card.webp` (600 x 320) and `<slug>-strip.webp` (1184 x 420), supersampled on the GPU. Each scene renders on its own, so a broken scene fails alone, and a scene with no shining part is reported. `--sizes cover,strip` limits the surfaces; `--variant` tries experimental flags. |
| `src/lib/banner.ts` | `bannerSize(coverUrl, 'card' \| 'strip' \| 'og')`: finds the other sizes next to a cover. The list page, home carousel and Open Graph tags use it. |
| `tools/illustrations/review.mjs` | Lays out exports as the site shows them: the cover, the real-size 300 x 160 card and the real-size 592 x 150 strip, on black. |

## Procedure for one banner

1. **Read the subject.** Read `src/content/projects/<slug>.md` and look at the logo in `public/projects/`. Say what the project is in one sentence.
2. **Choose the object. Silhouette first.** Pick one physical thing that says the project, the way an icon designer would: a padlock with its shackle swung open, a game controller, a voxel flamingo.
   - Imagine it as a solid black shape on white at 300 x 160. If it is not recognisable, choose another object.
   - Prefer the logo's own object when the logo has one.
   - Never a screenshot, a dashboard, a form or a grid of tiles.
3. **Give it one charming detail and one light.** The detail is what makes it designed rather than stock: the shackle popped open, the flamingo on one leg on its little tile, the "POST /move" chip hovering over the pressed button. The light is the single `mat.glow` part.
4. **At most two companions,** and only if they tell the story, such as the request chip or a photo leaving a camera. No scattered decorations.
5. **Model it.** Use rounded primitives and bevelled extrusions:
   - `geo.box` rounds its corners;
   - `geo.extrude(shape, depth, { bevel })` with a bevel of about 3% of the object size, so edges catch the rim light;
   - `geo.roundRect`, `geo.circle` and `geo.svg(d)` make 2D shapes, and `geo.svg(d)` imports a logo outline;
   - `geo.torus`, `geo.cylinder`, `geo.capsule`, `geo.sphere` and `geo.tube` cover the rest.

   Use `label()` for short printed words and `tex()` for printed pictures (a photo, a page). Pose the object for character: a slight turn or tilt. Mind the camera's 25 degree yaw.
6. **Render and review:**

   ```sh
   node tools/illustrations/export.mjs --only <slug> --out <scratch dir>
   node tools/illustrations/review.mjs <scratch dir> --only <slug>
   ```

   `playwright`, `sharp` and `three` are devDependencies of the repo, so `npm install` is enough. Rendering uses the Mac's GPU through Metal; set `GL=swiftshader` to render on the CPU.

   Then look at `review.png`.
7. **Critique, fix, repeat. At most three rounds.** Check, in this order:
   - **One glance at the 300 x 160 card.** You can name the object, and it is this project.
   - **Silhouette.** Clear outline, nothing tangent to the frame or to another part.
   - **Light.** Exactly one glowing part. Rim light visible on the edges. No blown white areas.
   - **Colour.** Mostly neutral. The accent is small and deliberate.
   - **Craft.**
     - Bevels catch light.
     - No interpenetrating parts unless intended.
     - No floating parts that look like mistakes.
     - Text is crisp and short.
   - **Strip.** The object reads at 592 x 150 and sits in the right part.

   When stuck, ask a fresh agent for an art-direction critique of the review sheet, without telling it what you intended.

## Scene API

```js
import { ACCENTS } from '../engine.js';

export default {
  slug: 'almost-vault',
  title: 'Almost Vault',
  accent: ACCENTS.coral,
  tagline: 'Share a password through a link that opens once', // the cover's one line
  logo: '/public/projects/almost-vault.png',                  // optional; defaults to /public/projects/<slug>.png
  // optional tuning: fill, place, surfaces: { card: { fill, place }, strip: { fill, place } }, yaw (25), elevation (15),
  //                  glow, puddle, dots, lift, key, rim, env, bloom, exposure, text: false (no words on the cover),
  //                  lightSeed (roll another beam arrangement), lightStrength (scale the beams), lights: false
  build({ THREE, mat, geo, mesh, group, label, tex, icon }) {
    const body = mesh(geo.extrude(geo.roundRect(1.5, 1.2, 0.3), 0.56, { bevel: 0.05 }), mat.charcoal(), { p: [0, -0.4, 0] });
    const keyhole = mesh(geo.extrude([geo.circle(0.12)], 0.02), mat.glow(ACCENTS.coral), { p: [0, -0.36, 0.335] });
    return group([body, keyhole], { r: [0, -8, 0] });
  },
};
```

- `mesh(geometry, material, { p: [x, y, z], r: [rx, ry, rz] in degrees, s: scale })`. `group(children, { p, r, s })` works the same way.
- Units are arbitrary: the camera frames the object's bounding box. Model at a size of about 1 to 3 units.
- The object faces +z (towards the camera before the yaw). The floor is placed under its lowest point automatically.
- `label(text, { height, color, weight })` gives a flat text plane, facing +z. Place it just in front of the surface it is printed on.

## Adding banners to the site

1. Run `node tools/illustrations/export.mjs --only <slug>`. It writes four files into `public/projects/illustrations/`:
   - `<slug>.webp`;
   - `<slug>-og.jpg`;
   - `<slug>-card.webp`;
   - `<slug>-strip.webp`.
2. In the project's frontmatter, set:

   ```yaml
   cover: { url: "/projects/illustrations/<slug>.webp", alt: "<what the object is, in one plain sentence>" }
   ```

   The alt text follows the writer skill: no em dashes, no contractions, no possessive 's.
3. Nothing else is needed: the site takes the other sizes from the cover URL (`src/lib/banner.ts`).
   - **Project list** (`src/pages/projects/index.astro`): the 592 x 210 strip, with no fade over it.
   - **Home carousel** (`src/pages/index.astro`): the 300 x 160 card.
   - **Project page** (`src/pages/projects/[slug].astro`): the titled cover, plus `<slug>-og.jpg` as its Open Graph image.
4. After changing the engine, re-export every project with `node tools/illustrations/export.mjs`, so the set stays consistent.
