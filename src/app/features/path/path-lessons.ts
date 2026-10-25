import { CHAPTERS } from '../../data/chapters';
import { Chapter, ChoiceQuestion, GrammarBlock, GrammarTopic, Question, VocabCard } from '../../core/models';
import { ChapterService } from '../../core/services/chapter.service';
import { shuffle } from '../../core/utils/text';
import { choice, gap } from '../../data/practice-questions';
import { IconName } from '../../shared/ui/icon/icons';

/** How many of the most recent chapters the exam path covers. */
const PATH_CHAPTER_COUNT = 3;
const VOCAB_CHUNK = 10;
const CHECKPOINT_SIZE = 15;
const FINAL_SIZE = 24;
const MISTAKE_LESSON_SIZE = 15;

/**
 * A question in a lesson. `key` identifies its source (so mistakes can be stored
 * and rebuilt later); vocabulary questions are generated fresh each time.
 */
export interface LessonItem {
  readonly key: string;
  readonly question: Question;
}

export type LessonKind = 'grammar' | 'vocab' | 'checkpoint' | 'final' | 'mistakes';

export interface PathLesson {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly kind: LessonKind;
  readonly icon: IconName;
  /** Chapter + grammar page to review after the lesson, if any. */
  readonly chapterId?: string;
  /** Busuu-style teaching step shown before the questions: a grammar rule… */
  readonly topic?: GrammarTopic;
  /** …or the new words of a vocabulary lesson. */
  readonly words?: readonly VocabCard[];
  readonly build: () => LessonItem[];
}

export interface PathUnit {
  readonly id: string;
  readonly number?: number;
  readonly title: string;
  readonly subtitle: string;
  readonly lessons: readonly PathLesson[];
}

const chapterService = new ChapterService();

export const PATH_CHAPTERS: readonly Chapter[] = CHAPTERS.slice(-PATH_CHAPTER_COUNT);

/** Choice options are authored with the answer first — shuffle them so position gives nothing away. */
function prepare(question: Question): Question {
  return question.kind === 'choice' ? { ...question, options: shuffle(question.options) } : question;
}

function setItems(chapter: Chapter): LessonItem[] {
  return chapter.exercises.flatMap((set) =>
    set.questions.map((question, i) => ({ key: `set:${chapter.id}:${set.id}:${i}`, question })),
  );
}

// ── Vocabulary drills ───────────────────────────────────────────────────────

type VocabMode = 'meaning' | 'reverse' | 'article' | 'write';

const plain = (term: string) => term.replace(/\|/g, '');
const german = (card: VocabCard) => [card.article, plain(card.term)].filter(Boolean).join(' ');

function pickDistractors(card: VocabCard, pool: readonly VocabCard[], label: (c: VocabCard) => string): string[] {
  const own = label(card);
  const others = [...new Set(shuffle(pool).map(label))].filter((value) => value !== own);
  return shuffle([own, ...others.slice(0, 3)]);
}

function vocabQuestion(card: VocabCard, mode: VocabMode, pool: readonly VocabCard[]): ChoiceQuestion | Question {
  const note = `${german(card)} – ${card.english} · ${card.arabic}`;
  switch (mode) {
    case 'meaning':
      return choice(`„${german(card)}“ bedeutet: ___`, pickDistractors(card, pool, (c) => c.english), card.english, note);
    case 'reverse':
      return choice(`„${card.english}“ heißt auf Deutsch: ___`, pickDistractors(card, pool, german), german(card), note);
    case 'article':
      return choice(`___ ${plain(card.term)}`, ['der', 'die', 'das'], card.article!, note);
    case 'write': {
      const term = plain(card.term);
      const answers = card.article ? [term, `${card.article} ${term}`] : [term];
      const hint = `${card.english} · ${card.article ? card.article + ' ' : ''}${term[0]}…`;
      return gap('Auf Deutsch: ___', hint, answers, note);
    }
  }
}

function modesFor(card: VocabCard, index: number): VocabMode[] {
  // Every card is shown twice: once to recognise it, once to recall it.
  const recall: VocabMode = card.article && index % 2 === 0 ? 'article' : index % 3 === 0 ? 'write' : 'reverse';
  return ['meaning', recall];
}

function vocabItems(cards: readonly VocabCard[], pool: readonly VocabCard[]): LessonItem[] {
  const items = cards.flatMap((card, i) =>
    modesFor(card, i).map((mode) => ({ key: `vocab:${card.id}:${mode}`, question: vocabQuestion(card, mode, pool) })),
  );
  // Recognition questions first, recall afterwards, each half shuffled.
  const half = items.filter((_, i) => i % 2 === 0);
  const rest = items.filter((_, i) => i % 2 === 1);
  return [...shuffle(half), ...shuffle(rest)];
}

// ── Units ───────────────────────────────────────────────────────────────────

