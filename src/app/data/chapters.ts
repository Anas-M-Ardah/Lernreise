import { Chapter, UpcomingChapter } from '../core/models';
import { kapitel07 } from './kapitel-07';
import { kapitel08 } from './kapitel-08';
import { kapitel09 } from './kapitel-09';

/** Add a new chapter here once its data folder exists. */
export const CHAPTERS: readonly Chapter[] = [kapitel07, kapitel08, kapitel09];

export const UPCOMING_CHAPTERS: readonly UpcomingChapter[] = [
  { number: 10, title: 'Miteinander' },
  { number: 11, title: 'Stadt, Land, Fluss' },
  { number: 12, title: 'Geld regiert die Welt?' },
];
