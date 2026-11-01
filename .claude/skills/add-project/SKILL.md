# Add a project

A project on matejbaco.eu consists of these parts:
- a case study, `src/content/projects/<slug>.md`;
- the questionnaire it was written from, `src/content/questionnaires/<slug>.md`;
- a logo;
- screenshots and at least one recording;
- a banner illustration in three sizes.

Do the steps in order. Committing to `main` is fine once the checks in step 7 pass; `main` deploys to the live site through Vercel.

Related skills:
- `.claude/skills/writer.md`: every rule for the text. No em dashes, no contractions, no possessive 's, link technologies, spell out abbreviations.
- `.claude/skills/project-illustrations/SKILL.md`: how to make the banner (step 6).

Files next to this skill:
- `questionnaire/index.html`: the one standard form. Never build another.
- `questionnaire/open.mjs`: checks a `questions.json`, writes the form into a scratch folder and opens it in the browser. Nothing is served.
- `questionnaire/example.json`: a finished `questions.json` to copy the shape from.

## 1. Research the project

Read the code, the commit history and the live app before asking anything:
- the stack;
- what the app does, flow by flow;
- the timeline from the commits (dates, counts, what each day produced, who is co-author);
- who it is for;
- anything that looks broken or unclear.

Clone into its own scratch folder under `/tmp`, run the app locally when you can, and play it with a headless browser: the happy path, the failure path, the edge cases. If the portfolio's `node_modules` is missing, `npm install` here first; it brings Playwright, sharp and three.

Verify every claim you will make. Dates and counts come from `git log`, behaviour from the play-test, the live state from the browser, repository facts from `gh`. The author is never asked to confirm what you can check. If a fact really cannot be checked, state it in the summary as what you believe, and the correction field at the top of the form catches it.

Write a short summary of what you found, three to five paragraphs, because it opens the questionnaire and later the questionnaire file.

## 2. Ask the questionnaire

The questionnaire catches what only the author knows: the itch behind the project, the decisions and their reasons, what was hard, what surprised them, what they learned, who uses it, what comes next. It never collects facts.

Rules:
- Only two kinds of question: a text answer, or a multi-select with a note. No yes/no, no single choice, no fact to confirm.
- Under every question, list what you found that could spark the answer: the date, the number, the name, the odd commit. The author answers from memory, so give memory something to hold on to. Put it in `context`.
- At most ten questions, six to eight is usual. Cut every question the research can answer. The author's time is the scarce part.
- Never ask about screenshots, the logo, the banner, framing or the live status. Those are your calls, made from the research and the answers.

The standard spine, each with the context of this project under it:
1. What was the itch? Where did the idea come from, and why this shape?
2. What did you decide yourself, and what did you leave to the agent? (agentic projects: the brief, the tools and skills, the taste)
3. What was hardest to get right? (multi-select built from the history, plus a note)
4. What surprised you, in the product or in the tooling?
5. What did you learn, and what would you do differently?
6. Who uses it, and what did they say?
7. What is next, and what does it cost to keep running?

Add at most three questions specific to this project, about decisions you saw but cannot explain: a rename, a dropped feature, a number that changed three times, a workflow you noticed in the repo.

Write `questions.json` in the scratch folder:

```json
{
  "slug": "<slug>",
  "title": "<title as the site shows it>",
  "summary": ["<paragraph>", "<paragraph>"],
  "questions": [
    { "id": "itch", "section": "Origin", "type": "text", "q": "…", "context": ["…", "…"], "hint": "…" },
    { "id": "hard", "section": "Building it", "type": "multi", "q": "…", "options": ["…", "…"], "context": ["…"], "hint": "…" }
  ]
}
```

Then:

```sh
node .claude/skills/add-project/questionnaire/open.mjs <scratch>/questions.json
```

It refuses a bad file (missing fields, a third question type, more than ten questions) and otherwise opens the form. Answers autosave in the browser. "Copy answers" and "Download .md" both give the finished questionnaire file: frontmatter, the summary, the corrections and every answer exactly as typed. The author pastes it into the chat or hands you the file.

