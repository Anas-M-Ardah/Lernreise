import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { parseHighlights } from '../../../core/utils/text';

/** Renders text with `*highlighted*` words — safely, without innerHTML. */
@Component({
  selector: 'app-rich-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Kept on one line: any whitespace here would show up before punctuation.
  template: `@for (s of segments(); track $index) {@if (s.highlight) {<mark>{{ s.text }}</mark>} @else {<span>{{ s.text }}</span>}}`,
  styles: `
    mark {
      padding: 0.05em 0.3em;
      border-radius: 6px;
      font-weight: 700;
      color: var(--highlight-color, var(--highlight-fg));
      background: var(--highlight-background, var(--highlight-bg));
      box-decoration-break: clone;
      -webkit-box-decoration-break: clone;
    }
  `,
})
export class RichText {
  readonly text = input.required<string>();

  protected readonly segments = computed(() => parseHighlights(this.text()));
}
