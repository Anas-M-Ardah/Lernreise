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

export type Question = ChoiceQuestion | GapQuestion | OrderQuestion;

export interface ExerciseSet {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly topicId: string;
  readonly questions: readonly Question[];
}
