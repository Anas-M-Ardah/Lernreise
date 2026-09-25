import { Chapter } from '../../core/models';
import { exercises } from './exercises';
import { grammar } from './grammar';
import { vocabulary } from './vocabulary';

export const kapitel07: Chapter = {
  id: 'kapitel-7',
  number: 7,
  title: 'Zwischenmenschliches',
  subtitle: 'Freundschaften, Beziehungen und richtig streiten',
  goals: [
    'über zwischenmenschliche Beziehungen im Alltag sprechen',
    'Freundschaftsgeschichten verstehen und selbst erzählen',
    'über die Vergangenheit berichten',
    'Meinungen zum Thema „Streiten“ verstehen und äußern',
  ],
  grammar,
  exercises,
  vocabulary,
};
