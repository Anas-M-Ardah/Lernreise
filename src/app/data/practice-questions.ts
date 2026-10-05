import { ChoiceQuestion, GapQuestion, OrderQuestion } from '../core/models';

/** Small constructors keep authored practice content readable and fully typed. */
export function choice(sentence: string, options: readonly string[], answer: string, explanation: string): ChoiceQuestion {
  return { kind: 'choice', sentence, options, answer, explanation };
}

export function gap(sentence: string, hint: string, answers: readonly string[], explanation: string): GapQuestion {
  return { kind: 'gap', sentence, hint, answers, explanation };
}

export function order(prompt: string, words: readonly string[], explanation: string): OrderQuestion {
  return { kind: 'order', prompt, words, explanation };
}
