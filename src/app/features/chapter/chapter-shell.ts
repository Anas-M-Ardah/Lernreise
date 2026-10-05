import { ChangeDetectionStrategy, Component, DOCUMENT, computed, effect, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Chapter } from '../../core/models';
import { Icon } from '../../shared/ui/icon/icon';
import { IconName } from '../../shared/ui/icon/icons';
import { ChapterArt } from '../../shared/ui/chapter-art/chapter-art';
import { chapterTheme } from '../../shared/ui/chapter-art/chapter-theme';

interface Tab {
  readonly path: string;
  readonly label: string;
  readonly icon: IconName;
}

@Component({
  selector: 'app-chapter-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Icon, ChapterArt],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chapter-shell.html',
  styleUrl: './chapter-shell.scss',
})
export class ChapterShell {
  readonly chapter = input.required<Chapter>();
  private readonly document = inject(DOCUMENT);
  protected readonly theme = computed(() => chapterTheme(this.chapter().number));
  protected readonly questionCount = computed(() => this.chapter().exercises.reduce((sum, set) => sum + set.questions.length, 0));
  protected readonly wordCount = computed(() => this.chapter().vocabulary.reduce((sum, category) => sum + category.entries.length, 0));

  constructor() {
    effect((onCleanup) => {
      this.document.documentElement.dataset['unit'] = String(this.chapter().number);
      onCleanup(() => delete this.document.documentElement.dataset['unit']);
    });
  }

  protected readonly tabs: readonly Tab[] = [
    { path: 'grammatik', label: 'Grammatik', icon: 'book-open' },
    { path: 'uebungen', label: 'Übungen', icon: 'pencil' },
    { path: 'wortschatz', label: 'Wortschatz', icon: 'layers' },
  ];
}
