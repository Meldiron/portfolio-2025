// Opens the standard questionnaire form for one project, browser only, nothing served.
// usage: node .claude/skills/add-project/questionnaire/open.mjs <questions.json> [--out <dir>] [--no-open]
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const src = args.find((a) => !a.startsWith('--'));
const out = args.includes('--out') ? args[args.indexOf('--out') + 1] : null;
if (!src) { console.error('usage: open.mjs <questions.json> [--out <dir>] [--no-open]'); process.exit(1); }

const q = JSON.parse(fs.readFileSync(src, 'utf8'));
const problems = [];
if (!/^[a-z0-9-]+$/.test(q.slug ?? '')) problems.push('slug must be lowercase letters, digits and dashes');
if (!q.title) problems.push('title is missing');
if (!Array.isArray(q.summary) || !q.summary.length) problems.push('summary must be a list of paragraphs');
if (!Array.isArray(q.questions) || !q.questions.length) problems.push('questions must be a non-empty list');
const ids = new Set();
for (const [i, it] of (q.questions ?? []).entries()) {
  const at = `question ${i + 1}`;
  if (!it.id || ids.has(it.id)) problems.push(`${at}: id missing or repeated`); ids.add(it.id);
  if (!it.q) problems.push(`${at}: q is missing`);
  if (!['text', 'multi'].includes(it.type)) problems.push(`${at}: type must be "text" or "multi" (no yes/no, no single choice)`);
  if (it.type === 'multi' && (!Array.isArray(it.options) || it.options.length < 2)) problems.push(`${at}: multi needs at least two options`);
  if (!Array.isArray(it.context ?? []) ) problems.push(`${at}: context must be a list of strings`);
}
if ((q.questions ?? []).length > 10) problems.push(`${q.questions.length} questions: the cap is ten, cut the ones the research can answer`);
if (problems.length) { console.error('questions.json has problems:\n- ' + problems.join('\n- ')); process.exit(1); }

const dir = out ?? path.join(os.tmpdir(), 'portfolio-questionnaire', q.slug);
fs.mkdirSync(dir, { recursive: true });
fs.copyFileSync(path.join(here, 'index.html'), path.join(dir, 'index.html'));
fs.writeFileSync(path.join(dir, 'questions.js'), `window.QUESTIONNAIRE = ${JSON.stringify(q, null, 2)};\n`);
const page = path.join(dir, 'index.html');
console.log(`${q.questions.length} questions · ${page}`);
if (!args.includes('--no-open')) execFileSync('open', [page]);
