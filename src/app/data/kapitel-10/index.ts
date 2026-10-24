import { Chapter } from '../../core/models';
import { exercises } from './exercises';
import { grammar } from './grammar';
import { vocabulary } from './vocabulary';

export const kapitel10: Chapter = {
  id: 'kapitel-10',
  number: 10,
  title: 'Miteinander',
  subtitle: 'Werte, Engagement, Institutionen und Europa',
  goals: [
    'über Werte und soziales Engagement sprechen',
    'Vorgänge im Passiv Präsens, Präteritum und Perfekt beschreiben',
    'mit Passiv und Modalverb sagen, was gemacht werden muss, kann oder darf',
    'über Institutionen in der Stadt sprechen',
    'Meinungen äußern, widersprechen und mit Partikeln nachfragen',
    'eine kurze Präsentation halten und Fragen dazu stellen',
  ],
  grammar,
  exercises,
  vocabulary,
};
