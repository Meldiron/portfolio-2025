# Writer Skill

Use this skill when writing or editing `*.md` files in `src/content/`.

## Rules

### 1. Follow the structure of nearby markdown files

Before writing, read at least 2-3 existing markdown files in the same collection (`posts/`, `projects/`, or `pages/`) to match:

- **Frontmatter fields and format** — use the exact same YAML keys, date format (`YYYY-MM-DD #Y-M-D`), and field order
- **Section headings** — use the same `##` sections in the same order. For projects, the typical structure is: Vision, Technologies, Screens, Retrospective, Future plans
- **Content depth and length** — match how detailed or concise the neighboring files are in each section

### 2. Link technologies, libraries, tools, and websites

When mentioning a well-known technology, library, tool, or website, always link to it using markdown links. Examples:

- `[Next.js](https://nextjs.org/)` not just "Next.js"
- `[Appwrite](https://appwrite.io/)` not just "Appwrite"
- `[Tailwind CSS](https://tailwindcss.com/)` not just "Tailwind"
- `[sharp](https://sharp.pixelplumbing.com/)` not just "sharp"

Link to the official homepage or GitHub repository. Only link the first mention of each technology within a section.

### 3. Match the tone of nearby markdown files

Read existing files to capture the writing style. In this portfolio:

- Tone is casual and direct — short sentences, personal voice
- Uses first person naturally
- Avoids corporate/marketing speak
- Keeps paragraphs short and scannable
- Does not over-explain — trusts the reader to understand context

### 4. Rewrite placeholder notes into proper text

When editing an existing file, if you encounter rough notes or placeholder phrasing like "Something about ...", "something about ...", or similar shorthand — rewrite those into complete, polished paragraphs. These are draft ideas left by the author that need to be turned into real content. Use the surrounding context and the topic described to write proper text that fits the tone and structure of the rest of the file.

### 5. Spell out abbreviations

Do not use shorthand or abbreviations. Write the full term instead. For example:

- "two-factor authentication" not "2FA"
- "server-side rendering" not "SSR"
- "single sign-on" not "SSO"
- "application programming interface" not "API"

Only universally understood abbreviations are allowed, such as URL, HTTP, HTTPS, HTML, CSS, TOTP, and similar web fundamentals that everyone recognizes.

### 6. Respect paragraph boundaries

When the draft already has paragraphs defined, treat each one as a fixed boundary. Only write about the topic that paragraph covers. Do not merge paragraphs together, do not split one into multiple, and do not remove any. Before writing, define a plan that maps each draft paragraph to its topic, and follow that plan strictly.

### 7. No em dashes

Never use em dashes (`—`) or en dashes (`–`). These are typical markers of artificial intelligence writing. Use commas, periods, or restructure the sentence instead.

### 8. No contractions

Always write words in their full form. For example:

- "I am" not "I'm"
- "it is" not "it's"
- "do not" not "don't"
- "they are" not "they're"
- "cannot" not "can't"
- "would not" not "wouldn't"

### 9. Double-check grammar

After finishing any changes to a markdown file, always re-read the full file and verify grammar, spelling, and punctuation before considering the task done.
