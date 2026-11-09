import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chapter, LessonKind } from '../../core/models';
import { ProgressService } from '../../core/services/progress.service';
import { Icon } from '../../shared/ui/icon/icon';
import { solutionOf } from '../chapter/exercises/question-utils';
import { ChoiceQuestionView } from '../chapter/exercises/questions/choice-question';
import { GapQuestionView } from '../chapter/exercises/questions/gap-question';
import { MatchQuestionView } from '../chapter/exercises/questions/match-question';
import { OrderQuestionView } from '../chapter/exercises/questions/order-question';
import { TableQuestionView } from '../chapter/exercises/questions/table-question';
import { HEARTS, LESSON_META, LessonItem, MISTAKES_LESSON_ID, lessonItems, mistakeItems, xpFor } from './lernpfad-utils';

interface QueueEntry {
  /** Unique per attempt, so a repeated question gets a fresh view. */
  readonly uid: number;
  readonly item: LessonItem;
  readonly retry: boolean;
}

type Status = 'playing' | 'won' | 'lost';

const PRAISE = ['Super!', 'Klasse!', 'Genau!', 'Richtig!', 'Toll gemacht!', 'Weiter so!'];

@Component({
  selector: 'app-lernpfad-lesson',
  imports: [RouterLink, Icon, ChoiceQuestionView, GapQuestionView, OrderQuestionView, MatchQuestionView, TableQuestionView],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lernpfad-lesson.html',
  styleUrl: './lernpfad-lesson.scss',
})
export class LernpfadLesson {
  private readonly progress = inject(ProgressService);
  private readonly document = inject(DOCUMENT);

  readonly chapter = input.required<Chapter>();
  readonly lessonId = input.required<string>();

  private readonly nextButton = viewChild<ElementRef<HTMLButtonElement>>('nextButton');
  private uid = 0;

  protected readonly hearts = HEARTS;
  protected readonly isMistakes = computed(() => this.lessonId() === MISTAKES_LESSON_ID);
  protected readonly lesson = computed(() =>
    this.chapter().plan?.units.flatMap((u) => u.lessons).find((l) => l.id === this.lessonId()),
  );
  protected readonly kind = computed<LessonKind | 'mistakes' | undefined>(() =>
    this.isMistakes() ? 'mistakes' : this.lesson()?.kind,
  );
  protected readonly title = computed(() => (this.isMistakes() ? 'Fehler üben' : (this.lesson()?.title ?? '')));
  protected readonly kindLabel = computed(() => {
    const kind = this.kind();
    return kind === 'mistakes' ? 'Zweite Chance' : kind ? LESSON_META[kind].label : '';
  });

  protected readonly queue = signal<QueueEntry[]>([]);
  protected readonly position = signal(0);
  protected readonly heartsLeft = signal(HEARTS);
  protected readonly answered = signal<boolean | null>(null);
  protected readonly combo = signal(0);
  protected readonly bestCombo = signal(0);
  protected readonly status = signal<Status>('playing');
  protected readonly earnedXp = signal(0);
  private readonly initialCount = signal(0);
  private readonly solved = signal(0);
  private readonly wrongKeys = signal<ReadonlySet<string>>(new Set());
  private readonly firstTryRight = signal<ReadonlySet<string>>(new Set());

  protected readonly current = computed(() => this.queue()[this.position()]);
  protected readonly progressRatio = computed(() => (this.initialCount() ? this.solved() / this.initialCount() : 0));
  protected readonly progressPercent = computed(() => Math.round(this.progressRatio() * 100));
  protected readonly solution = computed(() => {
    const entry = this.current();
    return entry ? solutionOf(entry.item.question) : '';
  });
  protected readonly praise = computed(() => PRAISE[this.position() % PRAISE.length]);
  protected readonly perfect = computed(() => this.wrongKeys().size === 0);
  /** Every wrong answer adds one attempt to the queue. */
  protected readonly accuracy = computed(() =>
    this.queue().length ? Math.round((this.initialCount() / this.queue().length) * 100) : 100,
  );
  protected readonly streak = this.progress.streak;
  protected readonly todayXp = this.progress.todayXp;
  protected readonly dailyGoal = computed(() => this.chapter().plan?.dailyGoal ?? 30);

  constructor() {
    // (Re)build the lesson whenever the chapter or lesson changes.
    effect(() => {
      const chapter = this.chapter();
      this.lessonId();
      untracked(() => this.start(chapter));
    });
    effect((onCleanup) => {
      this.document.documentElement.dataset['unit'] = String(this.chapter().number);
      onCleanup(() => delete this.document.documentElement.dataset['unit']);
    });
    // Move focus to "Weiter" after answering, so Enter continues.
    effect(() => this.nextButton()?.nativeElement.focus({ preventScroll: true }));
  }

  protected start(chapter = this.chapter()): void {
    const lesson = this.lesson();
    const items = this.isMistakes()
      ? mistakeItems(chapter, this.progress.mistakes())
      : lesson
        ? lessonItems(chapter, lesson)
        : [];
    this.queue.set(items.map((item) => ({ uid: ++this.uid, item, retry: false })));
    this.initialCount.set(items.length);
    this.position.set(0);
    this.solved.set(0);
    this.heartsLeft.set(HEARTS);
    this.answered.set(null);
    this.combo.set(0);
    this.bestCombo.set(0);
    this.wrongKeys.set(new Set());
    this.firstTryRight.set(new Set());
    this.earnedXp.set(0);
    this.status.set('playing');
  }

  protected onChecked(correct: boolean): void {
    if (this.answered() !== null) return;
    const entry = this.current();
    if (!entry) return;
    this.answered.set(correct);
    if (correct) {
      this.solved.update((n) => n + 1);
      this.combo.update((n) => n + 1);
      this.bestCombo.update((best) => Math.max(best, this.combo()));
      if (!entry.retry) this.firstTryRight.update((set) => new Set([...set, entry.item.key]));
    } else {
      this.heartsLeft.update((n) => Math.max(0, n - 1));
      this.combo.set(0);
      this.wrongKeys.update((set) => new Set([...set, entry.item.key]));
      // Wrong answers come back at the end of the lesson.
      this.queue.update((queue) => [...queue, { uid: ++this.uid, item: entry.item, retry: true }]);
    }
  }

  protected next(): void {
    if (this.heartsLeft() === 0) {
      this.finish('lost');
      return;
    }
    this.answered.set(null);
    this.position.update((p) => p + 1);
    if (this.position() >= this.queue().length) this.finish('won');
  }

  private finish(status: Status): void {
    const kind = this.kind() ?? 'vocab';
    const xp = status === 'won' ? xpFor(kind, this.perfect()) : 0;
    this.earnedXp.set(xp);
    this.progress.completeLesson(
      status === 'won' && !this.isMistakes() ? this.lessonId() : null,
      xp,
      this.perfect(),
      [...this.wrongKeys()],
      status === 'won' ? [...this.firstTryRight()] : [],
    );
    this.status.set(status);
  }
}
