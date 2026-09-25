import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Chapter } from '../../core/models';
import { Icon } from '../../shared/ui/icon/icon';
import { IconName } from '../../shared/ui/icon/icons';

interface Tab {
  readonly path: string;
  readonly label: string;
  readonly icon: IconName;
}

@Component({
  selector: 'app-chapter-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chapter-shell.html',
  styleUrl: './chapter-shell.scss',
})
export class ChapterShell {
  readonly chapter = input.required<Chapter>();

  protected readonly tabs: readonly Tab[] = [
    { path: 'grammatik', label: 'Grammatik', icon: 'book-open' },
    { path: 'uebungen', label: 'Übungen', icon: 'pencil' },
    { path: 'wortschatz', label: 'Wortschatz', icon: 'layers' },
  ];
}
