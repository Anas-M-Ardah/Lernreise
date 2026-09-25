import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  input,
  linkedSignal,
  output,
  viewChild,
} from '@angular/core';
import { GapQuestion } from '../../../../core/models';
import { normalizeAnswer } from '../../../../core/utils/text';
import { splitAtGap } from '../question-utils';

type GapState = 'open' | 'correct' | 'wrong';

@Component({
  selector: 'app-gap-question',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="gap-form" (submit)="$event.preventDefault(); check()">
      <p class="sentence">
        {{ parts().before }}
        <label class="visually-hidden" for="gap-input">Lücke ausfüllen ({{ question().hint }})</label>
        <input
          #field
          id="gap-input"
          class="gap-input"
          [class.gap-input--correct]="state() === 'correct'"
          [class.gap-input--wrong]="state() === 'wrong'"
          [value]="value()"
          (input)="onInput($event)"
          [readOnly]="state() !== 'open'"
          [style.--chars]="inputWidth()"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
        />
        {{ parts().after }}
      </p>
      <p class="hint">({{ question().hint }})</p>

      @if (state() === 'open') {
        <button type="submit" class="btn btn--primary" [disabled]="!value().trim()">Prüfen</button>
      }
    </form>
  `,
  styleUrl: './question.scss',
})
export class GapQuestionView {
  readonly question = input.required<GapQuestion>();
  readonly checked = output<boolean>();

  private readonly field = viewChild.required<ElementRef<HTMLInputElement>>('field');

  protected readonly parts = computed(() => splitAtGap(this.question().sentence));
  protected readonly value = linkedSignal<GapQuestion, string>({ source: this.question, computation: () => '' });
  protected readonly state = linkedSignal<GapQuestion, GapState>({ source: this.question, computation: () => 'open' });
  protected readonly inputWidth = computed(() => Math.max(10, this.question().answers[0].length + 2));

  constructor() {
    // Focus the gap whenever a new question is shown.
    effect(() => {
      this.question();
      this.field().nativeElement.focus({ preventScroll: true });
    });
  }

  protected onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }

  protected check(): void {
    if (this.state() !== 'open' || !this.value().trim()) return;
    const answer = normalizeAnswer(this.value());
    const correct = this.question().answers.some((accepted) => normalizeAnswer(accepted) === answer);
    this.state.set(correct ? 'correct' : 'wrong');
    this.checked.emit(correct);
  }
}
