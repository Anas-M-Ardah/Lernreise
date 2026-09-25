import { GrammarTopic } from '../../core/models';

export const grammar: readonly GrammarTopic[] = [
  {
    id: 'plusquamperfekt',
    title: 'Plusquamperfekt',
    summary: 'Über die Vorvergangenheit sprechen: Was ist noch früher passiert?',
    blocks: [
      {
        kind: 'text',
        text: 'Wenn wir über die Vergangenheit erzählen, brauchen wir manchmal eine Zeit für das, was *davor* passiert ist. Das ist das Plusquamperfekt – die „Vergangenheit der Vergangenheit“.',
      },
      {
        kind: 'timeline',
        steps: [
          {
            label: 'Noch früher',
            tense: 'plusquamperfekt',
            example: 'Wir *hatten* uns fast jeden Tag *getroffen*.',
          },
          {
            label: 'Früher',
            tense: 'praeteritum',
            example: 'Wir *verloren* uns aus den Augen.',
          },
          {
            label: 'Heute',
            tense: 'praesens',
            example: 'Wir *fahren* gemeinsam an die Ostsee.',
          },
        ],
      },
      {
        kind: 'rule',
        title: 'Regel',
        lines: [
          'Was in der Vergangenheit *zuerst* passiert (1): *Plusquamperfekt*',
          'Was in der Vergangenheit *danach* passiert (2): *Präteritum / Perfekt*',
          'Bildung: *hatte / war* (Präteritum von haben / sein) + *Partizip II*',
        ],
      },
      {
        kind: 'table',
        caption: 'Konjugation',
        head: ['Person', 'mit haben', 'mit sein'],
        rows: [
          ['ich', '*hatte* gesehen', '*war* gefahren'],
          ['du', '*hattest* gesehen', '*warst* gefahren'],
          ['er / sie / es', '*hatte* gesehen', '*war* gefahren'],
          ['wir', '*hatten* gesehen', '*waren* gefahren'],
          ['ihr', '*hattet* gesehen', '*wart* gefahren'],
          ['sie / Sie', '*hatten* gesehen', '*waren* gefahren'],
        ],
      },
      {
        kind: 'tip',
        text: '*haben* oder *sein*? Genau wie im Perfekt: Bewegung und Veränderung (fahren, umziehen, werden, passieren) + *sein*, fast alle anderen Verben + *haben*.',
      },
      {
        kind: 'examples',
        title: 'Beispiele aus dem Kurs',
        items: [
          'Ich *war* nach Frankfurt *gezogen*, aber ich *hatte* keine anderen Studierenden *kennengelernt*.',
          'Die meisten Studenten *hatten* den Test nicht *bestanden*. Die Lehrerin war sauer.',
          'Wir *hatten* vorher ein Hotel *reserviert*, deshalb fanden wir schnell ein Zimmer.',
          'Nach dem Masterabschluss *hatte* ich ein Praktikum *gemacht*. 2019 zog ich nach Jordanien um.',
        ],
      },
    ],
  },
  {
    id: 'nachdem',
    title: 'Nebensätze mit nachdem',
    summary: 'Zwei Handlungen nacheinander: zuerst A, danach B.',
    blocks: [
      {
        kind: 'text',
        text: '*nachdem* leitet einen Nebensatz ein. Der Nebensatz beschreibt die Handlung, die *zuerst* passiert ist. Das Verb steht am Ende.',
      },
      {
        kind: 'clauses',
        title: 'Satzstruktur',
        sentences: [
          [
            { type: 'NS', text: 'Nachdem Matilda ihr Studium abgeschlossen *hatte*,', tense: 'plusquamperfekt' },
            { type: 'HS', text: '*fand* sie eine Stelle in Freiburg.', tense: 'praeteritum' },
          ],
          [
            { type: 'NS', text: 'Nachdem sie in Freiburg neue Freunde gefunden *hat*,', tense: 'perfekt' },
            { type: 'HS', text: '*gefällt* es ihr dort sehr gut.', tense: 'praesens' },
          ],
          [
            { type: 'HS', text: 'Sie *fühlte* sich oft einsam,', tense: 'praeteritum' },
            { type: 'NS', text: 'nachdem sie umgezogen *war*.', tense: 'plusquamperfekt' },
          ],
        ],
      },
      {
        kind: 'rule',
        title: 'Zeitenfolge',
        lines: [
          'Nebensatz: *Plusquamperfekt* → Hauptsatz: *Präteritum / Perfekt*',
          'Nebensatz: *Perfekt* → Hauptsatz: *Präsens*',
          'Der Nebensatz ist immer eine Zeitstufe *früher* als der Hauptsatz.',
        ],
      },
      {
        kind: 'tip',
        text: 'Steht der Nebensatz vorne, beginnt der Hauptsatz direkt mit dem *Verb* (Position 2): „Nachdem …, *fand* sie …“',
      },
    ],
  },
  {
    id: 'temporalsaetze',
    title: 'Temporalsätze mit seit(dem), während, bis, bevor',
    summary: 'Wann? Wie lange? Gleichzeitig oder vorher? Die wichtigsten temporalen Konnektoren.',
    blocks: [
      {
        kind: 'text',
        text: 'Alle diese Konnektoren leiten einen *Nebensatz* ein und geben eine *Zeit*-Information. Das konjugierte Verb steht am Ende des Nebensatzes.',
      },
      {
        kind: 'connectors',
        items: [
          {
            word: 'seit / seitdem',
            meaning: 'Start einer Situation, die bis heute andauert. Der Hauptsatz steht meistens im Präsens.',
            english: 'since',
            arabic: 'منذ أن',
            tenses: ['Perfekt / Präteritum + Präsens', 'Präsens + Präsens'],
            example: '*Seitdem* ich ins Ausland umgezogen *bin*, spreche ich viel besser Englisch.',
          },
          {
            word: 'während',
            meaning: 'Zwei Aktionen oder Situationen passieren gleichzeitig.',
            english: 'while',
            arabic: 'بينما، عندما',
            tenses: ['Präsens + Präsens', 'Präteritum + Präteritum'],
            example: '*Während* ich *lerne*, höre ich oft klassische Musik.',
          },
          {
            word: 'bis',
            meaning: 'Eine Handlung dauert bis zu einem bestimmten Zeitpunkt oder Ereignis.',
            english: 'until',
            arabic: 'حتى، إلى أن',
            tenses: ['Präsens + Präsens', 'Präteritum + Präteritum'],
            example: 'Ich kann warten, *bis* du fertig *bist*.',
          },
          {
            word: 'bevor',
            meaning: 'Eine Aktion passiert vor einer anderen Aktion.',
            english: 'before',
            arabic: 'قبل أن',
            tenses: ['Präsens + Präsens', 'Präteritum + Plusquamperfekt'],
            example: '*Bevor* ich zur Arbeit *gehe*, frühstücke ich in einer kleinen Bäckerei.',
          },
          {
            word: 'nachdem',
            meaning: 'Eine Aktion passiert nach einer anderen Aktion (siehe oben).',
            english: 'after',
            arabic: 'بعد أن',
            tenses: ['Plusquamperfekt + Präteritum', 'Perfekt + Präsens'],
            example: '*Nachdem* ich das Abitur bestanden *hatte*, entschloss ich mich für ein Studium im Ausland.',
          },
        ],
      },
      {
        kind: 'examples',
        title: 'Beispiele aus dem Kurs',
        items: [
          '*Seit* Florian *jobbt*, gibt er viel Geld aus.',
          'Es dauert nicht mehr lange, *bis* das Essen fertig *ist*.',
          'Jenny möchte sich ausruhen, *während* Mark seine Freunde *trifft*.',
          '*Bevor* Julia *putzt*, macht sie einen Kaffee.',
        ],
      },
      {
        kind: 'table',
        caption: 'Aus Präpositionen werden Nebensätze',
        head: ['Präposition', 'Konnektor', 'Beispiel'],
        rows: [
          ['seit + D', 'seit(dem)', 'Seit ihrem ersten Treffen … → *Seit* sie sich zum ersten Mal getroffen haben, …'],
          ['während + G', 'während', 'Während des Kinobesuchs … → *Während* sie im Kino waren, …'],
          ['bis zu + D', 'bis', 'Bis zur Hochzeit … → *Bis* sie geheiratet haben, …'],
          ['vor + D', 'bevor', 'Vor dem Essen … → *Bevor* wir essen, …'],
          ['nach + D', 'nachdem', 'Nach dem Studium … → *Nachdem* sie studiert hatte, …'],
        ],
      },
      {
        kind: 'tip',
        text: '*seit* und *seitdem* bedeuten dasselbe. Achtung: *während* und *seit* sind auch Präpositionen – nach der Präposition kommt ein Nomen, nach dem Konnektor ein ganzer Satz.',
      },
    ],
  },
];
