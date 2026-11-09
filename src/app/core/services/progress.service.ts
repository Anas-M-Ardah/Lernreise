import { Injectable, computed, effect, signal } from '@angular/core';
import { readStorage, writeStorage } from '../utils/storage';

export type CardStatus = 'known' | 'learning';

/** Best result of a Lernpfad lesson. */
export interface LessonResult {
  readonly completions: number;
  readonly perfect: boolean;
}

interface ProgressState {
  readonly cards: Readonly<Record<string, CardStatus>>;
  /** Best score per exercise set, as a ratio between 0 and 1. */
  readonly exercises: Readonly<Record<string, number>>;
  /** Lernpfad: results per lesson id. */
  readonly lessons?: Readonly<Record<string, LessonResult>>;
  /** Lernpfad: XP earned per local day (`YYYY-MM-DD`). */
  readonly xpByDay?: Readonly<Record<string, number>>;
  /** Lernpfad: question keys (`setId#index`) answered wrongly and not yet repaired. */
  readonly mistakes?: readonly string[];
  /** Lernpfad: ticked off-app tasks (homework etc.). */
  readonly tasks?: Readonly<Record<string, boolean>>;
}

const STORAGE_KEY = 'b12-lernreise.progress.v1';
const EMPTY: ProgressState = { cards: {}, exercises: {} };

/** Local calendar day as `YYYY-MM-DD`. */
export function dayKey(date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly state = signal<ProgressState>(readStorage(STORAGE_KEY, EMPTY));

  readonly cards = computed(() => this.state().cards);
  readonly exercises = computed(() => this.state().exercises);
  readonly lessons = computed(() => this.state().lessons ?? {});
  readonly mistakes = computed(() => this.state().mistakes ?? []);
  readonly tasks = computed(() => this.state().tasks ?? {});
  readonly totalXp = computed(() => Object.values(this.state().xpByDay ?? {}).reduce((sum, xp) => sum + xp, 0));
  readonly todayXp = computed(() => (this.state().xpByDay ?? {})[dayKey()] ?? 0);

  /** Consecutive learning days ending today (or yesterday, if today is still open). */
  readonly streak = computed(() => {
    const days = this.state().xpByDay ?? {};
    const cursor = new Date();
    if (!days[dayKey(cursor)]) cursor.setDate(cursor.getDate() - 1);
    let streak = 0;
    while (days[dayKey(cursor)]) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  });

  /** The last seven days, oldest first, for the week strip. */
  readonly week = computed(() => {
    const days = this.state().xpByDay ?? {};
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        key: dayKey(date),
        label: date.toLocaleDateString('de-DE', { weekday: 'short' }).slice(0, 2),
        xp: days[dayKey(date)] ?? 0,
      };
    });
  });

  constructor() {
    effect(() => writeStorage(STORAGE_KEY, this.state()));
  }

  setCardStatus(cardId: string, status: CardStatus): void {
    this.state.update((state) => ({ ...state, cards: { ...state.cards, [cardId]: status } }));
  }

  resetCards(cardIds: readonly string[]): void {
    this.state.update((state) => {
      const cards = { ...state.cards };
      cardIds.forEach((id) => delete cards[id]);
      return { ...state, cards };
    });
  }

  recordScore(setId: string, ratio: number): void {
    this.state.update((state) => {
      const best = Math.max(state.exercises[setId] ?? 0, ratio);
      return { ...state, exercises: { ...state.exercises, [setId]: best } };
    });
  }

  /**
   * Stores a finished lesson: adds XP for today, remembers new mistakes and
   * removes the ones answered correctly this time.
   */
  completeLesson(
    lessonId: string | null,
    xp: number,
    perfect: boolean,
    wrongKeys: readonly string[],
    repairedKeys: readonly string[],
  ): void {
    this.state.update((state) => {
      const lessons = { ...(state.lessons ?? {}) };
      if (lessonId) {
        const previous = lessons[lessonId];
        lessons[lessonId] = { completions: (previous?.completions ?? 0) + 1, perfect: perfect || !!previous?.perfect };
      }
      const today = dayKey();
      const xpByDay = { ...(state.xpByDay ?? {}), [today]: ((state.xpByDay ?? {})[today] ?? 0) + xp };
      const repaired = new Set(repairedKeys.filter((key) => !wrongKeys.includes(key)));
      const mistakes = [...new Set([...(state.mistakes ?? []), ...wrongKeys])].filter((key) => !repaired.has(key));
      return { ...state, lessons, xpByDay, mistakes };
    });
  }

  toggleTask(taskId: string): void {
    this.state.update((state) => ({ ...state, tasks: { ...(state.tasks ?? {}), [taskId]: !(state.tasks ?? {})[taskId] } }));
  }

  resetPath(lessonIds: readonly string[], taskIds: readonly string[], setIds: readonly string[]): void {
    this.state.update((state) => {
      const lessons = { ...(state.lessons ?? {}) };
      lessonIds.forEach((id) => delete lessons[id]);
      const tasks = { ...(state.tasks ?? {}) };
      taskIds.forEach((id) => delete tasks[id]);
      const sets = new Set(setIds);
      const mistakes = (state.mistakes ?? []).filter((key) => !sets.has(key.split('#')[0]));
      return { ...state, lessons, tasks, mistakes };
    });
  }
}
