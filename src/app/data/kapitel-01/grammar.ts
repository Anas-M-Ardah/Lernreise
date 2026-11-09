import { GrammarTopic } from '../../core/models';

export const grammar: readonly GrammarTopic[] = [
  {
    id: 'sich-vorstellen',
    title: 'Sich vorstellen',
    summary: 'Über Familie, Wohnen, Arbeit, Freizeit und Sprachen berichten (LB S. 8–9, AB S. 88).',
    blocks: [
      {
        kind: 'text',
        text: 'Auf der Auftaktseite erzählen sechs Personen (A–F) kurz von sich. Jeder Text hat ein Hauptthema. Mit denselben Themen kannst du dich selbst vorstellen.',
      },
      {
        kind: 'table',
        caption: 'Die Kurztexte A–F',
        head: ['Person', 'Thema', 'Das Wichtigste'],
        rows: [
          ['A', 'Familie', 'seit drei Jahren *geschieden*, *alleinerziehende* Mutter, Tochter Klara (4)'],
          ['B', 'Wohnen / Heimat', 'Berlinerin, Menschen „aus allen Ecken der Welt“, *vermisst* Berlin'],
          ['C', 'Wohnen / Arbeit', 'in einer Kleinstadt *aufgewachsen*, *wegen* einer neuen Stelle nach Wien'],
          ['D', 'Sprachen', 'zu Hause Arabisch, in Deutschland geboren → zwei *Muttersprachen*'],
          ['E', 'Freizeit / Sport', 'schwimmen, Eishockey, größte *Leidenschaft*: Fußball (BVB)'],
          ['F', 'Ausbildung / Arbeit', '*Ausbildung als* Schornsteinfeger, kleiner *Betrieb*'],
        ],
      },
      {
        kind: 'rule',
        title: 'Redemittel',
        lines: [
          'Familie: Ich bin *verheiratet / ledig / geschieden* und habe … Kinder.',
          'Wohnen: Ich bin in … *aufgewachsen*. *Seit* … Jahren wohne ich in …',
          'Arbeit: Ich *arbeite als* … / Ich mache *eine Ausbildung als* … / Ich studiere …',
          'Freizeit: In meiner Freizeit … / Meine größte *Leidenschaft* ist …',
          'Sprachen: Meine *Muttersprache* ist … Außerdem spreche ich …',
        ],
      },
      {
        kind: 'tip',
        text: '*seit* + Dativ = bis heute (seit drei Jahren). *vor* + Dativ = Zeitpunkt in der Vergangenheit (vor zwei Jahren). *wegen* + Genitiv = Grund (wegen einer neuen Stelle).',
      },
    ],
  },
  {
    id: 'gelebte-traeume',
    title: 'Gelebte Träume – der Text',
    summary: 'Leonie, Georg und Matthias: Traum, früher, jetzt (LB S. 10–11 Üb. 3).',
    blocks: [
      {
        kind: 'text',
        text: 'Der Artikel stellt drei Menschen vor, die einen großen Traum hatten. Für Üb. 3a notierst du zu jeder Person: *Wer? Traum? Situation früher? Situation jetzt?*',
      },
      {
        kind: 'table',
        caption: 'Stichpunkte zum Text',
        head: ['Wer?', 'Traum?', 'Früher', 'Jetzt'],
        rows: [
          ['Leonie Walter (23)', 'erfolgreiche Sängerin, Nummer eins in den Charts', 'Gesangs- und Tanzunterricht, Castingshow, Band, berühmt – dann Trennung', 'jobbt im Coffee Shop, hat eine neue Band, gibt nicht auf'],
          ['Georg Schröder (44)', 'die Wüsten der Erde kennenlernen', 'Dorf bei Innsbruck, Eltern wollten einen Lehrer, Studium: Geschichte + Völkerkunde', 'Experte für Abenteuer und Grenzerfahrungen'],
          ['Matthias Holzner (38)', 'Profifußballer', 'jede freie Minute auf dem Fußballplatz, mit 16 zu einem großen Verein, Knieverletzung', 'Physiotherapeut mit eigener Praxis, trainiert eine Kindermannschaft'],
        ],
      },
      {
        kind: 'examples',
        title: 'Wichtige Ausdrücke aus dem Text',
        items: [
          'Der Anfangseuphorie folgte bald die *Ernüchterung*.',
          'Leonie *verdient ihren Lebensunterhalt* in einem Coffee Shop.',
          'Georg *verwirklichte seinen Traum*, die Wüsten dieser Erde kennenzulernen.',
          'Matthias musste den Traum *schweren Herzens aufgeben*.',
          'Samstags geht er ins Stadion, um seinen alten Verein *anzufeuern*.',
        ],
      },
    ],
  },
  {
    id: 'tempusformen',
    title: 'Über Vergangenes berichten',
    summary: 'Wann benutzt man Perfekt, Präteritum oder Plusquamperfekt? (LB S. 11 Üb. 4b)',
    blocks: [
      {
        kind: 'timeline',
        steps: [
          { label: 'Noch früher', tense: 'plusquamperfekt', example: 'Nachdem sich Matthias am Knie *verletzt hatte*, …' },
          { label: 'Früher', tense: 'praeteritum', example: '… *musste* er den Traum *aufgeben*.' },
          { label: 'Erzählt', tense: 'perfekt', example: '„Ich *habe* meinen Weg *gefunden*.“' },
          { label: 'Heute', tense: 'praesens', example: 'Er *trainiert* eine Kindermannschaft.' },
        ],
      },
      {
        kind: 'rule',
        title: 'Regeln (Üb. 4b)',
        lines: [
          'mündlich berichten: meistens *Perfekt*',
          'schriftlich in E-Mails / Briefen: meistens *Perfekt*',
          'schriftlich in Zeitungsartikeln / Romanen: meistens *Präteritum*',
          '*haben*, *sein* und Modalverben: meistens *Präteritum* (auch mündlich)',
          'ein Ereignis *vor* einem anderen Ereignis in der Vergangenheit: *Plusquamperfekt*',
        ],
      },
      {
        kind: 'clauses',
        title: 'Beispiele aus dem Text',
        sentences: [
          [{ type: 'HS', text: 'Leonie *nahm* an einer Castingshow *teil*.', tense: 'praeteritum' }],
          [{ type: 'HS', text: '„Ich *habe* viele Landschaften *ausprobiert*.“', tense: 'perfekt' }],
          [
            { type: 'NS', text: 'Nachdem sich Matthias schwer am Knie *verletzt hatte*,', tense: 'plusquamperfekt' },
            { type: 'HS', text: '*musste* er den Traum von der Profikarriere *aufgeben*.', tense: 'praeteritum' },
          ],
        ],
      },
    ],
  },
  {
    id: 'praeteritum',
    title: 'Präteritum',
    summary: 'Regelmäßige und unregelmäßige Verben (Grammatik-Rückschau LB S. 21).',
    blocks: [
      {
        kind: 'rule',
        title: 'Bildung',
        lines: [
          'regelmäßig: Verbstamm + *-te-* + Endung (träumen → *träumte*, fragen → *fragte*)',
          'Stamm auf -d / -t / -n nach Konsonant: *-ete-* (arbeiten → *arbeitete*, eröffnen → *eröffnete*)',
          'unregelmäßig: Präteritumstamm + Endung (wachsen → *wuchs*, kommen → *kam*)',
          'Mischverben: neuer Stamm + -te (bringen → *brachte*, denken → *dachte*, kennen → *kannte*, wissen → *wusste*)',
          '*ich* und *er/sie/es* haben keine Endung: ich kam, er kam',
        ],
      },
      {
        kind: 'table',
        caption: 'Endungen',
        head: ['Person', 'träumen', 'kommen', 'sein'],
        rows: [
          ['ich', 'träum*te*', 'kam', 'war'],
          ['du', 'träum*test*', 'kam*st*', 'war*st*'],
          ['er/sie/es', 'träum*te*', 'kam', 'war'],
          ['wir', 'träum*ten*', 'kam*en*', 'war*en*'],
          ['ihr', 'träum*tet*', 'kam*t*', 'war*t*'],
          ['sie/Sie', 'träum*ten*', 'kam*en*', 'war*en*'],
        ],
      },
      {
        kind: 'tip',
        text: 'Trennbare Verben: Das Präfix steht am Satzende – Georg *wuchs* in einem Dorf *auf*. Modalverben verlieren den Umlaut: können → *konnte*, müssen → *musste*.',
      },
    ],
  },
  {
    id: 'perfekt',
    title: 'Perfekt & Partizip II',
    summary: 'haben/sein + Partizip II und die wichtigsten Verbformen zum Lernen.',
    blocks: [
      {
        kind: 'rule',
        title: 'Bildung',
        lines: [
          '*haben / sein* im Präsens + *Partizip II* am Satzende',
          '*sein* bei Bewegung (fahren, fliegen, gehen, segeln …) und Zustandsveränderung (aufwachsen, werden, sterben …), außerdem *sein, bleiben, passieren*',
          '*haben* bei allen anderen Verben – auch bei *reflexiven* Verben (sich verletzen → hat sich verletzt)',
        ],
      },
      {
        kind: 'table',
        caption: 'Partizip II bilden',
        head: ['Verbtyp', 'regelmäßig', 'unregelmäßig'],
        rows: [
          ['ohne Präfix', 'sagen → *ge*sag*t*', 'nehmen → *ge*nomm*en*'],
          ['trennbar', 'aufhören → auf*ge*hör*t*', 'aufgeben → auf*ge*geb*en*'],
          ['untrennbar (be-, er-, ver- …)', 'verdienen → verdien*t*', 'verstehen → verstand*en*'],
          ['auf -ieren', 'studieren → studier*t*', '–'],
        ],
      },
      {
        kind: 'table',
        caption: 'Formen lernen: Infinitiv – Präteritum – Perfekt',
        head: ['Infinitiv', 'Präteritum', 'Perfekt'],
        rows: [
          ['sein', 'war', 'ist gewesen'],
          ['haben', 'hatte', 'hat gehabt'],
          ['werden', 'wurde', 'ist geworden'],
          ['kommen', 'kam', 'ist gekommen'],
          ['(auf)wachsen', 'wuchs (auf)', 'ist (auf)gewachsen'],
          ['fahren', 'fuhr', 'ist gefahren'],
          ['fliegen', 'flog', 'ist geflogen'],
          ['bleiben', 'blieb', 'ist geblieben'],
          ['nehmen', 'nahm', 'hat genommen'],
          ['(auf)geben', 'gab (auf)', 'hat (auf)gegeben'],
          ['finden', 'fand', 'hat gefunden'],
          ['lesen', 'las', 'hat gelesen'],
          ['bestehen', 'bestand', 'hat bestanden'],
          ['verbringen', 'verbrachte', 'hat verbracht'],
          ['bringen', 'brachte', 'hat gebracht'],
          ['denken', 'dachte', 'hat gedacht'],
          ['kennen', 'kannte', 'hat gekannt'],
          ['wissen', 'wusste', 'hat gewusst'],
          ['verlieren', 'verlor', 'hat verloren'],
          ['beginnen', 'begann', 'hat begonnen'],
        ],
      },
    ],
  },
  {
    id: 'plusquamperfekt',
    title: 'Plusquamperfekt mit nachdem',
    summary: 'Was ist vor einem anderen Ereignis in der Vergangenheit passiert?',
    blocks: [
      {
        kind: 'rule',
        title: 'Bildung',
        lines: [
          '*hatte / war* (Präteritum von haben / sein) + *Partizip II*',
          'Nebensatz mit *nachdem*: Plusquamperfekt – Hauptsatz: Präteritum (oder Perfekt)',
          'Beginnt der Satz mit dem nachdem-Satz, steht das Verb des Hauptsatzes *direkt nach dem Komma*.',
        ],
      },
      {
        kind: 'clauses',
        sentences: [
          [
            { type: 'NS', text: 'Nachdem Georg die Matura *gemacht hatte*,', tense: 'plusquamperfekt' },
            { type: 'HS', text: '*studierte* er Geschichte und Völkerkunde.', tense: 'praeteritum' },
          ],
          [
            { type: 'HS', text: 'Leonie *jobbte* in einem Coffee Shop,', tense: 'praeteritum' },
            { type: 'NS', text: 'nachdem sich die Band *getrennt hatte*.', tense: 'plusquamperfekt' },
          ],
        ],
      },
    ],
  },
];