## 3. Write the files

- **`src/content/questionnaires/<slug>.md`**: the Markdown the form produced, saved as is. Do not touch the answers. Only the parts you wrote (the summary) follow `writer.md`.
- **`src/content/projects/<slug>.md`**: mirror the newest agentic case study.
  - Frontmatter, in this order: `title`, `pubDate` (`YYYY-MM-DD #Y-M-D`, the last commit of the project), `description`, `github` and `demo` (or `demoNote`), `image` (the logo), `cover` (the banner from step 6, `/projects/illustrations/<slug>.webp`), `agentic: true`.
  - Sections: Vision, Technologies, Screens, Retrospective, Future plans.
  - Every claim comes from the research or the answers. The corrections override the summary.
  - Follow `writer.md`.

## 4. Logo, screenshots and the recording

- **Logo**: `public/projects/<slug>.png` (128 x 128) or `.svg`. Used as `image.url`, and also on the banner cover. Prefer the mark the app itself uses. When the logo is text in a brand font, render it with Playwright at 256 and downscale with sharp; inline the font as base64, a `file://` `@font-face` does not load from `setContent`. Make the logo before the banner.
- **Screenshots**: `public/projects/<slug>/` with numbered names (`1-landing.png`, `2-...`). Your choice, never a question for the author.
  - Cover every major screen and the states that carry the idea: the first visit, the core action half-way, a failure, a success, the result and sharing, the stats, settings or admin where they exist, one phone view.
  - Pick the most telling data: the funniest board, the record, real numbers. Play the live app as a guest when that is harmless; otherwise use a local copy with mocked, believable data. Avoid screens that are mostly empty space.
  - Playwright at 1440 x 900 with device scale factor 2 for desktop and 390 x 844 for phone, `locale` and `timezoneId` of the app. Capture animations a few hundred milliseconds in. Compress with sharp (`png({ palette: true, quality: 92 })`).
  - Twelve to twenty screens is usual. Drop a screen that says nothing on its own.
- **Recording**: always at least one, of the core interaction, as `.webm` under 15 seconds. Record a dedicated Playwright context with `recordVideo` at 1440 x 900, type with a delay so the viewer can follow, then trim the page load off with the ffmpeg bundled with Playwright (`~/Library/Caches/ms-playwright/ffmpeg-*/ffmpeg-mac`): `-ss <start> -t <length> -c:v libvpx-vp9 -b:v 0 -crf 24 -an`. It has no VP8 encoder. `.mp4` and `.webm` linked with Markdown image syntax render as a video player.

## 5. Check the text

Re-read against `writer.md`. Check every date, number and claim against the research and the questionnaire answers.

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
1. **Choose the object.** Silhouette first: it must be recognisable as a black shape at 300 x 160. Prefer the logo's own object. Never a screenshot, form, dashboard or grid. Wide objects (ratio above 2:1) come out small on the card, because the engine caps their width; prefer something closer to 3:2.
2. **Choose the shining part.** One glowing part (`mat.glow`) or polished metal (roughness 0.22 or less). A large glowing plate washes to white at the usual intensity; keep it around 0.5 and set `bloom: 0.16` on the scene.
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

1. Run `npm run build` (it runs `astro check`). The only expected warnings come from the bundled video player.
2. Start `npx astro dev --port 4321` and look at the project in all three places with Playwright:
   - the list on `/projects`, by year;
   - the home carousel;
   - the project page, desktop and phone.
3. Check that the banner, logo, screenshots and the recording load, that no request for `/projects/<slug>` fails, and that the page reads well on a phone. The list card is 592 x 210, the carousel card 300 x 160, and the project page shows the titled cover.

## 8. Publish

Commit everything as one commit and push to `main`; the author has said this is fine, and Vercel deploys it to matejbaco.eu straight away. Then tell the author what went live and where to look, and stop every dev server you started.
