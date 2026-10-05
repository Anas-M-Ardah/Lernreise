import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { CHAPTERS } from './validate-content.mjs';

const manifest = JSON.parse(readFileSync(new URL('../public/audio/de/manifest.json', import.meta.url), 'utf8'));
for (const chapter of CHAPTERS) {
  for (const category of chapter.vocabulary) {
    for (const entry of category.entries) {
      const text = [entry.article, entry.term.replace(/\|/g, '')].filter(Boolean).join(' ').trim();
      assert(manifest[text], `Missing pronunciation: ${text}`);
    }
  }
}
let bytes = 0;
for (const [text, path] of Object.entries(manifest)) {
  assert(/^audio\/de\/[a-f0-9]{16}\.mp3$/.test(path), `Invalid recording path: ${path}`);
  const file = new URL(`../public/${path}`, import.meta.url);
  assert(statSync(file).size > 1000, `Empty recording: ${text}`);
  const data = readFileSync(file);
  assert((data[0] === 0xff && (data[1] & 0xe0) === 0xe0) || data.subarray(0, 3).toString() === 'ID3', `Invalid MP3: ${text}`);
  bytes += data.length;
}
console.log(`Audio checks passed: ${Object.keys(manifest).length} German recordings, ${(bytes / 1024 / 1024).toFixed(2)} MB; every vocabulary card covered.`);
