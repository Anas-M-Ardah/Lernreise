import { ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { VocabCard } from '../../../../core/models';
import { ProgressService } from '../../../../core/services/progress.service';
import { SpeechService } from '../../../../core/services/speech.service';
import { shuffle } from '../../../../core/utils/text';
import { Icon } from '../../../../shared/ui/icon/icon';
import { grammarInfo, spokenForm } from '../vocab-display';

const TEXT_ENTRY_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);
const ACTIVATABLE_TAGS = new Set(['BUTTON', 'A']);

/**
 * A study session over a set of cards. "Nochmal" puts the card back at the
 * end of the queue, so it comes up again before the session ends.
 */
@Component({
  selector: 'app-flashcard-deck',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown)': 'onKeydown($event)' },
  templateUrl: './flashcard-deck.html',
  styleUrl: './flashcard-deck.scss',
})
export class FlashcardDeck {
  private readonly progress = inject(ProgressService);
  protected readonly speech = inject(SpeechService);

  readonly cards = input.required<readonly VocabCard[]>();

  protected readonly queue = linkedSignal<readonly VocabCard[], readonly VocabCard[]>({
    source: this.cards,
    computation: (cards) => [...cards],
  });
  protected readonly position = linkedSignal<readonly VocabCard[], number>({
    source: this.cards,
    computation: () => 0,
  });
  protected readonly flipped = signal(false);
  protected readonly knownInSession = linkedSignal<readonly VocabCard[], number>({
    source: this.cards,
    computation: () => 0,
  });

  protected readonly current = computed<VocabCard | undefined>(() => this.queue()[this.position()]);
  protected readonly finished = computed(() => this.position() >= this.queue().length);
  protected readonly progressRatio = computed(() => Math.min(1, this.position() / this.queue().length));
  protected readonly grammarInfo = grammarInfo;

  protected flip(): void {
    this.flipped.update((flipped) => !flipped);
  }

  protected markKnown(): void {
    const card = this.current();
    if (!card) return;
    this.progress.setCardStatus(card.id, 'known');
    this.knownInSession.update((count) => count + 1);
    this.advance();
  }

  protected markAgain(): void {
    const card = this.current();
    if (!card) return;
    this.progress.setCardStatus(card.id, 'learning');
    this.queue.update((queue) => [...queue, card]);
    this.advance();
  }

  protected shuffleDeck(): void {
    this.startWith(shuffle(this.cards()));
  }

  protected restart(): void {
    this.startWith([...this.cards()]);
  }

  protected speak(card: VocabCard): void {
    this.speech.speak(spokenForm(card));
  }

  protected onKeydown(event: KeyboardEvent): void {
    const tag = (event.target as HTMLElement).tagName;
    if (event.ctrlKey || event.metaKey || event.altKey || TEXT_ENTRY_TAGS.has(tag) || this.finished()) return;

    switch (event.key) {
      case ' ':
        // Space on a focused button already triggers its own click.
        if (ACTIVATABLE_TAGS.has(tag)) return;
        event.preventDefault();
        this.flip();
        break;
      case '1':
      case 'ArrowLeft':
        this.markAgain();
        break;
      case '2':
      case 'ArrowRight':
        this.markKnown();
        break;
    }
  }

  private advance(): void {
    this.flipped.set(false);
    this.position.update((position) => position + 1);
  }

  private startWith(cards: readonly VocabCard[]): void {
    this.queue.set(cards);
    this.position.set(0);
    this.knownInSession.set(0);
    this.flipped.set(false);
  }
}
