import { Chapter } from '../../core/models';
import { exercises } from './exercises';
import { grammar } from './grammar';
import { vocabulary } from './vocabulary';

export const kapitel11: Chapter = {
  id: 'kapitel-11',
  number: 11,
  title: 'Stadt, Land, Fluss',
  subtitle: 'Stadtleben, lebenswerte Städte und Diskussionen',
  goals: [
    'über das Leben in der Stadt und auf dem Land sprechen',
    'Relativsätze mit was und wo bilden',
    'Adjektive als Nomen richtig deklinieren',
    'Artikelwörter als Pronomen und irgendein verwenden',
    'in Diskussionen auf Standpunkte eingehen und vermitteln',
    'formelle und informelle E-Mails schreiben',
  ],
  grammar,
  exercises,
  vocabulary,
};
