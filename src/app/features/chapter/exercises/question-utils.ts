import { GAP, Question } from '../../../core/models';

export interface SentenceParts {
  readonly before: string;
  readonly after: string;
}

export function splitAtGap(sentence: string): SentenceParts {
  const [before = '', after = ''] = sentence.split(GAP);
  return { before, after };
}

/** The complete, correct sentence — shown as feedback after a wrong answer. */
export function solutionOf(question: Question): string {
  switch (question.kind) {
    case 'choice':
      return question.sentence.replace(GAP, question.answer);
    case 'gap':
      return question.sentence.replace(GAP, question.answers[0]);
    case 'order':
      return question.words.join(' ');
  }
}
