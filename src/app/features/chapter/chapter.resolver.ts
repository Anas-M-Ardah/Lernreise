import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { Chapter } from '../../core/models';
import { ChapterService } from '../../core/services/chapter.service';

/** Resolves `:chapterId` to its chapter, or redirects home for unknown ids. */
export const chapterResolver: ResolveFn<Chapter> = (route) => {
  const chapter = inject(ChapterService).find(route.paramMap.get('chapterId') ?? undefined);
  return chapter ?? new RedirectCommand(inject(Router).parseUrl('/'));
};
