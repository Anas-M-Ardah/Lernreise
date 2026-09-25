import { ExerciseSet } from './exercise.model';
import { GrammarTopic } from './grammar.model';
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
}

/** A chapter that is announced on the roadmap but has no content yet. */
export interface UpcomingChapter {
  readonly number: number;
  readonly title: string;
}
