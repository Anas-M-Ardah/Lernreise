import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ClausesBlock } from '../../../../core/models';
import { RichText } from '../../../../shared/ui/rich-text/rich-text';
import { TENSE_LABELS } from '../tense';

/** Shows sentences split into colour-coded main clauses (HS) and subordinate clauses (NS). */
@Component({
  selector: 'app-clauses-block',
  imports: [RichText],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (block().title) {
      <h3 class="title">{{ block().title }}</h3>
    }
    <div class="legend" aria-hidden="true">
      <span class="chip chip--NS">NS = Nebensatz</span>
      <span class="chip chip--HS">HS = Hauptsatz</span>
    </div>
    <ul class="sentences">
      @for (sentence of block().sentences; track $index) {
        <li class="sentence">
          @for (clause of sentence; track $index) {
            <span class="clause clause--{{ clause.type }}">
              <span class="clause__type">
                {{ clause.type }}
                @if (clause.tense) {
                  <span class="clause__tense">· {{ tenseLabels[clause.tense] }}</span>
                }
              </span>
              <span class="clause__text"><app-rich-text [text]="clause.text" /></span>
            </span>
          }
        </li>
      }
    </ul>
  `,
  styleUrl: './clauses-block.scss',
})
export class ClausesBlockView {
  readonly block = input.required<ClausesBlock>();

  protected readonly tenseLabels = TENSE_LABELS;
}
