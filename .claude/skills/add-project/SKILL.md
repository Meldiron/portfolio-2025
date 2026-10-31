---
name: add-project
description: Add a new project to the portfolio as an agentic case study. Covers researching the project, the questionnaire, writing the case study and questionnaire files, screenshots and logo, the 3D banner illustration, checking the build, and publishing. Use whenever a project is added to matejbaco.eu, or an existing project is rewritten as a case study.
---

# Add a project

A project on matejbaco.eu consists of these parts:
- a case study, `src/content/projects/<slug>.md`;
- the questionnaire it was written from, `src/content/questionnaires/<slug>.md`;
- a logo;
- screenshots;
- a banner illustration in three sizes.

Do the steps in order. Ask before publishing: `main` deploys to the live site through Vercel.

Related skills:
- `.claude/skills/writer.md`: every rule for the text. No em dashes, no contractions, no possessive 's, link technologies, spell out abbreviations.
- `.claude/skills/project-illustrations/SKILL.md`: how to make the banner (step 6).

## 1. Research the project

Read the code, the commit history and the live app before asking anything:
- the stack;
- what the app does, flow by flow;
- the timeline from the commits (dates, counts, what each day produced);
- who it is for;
- anything that looks broken or unclear.

Run the app locally if you can. Write a short summary of what you found, because it opens the questionnaire.

## 2. Ask the questionnaire

Never write the case study from guesses. Build the questions from your research:
- a **fact check** of claims you are unsure about;
- the **framing** and origin of the project;
- what the author is proud of;
- the learnings;
- what to show and how, including screenshot notes.

Give the author a local HTML form with the questions and a "Copy answers" button that copies the answers as Markdown. They paste the result back into the chat.

## 3. Write the files

- **`src/content/projects/<slug>.md`**: mirror the newest agentic case study.
  - Frontmatter, in this order: `title`, `pubDate` (`YYYY-MM-DD #Y-M-D`), `description`, `github` and `demo` (or `demoNote`), `image` (the logo), `cover` (the banner from step 6, `/projects/illustrations/<slug>.webp`), `agentic: true`.
  - Sections: Vision, Technologies, Screens, Retrospective, Future plans.
  - Follow `writer.md`.
- **`src/content/questionnaires/<slug>.md`**: the same intro as the other questionnaire files, then:
  - "What the agent found" with your summary;
  - the questions and the author's answers exactly as typed, typos included.

## 4. Logo and screenshots

- **Logo**: `public/projects/<slug>.png` (128 x 128) or `.svg`. Used as `image.url`, and also on the banner cover. Make the logo before the banner.
- **Screenshots**: `public/projects/<slug>/` with numbered names (`1-landing.png`, `2-...`).
  - Take them with a headless browser (Playwright) at a consistent viewport.
  - If the app needs a backend, mock it, so the screenshots show the intended states with believable data.
  - `.mp4` and `.webm` files linked with Markdown image syntax render as video.

## 5. Check the text

Re-read against `writer.md`. Check every date, number and claim against the questionnaire answers.

## 6. Make the banner

Every project has a banner in the portfolio's one banner style. It is rendered by the in-repo studio and follows `.claude/skills/project-illustrations/SKILL.md`. Read that skill before starting. This is the short version.

**What the banner looks like** (final design, approved 2026-10-31):
- One 3D object that says the project, at the centre, on the near-black studio ground. Examples: a padlock with its shackle swung open, a controller with one lit button, a voxel flamingo.
- Exactly one shining part: a glowing part in the accent colour, or polished metal that strongly reflects the light.
- The object's body is satin charcoal or light grey. A white object needs dark parts (a panel, a lip, a base) so its shape reads.
- One to three soft light beams of the accent colour come in from the edges and point at the middle. The engine adds them, different for every project and seeded by the slug.
- No background word, and no floating extra props.
- On the cover only: the logo, the project name and one short line on the left, with the object on the right.

**Steps:**
1. **Choose the object.** Silhouette first: it must be recognisable as a black shape at 300 x 160. Prefer the logo's own object. Never a screenshot, form, dashboard or grid.
2. **Choose the shining part.** One glowing part (`mat.glow`) or polished metal (roughness 0.22 or less).
3. **Choose the accent** from the twelve `ACCENTS`. Use the project's brand colour where it has one. A new project goes to the top of the list, so its accent must differ from the newest projects next to it.
4. **Write the scene** in `tools/illustrations/scenes/<slug>.js`, starting from the closest existing scene. It needs:
   - `slug`;
   - `title`, exactly as the site shows it;
   - `tagline`: at most about nine words, saying what it is, following `writer.md`;
   - `logo`, if the logo is not `/public/projects/<slug>.png`;
   - `accent`;
   - `build()`.

   Add it to `scenes/index.js` in site order.
5. **Render for review:**

   ```sh
   node tools/illustrations/export.mjs --only <slug> --out <scratch dir>
   node tools/illustrations/review.mjs <scratch dir> --only <slug>
   ```

   Look at `review.png` and check:
   - the object reads on the 300 x 160 card;
   - the object sits in the middle of the strip, and looks centred: details on its base are concentric with it, and its key face turns towards the camera;
   - one part shines (the export reports `no shining part` otherwise);
   - nothing is washed out.

   At most three rounds. For a second opinion, ask a fresh agent to art-direct `review.png` without telling it the intent.
6. **Export into the site** with `node tools/illustrations/export.mjs --only <slug>`. This writes `<slug>.webp`, `<slug>-og.jpg`, `<slug>-card.webp` and `<slug>-strip.webp` to `public/projects/illustrations/`.
7. **Set the frontmatter**, with alt text that says plainly what the object is:

   ```yaml
   cover: { url: "/projects/illustrations/<slug>.webp", alt: "A dark padlock with its shackle swung open and a glowing red keyhole" }
   ```

   The project list, home carousel and Open Graph image pick their sizes from this URL automatically (`src/lib/banner.ts`).

`playwright`, `sharp` and `three` are devDependencies, so `npm install` is enough. On macOS the render uses the GPU. If you change `engine.js`, re-export every project so the set stays consistent.

## 7. Check the site

1. Run `npm run build` (it runs `astro check`).
2. Open the dev server and look at the project in all three places:
   - the list on `/projects`, by year;
   - the home carousel;
   - the project page.
3. Check that the banner, logo, screenshots and videos load, and that the page reads well on a phone. The list card is 592 x 210, the carousel card 300 x 160, and the project page shows the titled cover.

## 8. Publish

Show the author the diff and the rendered pages. Commit and push to `main` only after they say so, because Vercel deploys `main` to matejbaco.eu straight away.
