import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chapter } from '../../../core/models';
import { Icon } from '../../../shared/ui/icon/icon';
import { GrammarBlockView } from './blocks/grammar-block';

@Component({
  selector: 'app-grammar-page',
  imports: [RouterLink, Icon, GrammarBlockView],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './grammar-page.html',
  styleUrl: './grammar-page.scss',
})
export class GrammarPage {
  readonly chapter = input.required<Chapter>();

  protected readonly topics = computed(() =>
    this.chapter().grammar.map((topic) => ({
      topic,
      exercises: this.chapter().exercises.filter((set) => set.topicId === topic.id),
    })),
  );
}
