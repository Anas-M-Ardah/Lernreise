import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PathProgressService } from '../../core/services/path-progress.service';
import { SpeechService } from '../../core/services/speech.service';
import { Icon } from '../../shared/ui/icon/icon';
import { solutionOf } from '../chapter/exercises/question-utils';
import { ChoiceQuestionView } from '../chapter/exercises/questions/choice-question';
import { GapQuestionView } from '../chapter/exercises/questions/gap-question';
import { OrderQuestionView } from '../chapter/exercises/questions/order-question';
import { TableQuestionView } from '../chapter/exercises/questions/table-question';
import { GrammarBlockView } from '../chapter/grammar/blocks/grammar-block';
import { grammarInfo, spokenForm } from '../chapter/vocabulary/vocab-display';
import { VocabCard } from '../../core/models';
import { LessonItem, PATH_LESSONS, PathLesson, mistakesLesson, teachingCards } from './path-lessons';

const MAX_HEARTS = 5;
const XP_FIRST_TRY = 10;
const XP_RETRY = 5;
const XP_PERFECT_BONUS = 20;
const PRAISE = ['Richtig!', 'Super!', 'Klasse!', 'Genau!', 'Prima!', 'Stark!'];
const COMBO_MILESTONES = [3, 5, 8, 10, 15, 20];
const WORDS_PER_CARD = 5;

interface QueuedItem extends LessonItem {
  /** Unique per appearance, so a repeated question gets a fresh question component. */
  readonly uid: number;
  readonly retry: boolean;
}

type Phase = 'learn' | 'play' | 'out-of-hearts' | 'done';

@Component({
  selector: 'app-lesson-player',
  imports: [DecimalPipe, RouterLink, Icon, GrammarBlockView, ChoiceQuestionView, GapQuestionView, OrderQuestionView, TableQuestionView],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lesson-player.html',
  styleUrl: './lesson-player.scss',
})
export class LessonPlayer {
  private readonly progress = inject(PathProgressService);
  protected readonly speech = inject(SpeechService);
  protected readonly grammarInfo = grammarInfo;

  readonly lessonId = input.required<string>();

  private readonly nextButton = viewChild<ElementRef<HTMLButtonElement>>('nextButton');
  private readonly attempt = signal(0);

  protected readonly lesson = computed<PathLesson | undefined>(() => {
    const id = this.lessonId();
    this.attempt();
    // Snapshot the mistakes once: the list changes while the lesson is played.
    return id === 'fehler' ? untracked(() => mistakesLesson(this.progress.mistakes())) : PATH_LESSONS.find((l) => l.id === id);
  });

  /** Changes whenever a new run of the lesson starts; every piece of run state resets with it. */
  private readonly run = computed(() => ({ lesson: this.lesson(), attempt: this.attempt() }));

  protected readonly queue = linkedSignal<{ lesson?: PathLesson }, QueuedItem[]>({
    source: this.run,
    computation: ({ lesson }) => (lesson?.build() ?? []).map((item, uid) => ({ ...item, uid, retry: false })),
  });
  protected readonly initialCount = computed(() => this.queue().filter((item) => !item.retry).length);

  protected readonly index = linkedSignal({ source: this.run, computation: () => 0 });
  protected readonly hearts = linkedSignal({ source: this.run, computation: () => MAX_HEARTS });
  protected readonly combo = linkedSignal({ source: this.run, computation: () => 0 });
  protected readonly bestCombo = linkedSignal({ source: this.run, computation: () => 0 });
  protected readonly correctCount = linkedSignal({ source: this.run, computation: () => 0 });
  protected readonly firstTryCorrect = linkedSignal({ source: this.run, computation: () => 0 });
  protected readonly xpEarned = linkedSignal({ source: this.run, computation: () => 0 });
  /** Teach first (Busuu-style) on the first run; "Nochmal" goes straight to the questions. */
  protected readonly phase = linkedSignal<{ lesson?: PathLesson; attempt: number }, Phase>({
    source: this.run,
    computation: ({ lesson, attempt }) => (attempt === 0 && this.learnCards(lesson).length ? 'learn' : 'play'),
  });
  protected readonly cardIndex = linkedSignal({ source: this.run, computation: () => 0 });
  protected readonly showRule = linkedSignal({ source: this.run, computation: () => false });

  /** Teaching cards: rule cards for a grammar lesson, or pages of new words for a vocabulary lesson. */
  protected readonly cards = computed(() => this.learnCards(this.lesson()));
  protected readonly card = computed(() => this.cards()[this.cardIndex()]);
  /** Result of the current question: null while it is still open. */
  protected readonly result = linkedSignal<unknown, boolean | null>({ source: this.run, computation: () => null });
  private readonly startedAt = linkedSignal({ source: this.run, computation: () => Date.now() });
  protected readonly durationMinutes = signal(0);

