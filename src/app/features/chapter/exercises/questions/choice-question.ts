import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, output } from '@angular/core';
import { ChoiceQuestion } from '../../../../core/models';
import { splitAtGap } from '../question-utils';

@Component({
  selector: 'app-choice-question',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="sentence">
      {{ parts().before }}<span class="gap" [class.gap--filled]="selected()">{{ selected() ?? ' ' }}</span
      >{{ parts().after }}
    </p>

    <div class="options" role="group" aria-label="Antwortmöglichkeiten">
      @for (option of question().options; track option) {
        <button
          type="button"
          class="option"
          [class.option--correct]="selected() && option === question().answer"
          [class.option--wrong]="selected() === option && option !== question().answer"
          [disabled]="!!selected()"
          (click)="choose(option)"
        >
          {{ option }}
        </button>
      }
    </div>
  `,
  styleUrl: './question.scss',
})
export class ChoiceQuestionView {
  readonly question = input.required<ChoiceQuestion>();
  readonly checked = output<boolean>();

  protected readonly parts = computed(() => splitAtGap(this.question().sentence));
  protected readonly selected = linkedSignal<ChoiceQuestion, string | null>({
    source: this.question,
    computation: () => null,
  });

  protected choose(option: string): void {
    this.selected.set(option);
    this.checked.emit(option === this.question().answer);
  }
}
