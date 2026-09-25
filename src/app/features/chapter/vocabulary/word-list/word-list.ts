import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { VocabCard } from '../../../../core/models';
import { ProgressService } from '../../../../core/services/progress.service';
import { SpeechService } from '../../../../core/services/speech.service';
import { Icon } from '../../../../shared/ui/icon/icon';
import { grammarInfo, spokenForm } from '../vocab-display';

export interface WordGroup {
  readonly title: string;
  readonly cards: readonly VocabCard[];
}

@Component({
  selector: 'app-word-list',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './word-list.html',
  styleUrl: './word-list.scss',
})
export class WordList {
  protected readonly progress = inject(ProgressService);
  protected readonly speech = inject(SpeechService);

  readonly groups = input.required<readonly WordGroup[]>();

  protected readonly grammarInfo = grammarInfo;

  protected speak(card: VocabCard): void {
    this.speech.speak(spokenForm(card));
  }
}
