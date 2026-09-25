import { Injectable, computed, effect, signal } from '@angular/core';
import { readStorage, writeStorage } from '../utils/storage';

export type CardStatus = 'known' | 'learning';

interface ProgressState {
  readonly cards: Readonly<Record<string, CardStatus>>;
  /** Best score per exercise set, as a ratio between 0 and 1. */
  readonly exercises: Readonly<Record<string, number>>;
}

const STORAGE_KEY = 'b12-lernreise.progress.v1';
const EMPTY: ProgressState = { cards: {}, exercises: {} };

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly state = signal<ProgressState>(readStorage(STORAGE_KEY, EMPTY));

  readonly cards = computed(() => this.state().cards);
  readonly exercises = computed(() => this.state().exercises);

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
}
