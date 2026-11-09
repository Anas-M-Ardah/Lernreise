import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChapterService } from '../../core/services/chapter.service';
import { ProgressService } from '../../core/services/progress.service';
import { Icon } from '../../shared/ui/icon/icon';
import { ProgressRing } from '../../shared/ui/progress-ring/progress-ring';
import { ChapterArt } from '../../shared/ui/chapter-art/chapter-art';
import { ChapterGallery } from '../../shared/ui/chapter-art/chapter-gallery';
import { chapterTheme } from '../../shared/ui/chapter-art/chapter-theme';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Icon, ProgressRing, ChapterArt, ChapterGallery],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly chapterService = inject(ChapterService);
  private readonly progress = inject(ProgressService);

  protected readonly upcoming = this.chapterService.upcoming;
  protected readonly totals = {
    chapters: this.chapterService.chapters.length,
    questions: this.chapterService.chapters.reduce((sum, chapter) => sum + this.chapterService.questionCount(chapter), 0),
    words: this.chapterService.chapters.reduce((sum, chapter) => sum + this.chapterService.wordCount(chapter), 0),
  };

  protected readonly chapters = computed(() => {
    const knownCards = this.progress.cards();
    return this.chapterService.chapters.map((chapter) => {
      const cards = this.chapterService.cardsOf(chapter);
      const known = cards.filter((card) => knownCards[card.id] === 'known').length;
      return {
        chapter,
        theme: chapterTheme(chapter.number),
        words: cards.length,
        questions: this.chapterService.questionCount(chapter),
        progress: cards.length ? known / cards.length : 0,
      };
    });
  });

  /** Chapters grouped by course level, newest course first (B1.3 before B1.2). */
  protected readonly courses = computed(() => {
    const list = this.chapters();
    const groups = new Map<string, { course: string; book: string; items: typeof list }>();
    for (const item of list) {
      const course = item.chapter.course ?? 'B1.2';
      const group = groups.get(course) ?? { course, book: item.chapter.book ?? 'Netzwerk neu B1.2', items: [] };
      group.items.push(item);
      groups.set(course, group);
    }
    return [...groups.values()].sort((a, b) => b.course.localeCompare(a.course));
  });
}
