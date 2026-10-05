import { Chapter } from '../../core/models';
import { exercises } from './exercises';
import { grammar } from './grammar';
import { vocabulary } from './vocabulary';

export const kapitel09: Chapter = {
  id: 'kapitel-9',
  number: 9,
  title: 'Kunststücke',
  subtitle: 'Kunst entdecken, beschreiben und bewerten',
  goals: [
    'über Kunst, Literatur, Theater und Musik sprechen',
    'ganze Sätze und einzelne Satzteile mit nicht verneinen',
    'Informationen mit nicht / kein … sondern korrigieren',
    'Adjektive mit und ohne Artikel deklinieren',
    'Aussagen verstärken oder relativieren und nachfragen',
    'Anzeigen und Nachrichten schreiben und Wortfamilien erkennen',
  ],
  grammar,
  exercises,
  vocabulary,
};
