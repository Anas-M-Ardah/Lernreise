import { ChoiceQuestion, GapQuestion, OrderQuestion, TableCell, TableQuestion, TableRow } from '../core/models';

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

/** One blank in a declension table: text before the ending, accepted ending(s), optional text after. */
export function cell(prefix: string, answers: readonly string[], suffix?: string): TableCell {
  return { prefix, answers, suffix };
}

export function row(label: string, cells: readonly TableCell[]): TableRow {
  return { label, cells };
}

export function table(
  caption: string | undefined,
  columns: readonly string[],
  rows: readonly TableRow[],
  explanation: string,
): TableQuestion {
  return { kind: 'table', caption, columns, rows, explanation };
}
