import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, output } from '@angular/core';
import { TableQuestion } from '../../../../core/models';
import { normalizeAnswer } from '../../../../core/utils/text';

type CellState = 'open' | 'correct' | 'wrong';

@Component({
  selector: 'app-table-question',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (question().caption) {
      <p class="hint">{{ question().caption }}</p>
    }

    <div class="table-scroll">
      <table class="ending-table">
        <thead>
          <tr>
            <th></th>
            @for (col of question().columns; track col) {
              <th>{{ col }}</th>
            }
          </tr>
        </thead>
        <tbody>
          @for (r of question().rows; track r.label; let ri = $index) {
            <tr>
              <th scope="row">{{ r.label }}</th>
              @for (c of r.cells; track $index; let ci = $index) {
                <td>
                  <span class="ending-cell">
                    <span class="ending-cell__stem">{{ c.prefix }}</span>
                    <label class="visually-hidden" [for]="cellId(ri, ci)">
                      {{ r.label }}, {{ question().columns[ci] }}: Endung eingeben
                    </label>
                    <input
                      [id]="cellId(ri, ci)"
                      class="ending-input"
                      [class.ending-input--correct]="stateOf(ri, ci) === 'correct'"
                      [class.ending-input--wrong]="stateOf(ri, ci) === 'wrong'"
                      [value]="valueOf(ri, ci)"
                      (input)="onInput(ri, ci, $event)"
                      [disabled]="locked()"
                      autocomplete="off"
                      autocapitalize="off"
                      spellcheck="false"
                      size="3"
                    />
                    @if (c.suffix) {
                      <span class="ending-cell__suffix">{{ c.suffix }}</span>
                    }
                  </span>
                  @if (stateOf(ri, ci) === 'wrong') {
                    <span class="ending-cell__solution">richtig: ‑{{ c.answers[0] }}</span>
                  }
                </td>
              }
            </tr>
          }
        </tbody>
      </table>
    </div>

    @if (!locked()) {
      <button type="button" class="btn btn--primary" [disabled]="!allFilled()" (click)="check()">Prüfen</button>
    } @else {
      <p class="hint">{{ correctCount() }} / {{ totalCount() }} Endungen richtig.</p>
    }
  `,
  styleUrl: './question.scss',
})
export class TableQuestionView {
  readonly question = input.required<TableQuestion>();
  readonly checked = output<boolean>();

  protected readonly values = linkedSignal<TableQuestion, string[][]>({
    source: this.question,
    computation: (q) => q.rows.map((r) => r.cells.map(() => '')),
  });
  protected readonly states = linkedSignal<TableQuestion, CellState[][]>({
    source: this.question,
    computation: (q) => q.rows.map((r) => r.cells.map(() => 'open' as CellState)),
  });

  protected readonly locked = computed(() => this.states().some((r) => r.some((s) => s !== 'open')));
  protected readonly allFilled = computed(() => this.values().every((r) => r.every((v) => v.trim().length > 0)));
  protected readonly totalCount = computed(() => this.question().rows.reduce((sum, r) => sum + r.cells.length, 0));
  protected readonly correctCount = computed(() =>
    this.states().reduce((sum, r) => sum + r.filter((s) => s === 'correct').length, 0),
  );

  protected valueOf(ri: number, ci: number): string {
    return this.values()[ri][ci];
  }

  protected stateOf(ri: number, ci: number): CellState {
    return this.states()[ri][ci];
  }

  protected cellId(ri: number, ci: number): string {
    return `table-cell-${ri}-${ci}`;
  }

  protected onInput(ri: number, ci: number, event: Event): void {
    const next = (event.target as HTMLInputElement).value;
    this.values.update((rows) => rows.map((r, i) => (i === ri ? r.map((v, j) => (j === ci ? next : v)) : r)));
  }

  protected check(): void {
    if (!this.allFilled()) return;
    const rows = this.question().rows;
    const nextStates = rows.map((r, ri) =>
      r.cells.map((c, ci): CellState => {
        const typed = normalizeAnswer(this.values()[ri][ci]);
        return c.answers.some((a) => normalizeAnswer(a) === typed) ? 'correct' : 'wrong';
      }),
    );
    this.states.set(nextStates);
    const correct = nextStates.reduce((sum, r) => sum + r.filter((s) => s === 'correct').length, 0);
    this.checked.emit(correct === this.totalCount());
  }
}
