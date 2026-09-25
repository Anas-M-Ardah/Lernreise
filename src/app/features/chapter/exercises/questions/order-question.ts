import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, output } from '@angular/core';
import { OrderQuestion } from '../../../../core/models';
import { shuffle } from '../../../../core/utils/text';

interface Token {
  readonly id: number;
  readonly word: string;
}

type OrderState = 'open' | 'correct' | 'wrong';

@Component({
  selector: 'app-order-question',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="hint">{{ question().prompt }}</p>

    <div
      class="answer-line"
      [class.answer-line--correct]="state() === 'correct'"
      [class.answer-line--wrong]="state() === 'wrong'"
      aria-label="Dein Satz"
      role="group"
    >
      @for (token of placed(); track token.id) {
        <button type="button" class="token token--placed" [disabled]="state() !== 'open'" (click)="unplace(token)">
          {{ token.word }}
        </button>
      } @empty {
        <span class="answer-line__placeholder">Tippe die Wörter in der richtigen Reihenfolge an …</span>
      }
    </div>

    <div class="pool" role="group" aria-label="Verfügbare Wörter">
      @for (token of pool(); track token.id) {
        <button type="button" class="token" (click)="place(token)">{{ token.word }}</button>
      }
    </div>

    @if (state() === 'open') {
      <button type="button" class="btn btn--primary" [disabled]="pool().length > 0" (click)="check()">Prüfen</button>
    }
  `,
  styleUrl: './question.scss',
})
export class OrderQuestionView {
  readonly question = input.required<OrderQuestion>();
  readonly checked = output<boolean>();

  private readonly tokens = computed(() => this.question().words.map((word, id) => ({ id, word })));

  protected readonly pool = linkedSignal<Token[], Token[]>({
    source: this.tokens,
    computation: (tokens) => shuffle(tokens),
  });
  protected readonly placed = linkedSignal<Token[], Token[]>({ source: this.tokens, computation: () => [] });
  protected readonly state = linkedSignal<Token[], OrderState>({ source: this.tokens, computation: () => 'open' });

  protected place(token: Token): void {
    this.pool.update((pool) => pool.filter((t) => t.id !== token.id));
    this.placed.update((placed) => [...placed, token]);
  }

  protected unplace(token: Token): void {
    this.placed.update((placed) => placed.filter((t) => t.id !== token.id));
    this.pool.update((pool) => [...pool, token]);
  }

  protected check(): void {
    const sentence = this.placed().map((t) => t.word).join(' ');
    const correct = sentence === this.question().words.join(' ');
    this.state.set(correct ? 'correct' : 'wrong');
    this.checked.emit(correct);
  }
}
