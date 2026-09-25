import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChapterService } from '../../core/services/chapter.service';
import { ProgressService } from '../../core/services/progress.service';
import { Icon } from '../../shared/ui/icon/icon';
import { ProgressRing } from '../../shared/ui/progress-ring/progress-ring';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Icon, ProgressRing],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly chapterService = inject(ChapterService);
  private readonly progress = inject(ProgressService);

  protected readonly upcoming = this.chapterService.upcoming;

  protected readonly chapters = computed(() => {
    const knownCards = this.progress.cards();
    return this.chapterService.chapters.map((chapter) => {
      const cards = this.chapterService.cardsOf(chapter);
      const known = cards.filter((card) => knownCards[card.id] === 'known').length;
      return {
        chapter,
        words: cards.length,
        questions: this.chapterService.questionCount(chapter),
        progress: cards.length ? known / cards.length : 0,
      };
    });
  });
}
