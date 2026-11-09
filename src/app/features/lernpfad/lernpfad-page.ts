import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chapter } from '../../core/models';
import { ProgressService } from '../../core/services/progress.service';
import { Icon } from '../../shared/ui/icon/icon';
import { ProgressRing } from '../../shared/ui/progress-ring/progress-ring';
import { LESSON_META, MISTAKES_LESSON_ID, REVIEW_SIZE, allLessons, itemsOfSets } from './lernpfad-utils';

type NodeState = 'done' | 'current' | 'open' | 'locked';

/** Zig-zag offsets (in steps) for the lesson bubbles. */
const OFFSETS = [0, 1, 1.6, 1, 0, -1, -1.6, -1];

@Component({
  selector: 'app-lernpfad-page',
  imports: [RouterLink, Icon, ProgressRing],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lernpfad-page.html',
  styleUrl: './lernpfad-page.scss',
})
export class LernpfadPage {
  private readonly progress = inject(ProgressService);

  readonly chapter = input.required<Chapter>();

  protected readonly plan = computed(() => this.chapter().plan);
  protected readonly streak = this.progress.streak;
  protected readonly totalXp = this.progress.totalXp;
  protected readonly todayXp = this.progress.todayXp;
  protected readonly week = this.progress.week;
  protected readonly mistakesLessonId = MISTAKES_LESSON_ID;

  protected readonly dailyGoal = computed(() => this.plan()?.dailyGoal ?? 30);
  protected readonly goalRatio = computed(() => Math.min(1, this.todayXp() / this.dailyGoal()));

  /** Mistakes that belong to this chapter's exercise sets. */
  protected readonly mistakeCount = computed(() => {
    const keys = new Set(itemsOfSets(this.chapter(), this.chapter().exercises.map((s) => s.id)).map((i) => i.key));
    return this.progress.mistakes().filter((key) => keys.has(key)).length;
  });

  protected readonly units = computed(() => {
    const results = this.progress.lessons();
    const tasksDone = this.progress.tasks();
    const lessons = allLessons(this.chapter());
    const firstOpen = lessons.findIndex((lesson) => !results[lesson.id]);
    let position = 0;

    return (this.plan()?.units ?? []).map((unit) => {
      const nodes = unit.lessons.map((lesson, i) => {
        const index = position++;
        const result = results[lesson.id];
        // The first lesson of every unit (= study day) is always open; inside a unit, lessons unlock in order.
        const unlocked = i === 0 || !!results[unit.lessons[i - 1].id];
        const state: NodeState = result ? 'done' : index === firstOpen ? 'current' : unlocked ? 'open' : 'locked';
        const count = itemsOfSets(this.chapter(), lesson.setIds).length;
        return {
          lesson,
          state,
          perfect: !!result?.perfect,
          meta: LESSON_META[lesson.kind],
          offset: OFFSETS[index % OFFSETS.length],
          questions: lesson.kind === 'review' ? Math.min(REVIEW_SIZE, count) : count,
        };
      });
      const done = nodes.filter((n) => n.state === 'done').length;
      const tasks = (unit.tasks ?? []).map((task) => ({ task, done: !!tasksDone[task.id] }));
      return { unit, nodes, done, ratio: nodes.length ? done / nodes.length : 0, tasks };
    });
  });

  protected readonly overall = computed(() => {
    const units = this.units();
    const total = units.reduce((sum, u) => sum + u.nodes.length, 0);
    const done = units.reduce((sum, u) => sum + u.done, 0);
    return { total, done, ratio: total ? done / total : 0 };
  });

  protected toggleTask(id: string): void {
    this.progress.toggleTask(id);
  }

  protected reset(): void {
    const plan = this.plan();
    if (!plan) return;
    this.progress.resetPath(
      allLessons(this.chapter()).map((l) => l.id),
      plan.units.flatMap((u) => u.tasks ?? []).map((t) => t.id),
      this.chapter().exercises.map((s) => s.id),
    );
  }
}
