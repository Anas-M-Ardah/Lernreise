import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const modules = new Map();

// Load pure TypeScript content without bootstrapping Angular or writing build files.
function load(path) {
  const filename = resolve(root, path);
  if (modules.has(filename)) return modules.get(filename).exports;
  const source = readFileSync(filename, 'utf8');
  const module = { exports: {} };
  modules.set(filename, module);
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: filename,
  }).outputText;
  const requireLocal = (specifier) => {
    assert(specifier.startsWith('.'), `Content must use local imports: ${specifier}`);
    const target = resolve(dirname(filename), specifier);
    try {
      return load(`${target}.ts`);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      return load(resolve(target, 'index.ts'));
    }
  };
  new Function('require', 'module', 'exports', code)(requireLocal, module, module.exports);
  return module.exports;
}

function unique(values, label) {
  assert.equal(new Set(values).size, values.length, `Duplicate ${label}`);
}

function nonempty(value, label) {
  assert.equal(typeof value, 'string', `${label} must be a string`);
  assert(value.trim().length > 0, `${label} must not be empty`);
}

const { CHAPTERS, UPCOMING_CHAPTERS } = load('src/app/data/chapters.ts');
const { slugify } = load('src/app/core/utils/text.ts');
unique([...CHAPTERS, ...UPCOMING_CHAPTERS].map((chapter) => chapter.number), 'chapter numbers');
unique(CHAPTERS.map((chapter) => chapter.id), 'chapter IDs');

for (const chapter of CHAPTERS) {
  unique(chapter.grammar.map((topic) => topic.id), `${chapter.id} topic IDs`);
  unique(chapter.exercises.map((set) => set.id), `${chapter.id} exercise IDs`);
  unique(chapter.vocabulary.map((category) => category.id), `${chapter.id} category IDs`);
  const topicIds = new Set(chapter.grammar.map((topic) => topic.id));
  assert(chapter.goals.length > 0, `${chapter.id} needs learning goals`);
  for (const topic of chapter.grammar) {
    assert(topic.blocks.length > 0, `${topic.id} has no blocks`);
    for (const block of topic.blocks) {
      if (block.kind === 'table') {
        assert(block.head.length > 0 && block.rows.length > 0, `${topic.id} has an empty table`);
        for (const row of block.rows) {
          assert.equal(row.length, block.head.length, `${topic.id} table row width`);
        }
      }
    }
  }
  for (const set of chapter.exercises) {
    assert(topicIds.has(set.topicId), `${set.id} refers to missing topic ${set.topicId}`);
    assert(set.questions.length > 0, `${set.id} is empty`);
    for (const [index, question] of set.questions.entries()) {
      const label = `${chapter.id}/${set.id}/${index + 1}`;
      if (chapter.number >= 8) nonempty(question.explanation, `${label} explanation`);
      if (question.kind === 'order') {
        nonempty(question.prompt, `${label} prompt`);
        assert(question.words.length >= 2, `${label} needs words to order`);
        question.words.forEach((word) => nonempty(word, `${label} word`));
      } else {
        assert.equal(question.sentence.split('___').length - 1, 1, `${label} must have one gap`);
        if (question.kind === 'choice') {
          unique(question.options, `${label} options`);
          assert(question.options.length >= 2, `${label} needs alternatives`);
          assert(question.options.includes(question.answer), `${label} answer missing from options`);
          question.options.forEach((option) => nonempty(option, `${label} option`));
        } else {
          assert.equal(question.kind, 'gap', `${label} unknown question kind`);
          assert(question.answers.length > 0, `${label} has no accepted answer`);
          nonempty(question.hint, `${label} hint`);
          question.answers.forEach((answer) => nonempty(answer, `${label} answer`));
        }
      }
    }
  }
  const entries = chapter.vocabulary.flatMap((category) => category.entries);
  unique(entries.map((entry) => slugify([entry.article, entry.term, entry.pattern].filter(Boolean).join(' '))), `${chapter.id} vocabulary card IDs`);
  for (const entry of entries) {
    for (const key of ['term', 'english', 'arabic']) nonempty(entry[key], `${chapter.id} vocabulary ${key}`);
    if (entry.article) assert(['der', 'die', 'das'].includes(entry.article), `Invalid article: ${entry.term}`);
  }
  const questions = chapter.exercises.reduce((sum, set) => sum + set.questions.length, 0);
  console.log(`Kapitel ${chapter.number}: ${chapter.grammar.length} topics, ${chapter.exercises.length} exercise sets, ${questions} questions, ${entries.length} vocabulary cards`);
}
console.log('Content checks passed.');
