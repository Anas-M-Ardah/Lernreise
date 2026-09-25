import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ConnectorsBlock } from '../../../../core/models';
import { RichText } from '../../../../shared/ui/rich-text/rich-text';

@Component({
  selector: 'app-connectors-block',
  imports: [RichText],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="grid">
      @for (connector of block().items; track connector.word) {
        <li class="connector">
          <header class="connector__header">
            <h3 class="connector__word">{{ connector.word }}</h3>
            <span class="connector__translations">
              <span lang="en">{{ connector.english }}</span>
              <span lang="ar" dir="rtl">{{ connector.arabic }}</span>
            </span>
          </header>
          <p class="connector__meaning">{{ connector.meaning }}</p>
          <ul class="connector__tenses" aria-label="Typische Zeitformen">
            @for (tense of connector.tenses; track tense) {
              <li>{{ tense }}</li>
            }
          </ul>
          <p class="connector__example"><app-rich-text [text]="connector.example" /></p>
        </li>
      }
    </ul>
  `,
  styleUrl: './connectors-block.scss',
})
export class ConnectorsBlockView {
  readonly block = input.required<ConnectorsBlock>();
}
