import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chapter, Question } from '../../../core/models';
import { ProgressService } from '../../../core/services/progress.service';
import { Icon } from '../../../shared/ui/icon/icon';
import { IconName } from '../../../shared/ui/icon/icons';
import { ProgressRing } from '../../../shared/ui/progress-ring/progress-ring';

const KIND_META: Record<Question['kind'], { label: string; icon: IconName }> = {
  choice: { label: 'Auswahl', icon: 'check' },
  gap: { label: 'Lückentext', icon: 'pencil' },
  order: { label: 'Satzbau', icon: 'shuffle' },
};

@Component({
  selector: 'app-exercises-page',
  imports: [RouterLink, Icon, ProgressRing],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './exercises-page.html',
  styleUrl: './exercises-page.scss',
})
export class ExercisesPage {
  private readonly progress = inject(ProgressService);

  readonly chapter = input.required<Chapter>();

  protected readonly sets = computed(() => {
    const scores = this.progress.exercises();
    const topicTitles = new Map(this.chapter().grammar.map((topic) => [topic.id, topic.title]));
    return this.chapter().exercises.map((set) => ({
      set,
      kind: KIND_META[set.questions[0].kind],
      topic: topicTitles.get(set.topicId),
      best: scores[set.id],
    }));
  });
}
