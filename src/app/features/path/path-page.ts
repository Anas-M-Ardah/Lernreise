import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DAILY_GOAL_XP, PathProgressService } from '../../core/services/path-progress.service';
import { Icon } from '../../shared/ui/icon/icon';
import { ProgressRing } from '../../shared/ui/progress-ring/progress-ring';
import { PATH_LESSONS, PATH_UNITS } from './path-lessons';

/** Horizontal offsets (in node widths) that make the lesson path wind like a trail. */
const WIGGLE = [0, 0.7, 1.1, 0.7, 0, -0.7, -1.1, -0.7];

@Component({
  selector: 'app-path-page',
  imports: [RouterLink, Icon, ProgressRing],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './path-page.html',
  styleUrl: './path-page.scss',
})
export class PathPage {
  protected readonly progress = inject(PathProgressService);
  protected readonly dailyGoal = DAILY_GOAL_XP;

  /** The first lesson not yet completed — highlighted as "Start". */
  protected readonly nextLessonId = computed(() => {
    const done = this.progress.lessons();
    return PATH_LESSONS.find((lesson) => done[lesson.id] === undefined)?.id;
  });

  protected readonly completed = computed(() => PATH_LESSONS.filter((l) => this.progress.lessons()[l.id] !== undefined).length);
  protected readonly total = PATH_LESSONS.length;

  protected readonly units = computed(() => {
    const done = this.progress.lessons();
    return PATH_UNITS.map((unit) => ({
      ...unit,
      done: unit.lessons.filter((l) => done[l.id] !== undefined).length,
      nodes: unit.lessons.map((lesson, i) => {
        const best = done[lesson.id];
        return {
          lesson,
          offset: WIGGLE[i % WIGGLE.length],
          completed: best !== undefined,
          stars: best === undefined ? 0 : best >= 0.95 ? 3 : best >= 0.75 ? 2 : 1,
        };
      }),
    }));
  });

  protected readonly dailyProgress = computed(() => Math.min(1, this.progress.todayXp() / DAILY_GOAL_XP));
}
