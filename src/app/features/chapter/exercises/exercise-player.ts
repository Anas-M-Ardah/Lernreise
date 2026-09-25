import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chapter, ExerciseSet } from '../../../core/models';
import { ProgressService } from '../../../core/services/progress.service';
import { Icon } from '../../../shared/ui/icon/icon';
import { solutionOf } from './question-utils';
import { ChoiceQuestionView } from './questions/choice-question';
import { GapQuestionView } from './questions/gap-question';
import { OrderQuestionView } from './questions/order-question';

@Component({
  selector: 'app-exercise-player',
  imports: [RouterLink, Icon, ChoiceQuestionView, GapQuestionView, OrderQuestionView],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './exercise-player.html',
  styleUrl: './exercise-player.scss',
})
export class ExercisePlayer {
  private readonly progress = inject(ProgressService);

  readonly chapter = input.required<Chapter>();
  readonly setId = input.required<string>();

  private readonly nextButton = viewChild<ElementRef<HTMLButtonElement>>('nextButton');

  protected readonly set = computed(() => this.chapter().exercises.find((s) => s.id === this.setId()));
  protected readonly nextSet = computed(() => {
    const sets = this.chapter().exercises;
    return sets[sets.findIndex((s) => s.id === this.setId()) + 1];
  });

  /** One entry per answered question: true = correct. Resets when the set changes. */
  protected readonly results = linkedSignal<ExerciseSet | undefined, boolean[]>({
    source: this.set,
    computation: () => [],
  });
  protected readonly index = linkedSignal<ExerciseSet | undefined, number>({ source: this.set, computation: () => 0 });

  protected readonly total = computed(() => this.set()?.questions.length ?? 0);
  protected readonly question = computed(() => this.set()?.questions[this.index()]);
  protected readonly answered = computed(() => this.results().length > this.index());
  protected readonly lastCorrect = computed(() => this.results()[this.index()]);
  protected readonly finished = computed(() => this.total() > 0 && this.index() >= this.total());
  protected readonly score = computed(() => this.results().filter(Boolean).length);
  protected readonly solution = computed(() => {
    const question = this.question();
    return question ? solutionOf(question) : '';
  });
  protected readonly verdict = computed(() => {
    const ratio = this.score() / this.total();
    if (ratio === 1) return 'Perfekt! Alles richtig.';
    if (ratio >= 0.7) return 'Sehr gut gemacht!';
    if (ratio >= 0.4) return 'Gut – mit etwas Übung sitzt es bald.';
    return 'Nicht aufgeben! Schau dir die Grammatik noch einmal an.';
  });

  constructor() {
    // Move focus to "Weiter" after answering, so Enter continues.
    effect(() => this.nextButton()?.nativeElement.focus({ preventScroll: true }));
  }

  protected onChecked(correct: boolean): void {
    this.results.update((results) => [...results, correct]);
  }

  protected next(): void {
    this.index.update((index) => index + 1);
    if (this.finished()) {
      this.progress.recordScore(this.setId(), this.score() / this.total());
    }
  }

  protected restart(): void {
    this.results.set([]);
    this.index.set(0);
  }
}
