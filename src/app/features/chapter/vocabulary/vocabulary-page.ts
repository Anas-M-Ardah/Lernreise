import { ChangeDetectionStrategy, Component, computed, inject, input, signal, untracked } from '@angular/core';
import { Chapter } from '../../../core/models';
import { ChapterService } from '../../../core/services/chapter.service';
import { ProgressService } from '../../../core/services/progress.service';
import { Icon } from '../../../shared/ui/icon/icon';
import { FlashcardDeck } from './flashcard-deck/flashcard-deck';
import { WordList } from './word-list/word-list';

type ViewMode = 'cards' | 'list';

const ALL = 'all';

@Component({
  selector: 'app-vocabulary-page',
  imports: [Icon, FlashcardDeck, WordList],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './vocabulary-page.html',
  styleUrl: './vocabulary-page.scss',
})
export class VocabularyPage {
  private readonly chapterService = inject(ChapterService);
  private readonly progress = inject(ProgressService);

  readonly chapter = input.required<Chapter>();

  protected readonly all = ALL;
  protected readonly mode = signal<ViewMode>('cards');
  protected readonly category = signal<string>(ALL);
  protected readonly onlyOpen = signal(false);

  protected readonly cards = computed(() => this.chapterService.cardsOf(this.chapter()));

  protected readonly categories = computed(() => this.chapter().vocabulary);

  protected readonly knownCount = computed(() => {
    const status = this.progress.cards();
    return this.cards().filter((card) => status[card.id] === 'known').length;
  });

  /**
   * The cards for the current filter. Card status is read untracked so that
   * marking a card as known doesn't reshuffle the running session.
   */
  protected readonly selection = computed(() => {
    const category = this.category();
    const onlyOpen = this.onlyOpen();
    const status = untracked(this.progress.cards);
    return this.cards().filter(
      (card) => (category === ALL || card.categoryId === category) && (!onlyOpen || status[card.id] !== 'known'),
    );
  });

  protected readonly groups = computed(() => {
    const selection = this.selection();
    return this.categories()
      .map((category) => ({
        title: category.title,
        cards: selection.filter((card) => card.categoryId === category.id),
      }))
      .filter((group) => group.cards.length > 0);
  });

  protected resetProgress(): void {
    this.progress.resetCards(this.cards().map((card) => card.id));
    this.onlyOpen.set(false);
  }
}