  protected readonly heartSlots = Array.from({ length: MAX_HEARTS }, (_, i) => i);
  protected readonly current = computed(() => this.queue()[this.index()]);
  /** A one-item list keyed by uid, so `@for` recreates the question view for each appearance. */
  protected readonly currentList = computed(() => (this.current() ? [this.current()!] : []));
  protected readonly progressRatio = computed(() =>
    this.phase() === 'learn'
      ? (this.cardIndex() + 1) / Math.max(1, this.cards().length)
      : this.correctCount() / Math.max(1, this.initialCount()),
  );
  protected readonly solution = computed(() => (this.current() ? solutionOf(this.current()!.question) : ''));
  protected readonly accuracy = computed(() => this.firstTryCorrect() / Math.max(1, this.initialCount()));
  protected readonly perfect = computed(() => this.firstTryCorrect() === this.initialCount());

  protected readonly feedbackTitle = computed(() => {
    if (this.result() === false) return 'Nicht ganz – das kommt gleich nochmal.';
    const combo = this.combo();
    if (COMBO_MILESTONES.includes(combo)) return `${combo} richtig in Folge!`;
    return PRAISE[this.index() % PRAISE.length];
  });

  protected readonly verdict = computed(() => {
    const ratio = this.accuracy();
    if (ratio === 1) return 'Perfekt! Kein einziger Fehler.';
    if (ratio >= 0.8) return 'Sehr gut – du bist bereit!';
    if (ratio >= 0.5) return 'Gut gemacht! Wiederhole deine Fehler noch einmal.';
    return 'Dranbleiben! Schau dir die Grammatik noch einmal an.';
  });

  constructor() {
    // Move focus to "Weiter" after answering, so Enter continues.
    effect(() => this.nextButton()?.nativeElement.focus({ preventScroll: true }));
  }

  private learnCards(lesson: PathLesson | undefined) {
    if (lesson?.topic) return teachingCards(lesson.topic).map((blocks) => ({ blocks, words: [] as VocabCard[] }));
    const words = lesson?.words ?? [];
    const pages = [];
    for (let i = 0; i < words.length; i += WORDS_PER_CARD) pages.push({ blocks: [], words: words.slice(i, i + WORDS_PER_CARD) });
    return pages;
  }

  protected nextCard(): void {
    if (this.cardIndex() + 1 < this.cards().length) this.cardIndex.update((i) => i + 1);
    else this.startQuestions();
  }

  protected previousCard(): void {
    this.cardIndex.update((i) => Math.max(0, i - 1));
  }

  protected startQuestions(): void {
    this.startedAt.set(Date.now());
    this.phase.set('play');
  }

  protected speak(word: VocabCard): void {
    this.speech.speak(spokenForm(word));
  }

  protected onChecked(correct: boolean): void {
    const item = this.current();
    if (!item || this.result() !== null) return;
    this.result.set(correct);
    if (!item.retry) this.progress.recordAnswer(item.key, correct);

    if (correct) {
      this.correctCount.update((n) => n + 1);
      this.combo.update((n) => n + 1);
      this.bestCombo.update((n) => Math.max(n, this.combo()));
      this.xpEarned.update((xp) => xp + (item.retry ? XP_RETRY : XP_FIRST_TRY));
      if (!item.retry) this.firstTryCorrect.update((n) => n + 1);
    } else {
      this.combo.set(0);
      this.hearts.update((n) => n - 1);
      // Like Duolingo: a missed question comes back at the end of the lesson until it sits.
      this.queue.update((queue) => [...queue, { ...item, uid: queue.length, retry: true }]);
    }
  }

  protected next(): void {
    this.result.set(null);
    if (this.hearts() <= 0) {
      this.phase.set('out-of-hearts');
      return;
    }
    this.index.update((i) => i + 1);
    if (this.index() >= this.queue().length) this.finish();
  }

  protected refillHearts(): void {
    this.hearts.set(3);
    this.phase.set('play');
    this.index.update((i) => i + 1);
    if (this.index() >= this.queue().length) this.finish();
  }

  protected restart(): void {
    this.attempt.update((n) => n + 1);
  }

  private finish(): void {
    if (this.perfect()) this.xpEarned.update((xp) => xp + XP_PERFECT_BONUS);
    this.durationMinutes.set(Math.max(1, Math.round((Date.now() - this.startedAt()) / 60000)));
    this.progress.completeLesson(this.lessonId(), this.accuracy(), this.xpEarned());
    this.phase.set('done');
  }
}
