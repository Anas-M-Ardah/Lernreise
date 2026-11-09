import { Chapter } from '../../core/models';
import { exercises } from './exercises';
import { grammar } from './grammar';
import { plan } from './plan';
import { vocabulary } from './vocabulary';

export const kapitel01: Chapter = {
  id: 'b13-kapitel-1',
  number: 1,
  course: 'B1.3',
  book: 'Aspekte neu B1+',
  title: 'Leute heute',
  subtitle: 'Kennenlernen, gelebte Träume und Tempusformen',
  goals: [
    'sich vorstellen und über Familie, Wohnen, Arbeit und Freizeit sprechen',
    'einen Text über die Lebensträume verschiedener Personen verstehen',
    'mit Perfekt, Präteritum und Plusquamperfekt über Vergangenes berichten',
    'über eigene Träume sprechen',
  ],
  grammar,
  exercises,
  vocabulary,
  plan,
};
