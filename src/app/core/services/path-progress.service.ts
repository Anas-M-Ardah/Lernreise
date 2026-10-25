import { Injectable, computed, effect, signal } from '@angular/core';
import { readStorage, writeStorage } from '../utils/storage';

export const DAILY_GOAL_XP = 100;

interface PathState {
  readonly xp: number;
  /** XP earned per local day, keyed `YYYY-MM-DD`. */
  readonly xpByDay: Readonly<Record<string, number>>;
  /** Best first-try accuracy per lesson, between 0 and 1. */
  readonly lessons: Readonly<Record<string, number>>;
  /** Question keys answered wrong and not yet answered right since. */
  readonly mistakes: readonly string[];
}

const STORAGE_KEY = 'b12-lernreise.path.v1';
const EMPTY: PathState = { xp: 0, xpByDay: {}, lessons: {}, mistakes: [] };

function dayKey(date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Progress for the Duolingo-style exam path, stored separately from the chapter progress. */
@Injectable({ providedIn: 'root' })
export class PathProgressService {
  private readonly state = signal<PathState>({ ...EMPTY, ...readStorage(STORAGE_KEY, EMPTY) });

  readonly xp = computed(() => this.state().xp);
  readonly lessons = computed(() => this.state().lessons);
  readonly mistakes = computed(() => this.state().mistakes);
  readonly todayXp = computed(() => this.state().xpByDay[dayKey()] ?? 0);

  /** Consecutive days with XP, counting today (or ending yesterday if today is still empty). */
  readonly streak = computed(() => {
    const days = this.state().xpByDay;
    const date = new Date();
    if (!days[dayKey(date)]) date.setDate(date.getDate() - 1);
    let count = 0;
    while (days[dayKey(date)]) {
      count++;
      date.setDate(date.getDate() - 1);
    }
    return count;
  });

  constructor() {
    effect(() => writeStorage(STORAGE_KEY, this.state()));
  }

  completeLesson(lessonId: string, accuracy: number, xp: number): void {
    this.state.update((state) => {
      const today = dayKey();
      return {
        ...state,
        xp: state.xp + xp,
        xpByDay: { ...state.xpByDay, [today]: (state.xpByDay[today] ?? 0) + xp },
        lessons: { ...state.lessons, [lessonId]: Math.max(state.lessons[lessonId] ?? 0, accuracy) },
      };
    });
  }

  recordAnswer(key: string, correct: boolean): void {
    this.state.update((state) => {
      const rest = state.mistakes.filter((k) => k !== key);
      return { ...state, mistakes: correct ? rest : [...rest, key] };
    });
  }
}
