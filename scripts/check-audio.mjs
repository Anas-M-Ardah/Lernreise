import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { CHAPTERS } from './validate-content.mjs';

const manifest = JSON.parse(readFileSync(new URL('../public/audio/de/manifest.json', import.meta.url), 'utf8'));
// Cards without a recording fall back to the browser's German voice, so they are reported, not fatal.
const missing = CHAPTERS.flatMap(chapter => chapter.vocabulary.flatMap(category => category.entries))
  .map(entry => [entry.article, entry.term.replace(/\|/g, '')].filter(Boolean).join(' ').trim())
  .filter(text => !manifest[text]);
let bytes = 0;
for (const [text, path] of Object.entries(manifest)) {
  assert(/^audio\/de\/[a-f0-9]{16}\.mp3$/.test(path), `Invalid recording path: ${path}`);
  const file = new URL(`../public/${path}`, import.meta.url);
  assert(statSync(file).size > 1000, `Empty recording: ${text}`);
  const data = readFileSync(file);
  assert((data[0] === 0xff && (data[1] & 0xe0) === 0xe0) || data.subarray(0, 3).toString() === 'ID3', `Invalid MP3: ${text}`);
  bytes += data.length;
}
const coverage = missing.length
  ? `${missing.length} vocabulary cards use the browser voice until recordings are generated`
  : 'every vocabulary card covered';
if (missing.length) console.warn(`Missing pronunciations (${missing.length}): ${missing.join(', ')}`);
console.log(`Audio checks passed: ${Object.keys(manifest).length} German recordings, ${(bytes / 1024 / 1024).toFixed(2)} MB; ${coverage}.`);
