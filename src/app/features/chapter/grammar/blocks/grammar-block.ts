import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GrammarBlock } from '../../../../core/models';
import { Icon } from '../../../../shared/ui/icon/icon';
import { RichText } from '../../../../shared/ui/rich-text/rich-text';
import { ClausesBlockView } from './clauses-block';
import { ConnectorsBlockView } from './connectors-block';
import { TimelineBlockView } from './timeline-block';

/** Renders any grammar block by its `kind`. */
@Component({
  selector: 'app-grammar-block',
  imports: [Icon, RichText, TimelineBlockView, ClausesBlockView, ConnectorsBlockView],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './grammar-block.html',
  styleUrl: './grammar-block.scss',
})
export class GrammarBlockView {
  readonly block = input.required<GrammarBlock>();
}
