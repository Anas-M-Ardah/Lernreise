import { Chapter, LessonKind, PathLesson, Question } from '../../core/models';
import { shuffle } from '../../core/utils/text';
import { IconName } from '../../shared/ui/icon/icons';

/** A question in a lesson, with its stable key for the mistakes pool. */
export interface LessonItem {
  readonly key: string;
  readonly question: Question;
}

export const MISTAKES_LESSON_ID = 'fehler';
export const REVIEW_SIZE = 15;
export const HEARTS = 5;

export const LESSON_META: Record<LessonKind, { icon: IconName; label: string }> = {
  vocab: { icon: 'layers', label: 'Wortschatz' },
  reading: { icon: 'book-open', label: 'Lesen' },
  grammar: { icon: 'pencil', label: 'Grammatik' },
  speaking: { icon: 'message', label: 'Sprechen & Schreiben' },
  review: { icon: 'trophy', label: 'Wiederholung' },
};

export function itemsOfSets(chapter: Chapter, setIds: readonly string[]): LessonItem[] {
  return setIds.flatMap((setId) => {
    const set = chapter.exercises.find((s) => s.id === setId);
    return set ? set.questions.map((question, index) => ({ key: `${setId}#${index}`, question })) : [];
  });
}

/** Review lessons draw a fresh random sample each time; others keep the authored order. */
export function lessonItems(chapter: Chapter, lesson: PathLesson): LessonItem[] {
  const items = itemsOfSets(chapter, lesson.setIds);
  return lesson.kind === 'review' ? shuffle(items).slice(0, REVIEW_SIZE) : items;
}

export function mistakeItems(chapter: Chapter, keys: readonly string[]): LessonItem[] {
  const all = new Map(itemsOfSets(chapter, chapter.exercises.map((s) => s.id)).map((item) => [item.key, item]));
  return shuffle(keys.map((key) => all.get(key)).filter((item): item is LessonItem => !!item)).slice(0, REVIEW_SIZE);
}

export function allLessons(chapter: Chapter): PathLesson[] {
  return chapter.plan?.units.flatMap((unit) => unit.lessons) ?? [];
}

export function xpFor(kind: LessonKind | 'mistakes', perfect: boolean): number {
  return (kind === 'review' ? 20 : 10) + (perfect ? 5 : 0);
}
