import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TimelineBlock } from '../../../../core/models';
import { RichText } from '../../../../shared/ui/rich-text/rich-text';
import { TENSE_LABELS } from '../tense';

@Component({
  selector: 'app-timeline-block',
  imports: [RichText],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol class="timeline" aria-label="Zeitstrahl">
      @for (step of block().steps; track step.label) {
        <li class="step" [attr.data-tense]="step.tense">
          <span class="step__label">{{ step.label }}</span>
          <span class="step__dot" aria-hidden="true"></span>
          <span class="step__tense">{{ tenseLabels[step.tense] }}</span>
          <p class="step__example"><app-rich-text [text]="step.example" /></p>
        </li>
      }
    </ol>
  `,
  styleUrl: './timeline-block.scss',
})
export class TimelineBlockView {
  readonly block = input.required<TimelineBlock>();

  protected readonly tenseLabels = TENSE_LABELS;
}
