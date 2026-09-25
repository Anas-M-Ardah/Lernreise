import { Chapter, UpcomingChapter } from '../core/models';
import { kapitel07 } from './kapitel-07';

/** Add a new chapter here once its data folder exists. */
export const CHAPTERS: readonly Chapter[] = [kapitel07];

export const UPCOMING_CHAPTERS: readonly UpcomingChapter[] = [
  { number: 8, title: 'Rund um Körper und Geist' },
  { number: 9, title: 'Kunststücke' },
  { number: 10, title: 'Miteinander' },
  { number: 11, title: 'Stadt, Land, Fluss' },
  { number: 12, title: 'Geld regiert die Welt?' },
];