function chapterUnit(chapter: Chapter): PathUnit {
  const cards = chapterService.cardsOf(chapter);
  const grammarLessons: PathLesson[] = chapter.exercises.map((set) => ({
    id: `${chapter.id}.${set.id}`,
    title: set.title,
    description: set.description,
    kind: 'grammar',
    icon: 'book-open',
    chapterId: chapter.id,
    topic: chapter.grammar.find((topic) => topic.id === set.topicId),
    build: () => set.questions.map((question, i) => ({ key: `set:${chapter.id}:${set.id}:${i}`, question: prepare(question) })),
  }));

  const vocabLessons: PathLesson[] = [];
  for (let start = 0; start < cards.length; start += VOCAB_CHUNK) {
    const chunk = cards.slice(start, start + VOCAB_CHUNK);
    const part = start / VOCAB_CHUNK + 1;
    vocabLessons.push({
      id: `${chapter.id}.wortschatz-${part}`,
      title: `Wortschatz ${part}`,
      description: `${chunk[0].term} … ${chunk[chunk.length - 1].term}`,
      kind: 'vocab',
      icon: 'layers',
      chapterId: chapter.id,
      words: chunk,
      build: () => vocabItems(chunk, cards),
    });
  }

  // Alternate grammar and vocabulary so the path doesn't feel like one long drill.
  const lessons: PathLesson[] = [];
  for (let i = 0; i < Math.max(grammarLessons.length, vocabLessons.length); i++) {
    if (grammarLessons[i]) lessons.push(grammarLessons[i]);
    if (vocabLessons[i]) lessons.push(vocabLessons[i]);
  }

  lessons.push({
    id: `${chapter.id}.checkpoint`,
    title: `Checkpoint Kapitel ${chapter.number}`,
    description: 'Gemischte Fragen aus dem ganzen Kapitel.',
    kind: 'checkpoint',
    icon: 'trophy',
    chapterId: chapter.id,
    build: () => {
      const grammar = shuffle(setItems(chapter)).slice(0, CHECKPOINT_SIZE - 4);
      const vocab = vocabItems(shuffle(cards).slice(0, 2), cards);
      return shuffle([...grammar, ...vocab]).map((item) => ({ ...item, question: prepare(item.question) }));
    },
  });

  return { id: chapter.id, number: chapter.number, title: chapter.title, subtitle: chapter.subtitle, lessons };
}

const finalUnit: PathUnit = {
  id: 'generalprobe',
  title: 'Generalprobe',
  subtitle: `Alles aus Kapitel ${PATH_CHAPTERS.map((c) => c.number).join(', ')} – wie in der Prüfung.`,
  lessons: [
    {
      id: 'generalprobe.final',
      title: 'Generalprobe',
      description: `${FINAL_SIZE} gemischte Fragen aus allen drei Kapiteln.`,
      kind: 'final',
      icon: 'target',
      build: () => {
        const perChapter = Math.ceil(FINAL_SIZE / PATH_CHAPTERS.length);
        return shuffle(
          PATH_CHAPTERS.flatMap((chapter) => {
            const cards = chapterService.cardsOf(chapter);
            return [...shuffle(setItems(chapter)).slice(0, perChapter - 2), ...vocabItems(shuffle(cards).slice(0, 1), cards)];
          }),
        )
          .slice(0, FINAL_SIZE)
          .map((item) => ({ ...item, question: prepare(item.question) }));
      },
    },
  ],
};

export const PATH_UNITS: readonly PathUnit[] = [...PATH_CHAPTERS.map(chapterUnit), finalUnit];

export const PATH_LESSONS: readonly PathLesson[] = PATH_UNITS.flatMap((unit) => unit.lessons);

// ── Teaching cards ──────────────────────────────────────────────────────────

/**
 * Splits a grammar topic into bite-sized cards, one idea per card. A plain text
 * block introduces whatever follows, so it stays on the same card.
 */
export function teachingCards(topic: GrammarTopic): GrammarBlock[][] {
  const cards: GrammarBlock[][] = [];
  let pending: GrammarBlock[] = [];
  for (const block of topic.blocks) {
    pending.push(block);
    if (block.kind !== 'text') {
      cards.push(pending);
      pending = [];
    }
  }
  if (pending.length) cards.push(pending);
  return cards;
}

// ── Mistakes ────────────────────────────────────────────────────────────────

/** Rebuilds a question from its stored key; undefined if the content has changed since. */
export function itemFromKey(key: string): LessonItem | undefined {
  const [type, ...rest] = key.split(':');
  if (type === 'set') {
    const [chapterId, setId, index] = rest;
    const question = CHAPTERS.find((c) => c.id === chapterId)?.exercises.find((s) => s.id === setId)?.questions[+index];
    return question && { key, question: prepare(question) };
  }
  if (type === 'vocab') {
    const mode = rest.pop() as VocabMode;
    const cardId = rest.join(':');
    const chapter = CHAPTERS.find((c) => cardId.startsWith(`${c.id}:`));
    const cards = chapter ? chapterService.cardsOf(chapter) : [];
    const card = cards.find((c) => c.id === cardId);
    return card && { key, question: vocabQuestion(card, mode, cards) };
  }
  return undefined;
}

export function mistakesLesson(keys: readonly string[]): PathLesson {
  return {
    id: 'fehler',
    title: 'Fehler wiederholen',
    description: 'Die Fragen, die dir zuletzt schwergefallen sind.',
    kind: 'mistakes',
    icon: 'rotate-ccw',
    build: () =>
      shuffle(keys)
        .map(itemFromKey)
        .filter((item): item is LessonItem => !!item)
        .slice(0, MISTAKE_LESSON_SIZE),
  };
}
