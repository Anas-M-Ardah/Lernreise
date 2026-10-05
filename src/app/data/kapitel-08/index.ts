import { Chapter } from '../../core/models';
import { exercises } from './exercises';
import { grammar } from './grammar';
import { vocabulary } from './vocabulary';

export const kapitel08: Chapter = {
  id: 'kapitel-8',
  number: 8,
  title: 'Rund um Körper und Geist',
  subtitle: 'Gesundheit, Musik, Gefühle und Lernen',
  goals: [
    'im Krankenhaus Hilfe anbieten, annehmen und ablehnen',
    'Reflexivpronomen im Akkusativ und Dativ richtig verwenden',
    'mit brauchen … zu über Notwendigkeit sprechen',
    'Informationen aus Texten einfach weitergeben',
    'mit zweiteiligen Konnektoren Meinungen über Musik und Lernen äußern',
  ],
  grammar,
  exercises,
  vocabulary,
};
