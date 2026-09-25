/**
 * Grammar content is described as a list of typed blocks, so a new chapter
 * only needs data — no new components.
 *
 * Inline markup inside any text: `*word*` highlights a word (e.g. the verb).
 */

export type Tense = 'plusquamperfekt' | 'praeteritum' | 'perfekt' | 'praesens';

export type ClauseType = 'HS' | 'NS';

export interface TextBlock {
  readonly kind: 'text';
  readonly text: string;
}

export interface RuleBlock {
  readonly kind: 'rule';
  readonly title: string;
  readonly lines: readonly string[];
}

export interface TipBlock {
  readonly kind: 'tip';
  readonly text: string;
}

export interface TableBlock {
  readonly kind: 'table';
  readonly caption?: string;
  readonly head: readonly string[];
  readonly rows: readonly (readonly string[])[];
}

export interface ExamplesBlock {
  readonly kind: 'examples';
  readonly title?: string;
  readonly items: readonly string[];
}

export interface TimelineStep {
  readonly label: string;
  readonly tense: Tense;
  readonly example: string;
}

export interface TimelineBlock {
  readonly kind: 'timeline';
  readonly steps: readonly TimelineStep[];
}

export interface Clause {
  readonly type: ClauseType;
  readonly text: string;
  readonly tense?: Tense;
}

export interface ClausesBlock {
  readonly kind: 'clauses';
  readonly title?: string;
  readonly sentences: readonly (readonly Clause[])[];
}

export interface Connector {
  readonly word: string;
  readonly meaning: string;
  readonly english: string;
  readonly arabic: string;
  readonly tenses: readonly string[];
  readonly example: string;
}

export interface ConnectorsBlock {
  readonly kind: 'connectors';
  readonly items: readonly Connector[];
}

export type GrammarBlock =
  | TextBlock
  | RuleBlock
  | TipBlock
  | TableBlock
  | ExamplesBlock
  | TimelineBlock
  | ClausesBlock
  | ConnectorsBlock;

export interface GrammarTopic {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly blocks: readonly GrammarBlock[];
}
