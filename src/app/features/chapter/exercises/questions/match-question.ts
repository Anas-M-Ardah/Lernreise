import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, output, signal } from '@angular/core';
import { MatchQuestion } from '../../../../core/models';
import { shuffle } from '../../../../core/utils/text';

interface Tile {
  readonly pair: number;
  readonly text: string;
}

/**
 * Tap a tile on the left, then its partner on the right. Matched pairs lock in;
 * a wrong pair flashes red. Reports `true` only if every pair was found without a mistake.
 */
@Component({
  selector: 'app-match-question',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="hint">{{ question().prompt }}</p>

    <div class="match" role="group" aria-label="Paare finden">
      <div class="match__column">
        @for (tile of left(); track tile.pair) {
          <button
            type="button"
            class="option match__tile"
            [class.match__tile--selected]="selected() === tile.pair"
            [class.option--correct]="matched().has(tile.pair)"
            [class.option--wrong]="wrong()?.left === tile.pair"
            [disabled]="matched().has(tile.pair)"
            [attr.aria-pressed]="selected() === tile.pair"
            (click)="pickLeft(tile)"
          >
            {{ tile.text }}
          </button>
        }
      </div>
      <div class="match__column">
        @for (tile of right(); track tile.pair) {
          <button
            type="button"
            class="option match__tile"
            [class.option--correct]="matched().has(tile.pair)"
            [class.option--wrong]="wrong()?.right === tile.pair"
            [disabled]="matched().has(tile.pair)"
            (click)="pickRight(tile)"
          >
            {{ tile.text }}
          </button>
        }
      </div>
    </div>
  `,
  styleUrl: './question.scss',
})
export class MatchQuestionView {
  readonly question = input.required<MatchQuestion>();
  readonly checked = output<boolean>();

  private readonly tiles = computed(() => this.question().pairs.map(([l, r], pair) => ({ l: { pair, text: l }, r: { pair, text: r } })));
  protected readonly left = linkedSignal<unknown, Tile[]>({ source: this.tiles, computation: () => shuffle(this.tiles().map((t) => t.l)) });
  protected readonly right = linkedSignal<unknown, Tile[]>({ source: this.tiles, computation: () => shuffle(this.tiles().map((t) => t.r)) });
  protected readonly matched = linkedSignal<unknown, ReadonlySet<number>>({ source: this.tiles, computation: () => new Set() });
  protected readonly selected = linkedSignal<unknown, number | null>({ source: this.tiles, computation: () => null });
  protected readonly wrong = signal<{ left: number; right: number } | null>(null);
  private readonly mistakes = linkedSignal<unknown, number>({ source: this.tiles, computation: () => 0 });

  protected pickLeft(tile: Tile): void {
    this.wrong.set(null);
    this.selected.set(tile.pair);
  }

  protected pickRight(tile: Tile): void {
    const left = this.selected();
    if (left === null) return;
    if (left === tile.pair) {
      this.matched.update((set) => new Set([...set, tile.pair]));
      this.selected.set(null);
      this.wrong.set(null);
      if (this.matched().size === this.question().pairs.length) this.checked.emit(this.mistakes() === 0);
    } else {
      this.mistakes.update((n) => n + 1);
      this.wrong.set({ left, right: tile.pair });
      this.selected.set(null);
    }
  }
}
