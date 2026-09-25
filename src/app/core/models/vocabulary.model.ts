export type Article = 'der' | 'die' | 'das';

export interface VocabEntry {
  readonly term: string;
  readonly article?: Article;
  /** Plural ending as printed in the book, e.g. `-n`, `¨-e`, `Sg.` */
  readonly plural?: string;
  /** Irregular verb or comparison forms, e.g. `versteht, verstand, hat verstanden` */
  readonly forms?: string;
  /** Preposition / case pattern, e.g. `mit + D` */
  readonly pattern?: string;
  readonly example?: string;
  readonly english: string;
  readonly arabic: string;
}

export interface VocabCategory {
  readonly id: string;
  readonly title: string;
  readonly entries: readonly VocabEntry[];
}

/** A vocabulary entry enriched with a stable id and its category. */
export interface VocabCard extends VocabEntry {
  readonly id: string;
  readonly categoryId: string;
}
