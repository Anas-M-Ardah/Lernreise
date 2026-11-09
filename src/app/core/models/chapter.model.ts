import { ExerciseSet } from './exercise.model';
import { GrammarTopic } from './grammar.model';
import { RevisionPlan } from './path.model';
import { VocabCategory } from './vocabulary.model';

export interface Chapter {
  readonly id: string;
  readonly number: number;
  readonly title: string;
  readonly subtitle: string;
  readonly goals: readonly string[];
  readonly grammar: readonly GrammarTopic[];
  readonly exercises: readonly ExerciseSet[];
  readonly vocabulary: readonly VocabCategory[];
  /** Course level and book, e.g. `B1.3` · `Aspekte neu B1+`. Defaults to B1.2 · Netzwerk neu. */
  readonly course?: string;
  readonly book?: string;
  /** Duolingo-style revision path (Lernpfad), built from the chapter's exercise sets. */
  readonly plan?: RevisionPlan;
}

/** A chapter that is announced on the roadmap but has no content yet. */
export interface UpcomingChapter {
  readonly number: number;
  readonly title: string;
}
