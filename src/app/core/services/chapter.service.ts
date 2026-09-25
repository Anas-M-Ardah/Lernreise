import { Injectable } from '@angular/core';
import { CHAPTERS, UPCOMING_CHAPTERS } from '../../data/chapters';
import { Chapter, VocabCard } from '../models';
import { slugify } from '../utils/text';

@Injectable({ providedIn: 'root' })
export class ChapterService {
  readonly chapters = CHAPTERS;
  readonly upcoming = UPCOMING_CHAPTERS;

  find(id: string | undefined): Chapter | undefined {
    return this.chapters.find((chapter) => chapter.id === id);
  }

  cardsOf(chapter: Chapter): VocabCard[] {
    return chapter.vocabulary.flatMap((category) =>
      category.entries.map((entry) => ({
        ...entry,
        categoryId: category.id,
        id: `${chapter.id}:${slugify([entry.article, entry.term, entry.pattern].filter(Boolean).join(' '))}`,
      })),
    );
  }

  questionCount(chapter: Chapter): number {
    return chapter.exercises.reduce((sum, set) => sum + set.questions.length, 0);
  }

  wordCount(chapter: Chapter): number {
    return chapter.vocabulary.reduce((sum, category) => sum + category.entries.length, 0);
  }
}
