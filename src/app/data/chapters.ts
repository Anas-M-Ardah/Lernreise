import { Chapter, UpcomingChapter } from '../core/models';
import { kapitel07 } from './kapitel-07';
import { kapitel08 } from './kapitel-08';
import { kapitel09 } from './kapitel-09';
import { kapitel10 } from './kapitel-10';
import { kapitel11 } from './kapitel-11';
import { kapitel12 } from './kapitel-12';

/** Add a new chapter here once its data folder exists. */
export const CHAPTERS: readonly Chapter[] = [kapitel07, kapitel08, kapitel09, kapitel10, kapitel11, kapitel12];

export const UPCOMING_CHAPTERS: readonly UpcomingChapter[] = [];
