/**
 * A Duolingo-style revision path: units (one per study day / topic) made of
 * short lessons. Lessons reference the chapter's exercise sets by id, so the
 * same questions also appear in the "Übungen" tab.
 */
export type LessonKind = 'vocab' | 'reading' | 'grammar' | 'speaking' | 'review';

export interface PathLesson {
  readonly id: string;
  readonly title: string;
  readonly kind: LessonKind;
  readonly setIds: readonly string[];
}

export interface PathUnit {
  readonly id: string;
  readonly title: string;
  /** When to do it, e.g. `Mo 09.11. · heute im Kurs`. */
  readonly day: string;
  /** Book reference, e.g. `LB S. 8–9 · AB S. 88 Üb. 1`. */
  readonly source: string;
  readonly description: string;
  readonly lessons: readonly PathLesson[];
  /** Tasks outside the app (homework, platform texts …) shown as a checklist. */
  readonly tasks?: readonly PathTask[];
}

export interface PathTask {
  readonly id: string;
  readonly text: string;
  readonly optional?: boolean;
}

export interface RevisionPlan {
  readonly title: string;
  readonly intro: string;
  readonly dailyGoal: number;
  readonly units: readonly PathUnit[];
}
