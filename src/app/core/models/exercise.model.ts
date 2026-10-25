/** `___` in a sentence marks the gap the learner fills in. */
export const GAP = '___';

interface BaseQuestion {
  readonly explanation?: string;
}

/** Pick one option to fill the gap. */
export interface ChoiceQuestion extends BaseQuestion {
  readonly kind: 'choice';
  readonly sentence: string;
  readonly options: readonly string[];
  readonly answer: string;
}

/** Type the missing words. Every entry in `answers` is accepted. */
export interface GapQuestion extends BaseQuestion {
  readonly kind: 'gap';
  readonly sentence: string;
  readonly hint: string;
  readonly answers: readonly string[];
}

/** Put the shuffled words into the correct order. */
export interface OrderQuestion extends BaseQuestion {
  readonly kind: 'order';
  readonly prompt: string;
  readonly words: readonly string[];
}

/** One blank in a {@link TableQuestion}: `prefix` + blank + optional `suffix`. */
export interface TableCell {
  readonly prefix: string;
  readonly answers: readonly string[];
  readonly suffix?: string;
}

export interface TableRow {
  readonly label: string;
  readonly cells: readonly TableCell[];
}

/**
 * Fill in every ending of a declension paradigm at once — the drill shape for
 * anything learned as a memorized grid (adjective endings, substantivized
 * adjectives, pronoun or article tables), not just a single sentence gap.
 */
export interface TableQuestion extends BaseQuestion {
  readonly kind: 'table';
  readonly caption?: string;
  readonly columns: readonly string[];
  readonly rows: readonly TableRow[];
}

export type Question = ChoiceQuestion | GapQuestion | OrderQuestion | TableQuestion;

export interface ExerciseSet {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly topicId: string;
  readonly questions: readonly Question[];
}
