import { GrammarTopic } from '../../core/models';

export const grammar: readonly GrammarTopic[] = [
  {
    id: 'brauchen-zu', title: 'nicht / kein / nur + brauchen + zu',
    summary: 'Nicht müssen = nicht brauchen … zu. Nur eine Sache ist nötig.',
    blocks: [
      { kind: 'text', text: 'Mit *brauchen + zu + Infinitiv* sprechen wir über Notwendigkeit. Im Kurs üben wir die Formen mit *nicht*, *kein* und *nur*. English: do not need to / only need to. العربية: لا تحتاج إلى / تحتاج فقط إلى.' },
      { kind: 'rule', title: 'Die Satzklammer', lines: [
        'Subjekt + konjugiertes *brauchen* + nicht / nur + … + *zu + Infinitiv*.',
        '*kein* verneint ein Nomen: Du brauchst *keine Angst* zu haben.',
        'Bei trennbaren Verben steht zu zwischen Vorsilbe und Verb: *aufzustehen*, *anzurufen*.',
        'ich brauche · du brauchst · er/sie/es braucht · wir brauchen · ihr braucht · sie/Sie brauchen.',
      ] },
      { kind: 'table', head: ['mit müssen', 'mit brauchen'], rows: [
        ['Du musst nicht warten.', 'Du *brauchst* nicht *zu warten*.'],
        ['Sie müssen nur klingeln.', 'Sie *brauchen* nur *zu klingeln*.'],
        ['Du musst keine Angst haben.', 'Du *brauchst* keine Angst *zu haben*.'],
        ['Du musst nicht aufstehen.', 'Du *brauchst* nicht *aufzustehen*.'],
      ] },
      { kind: 'tip', text: '*nicht müssen* heißt: Es ist nicht nötig. *nicht dürfen* heißt: Es ist verboten! „Du brauchst nicht zu kommen“ = you do not have to come. Für die schriftliche Prüfung *zu* nicht vergessen.' },
      { kind: 'examples', items: ['Wenn du Hilfe möchtest, brauchst du nur *anzurufen*.', 'Sie braucht heute keine Medikamente *zu nehmen*.', 'Ihr braucht euch nicht *zu beeilen*.', 'Wir brauchen nicht zu kochen, *weil* noch Essen da ist.'] },
    ],
  },
  {
    id: 'reflexive-verben', title: 'Reflexive Verben: Akkusativ oder Dativ?',
    summary: 'Ich wasche mich. Ich wasche mir die Hände.',
    blocks: [
      { kind: 'text', text: 'Das Reflexivpronomen bezieht sich auf das Subjekt: Ich wasche *mich* selbst. Bei Körperpflege vergleichen wir die Handlung allein mit der Handlung an einem Körperteil. العربية: الضمير الانعكاسي يعود على الفاعل.' },
      { kind: 'table', caption: 'Reflexivpronomen', head: ['Person', 'Akkusativ', 'Dativ'], rows: [['ich', 'mich', 'mir'], ['du', 'dich', 'dir'], ['er / sie / es', 'sich', 'sich'], ['wir', 'uns', 'uns'], ['ihr', 'euch', 'euch'], ['sie / Sie', 'sich', 'sich']] },
      { kind: 'rule', title: 'So entscheidest du', lines: [
        'Lerne das Verb mit seinem Muster: *sich freuen*, *sich beeilen*, *sich interessieren für + A*.',
        'Bei waschen, anziehen, kämmen: ohne zusätzliches Akkusativobjekt → Reflexivpronomen im *Akkusativ*.',
        'Mit einem zusätzlichen Akkusativobjekt → Reflexivpronomen im *Dativ*: Ich wasche *mir* *die Hände*.',
        'Nur bei ich und du sieht man hier einen Unterschied: *mich → mir*, *dich → dir*.',
      ] },
      { kind: 'examples', title: 'Vergleiche', items: ['Ich ziehe *mich* an. / Ich ziehe *mir einen Pullover* an.', 'Du wäschst *dich*. / Du wäschst *dir das Gesicht*.', 'Ich stelle *mich* vor. = Ich sage meinen Namen.', 'Ich stelle *mir ein Konzert* vor. = Ich denke an ein Konzert.', 'Ich habe *mich* ausgeruht. / Ich habe *mir die Haare* gekämmt.'] },
      { kind: 'rule', title: 'Position im Satz', lines: ['Ich *freue mich* auf das Konzert.', 'Heute *freue ich mich* auf das Konzert.', 'Mit Personalpronomen als Subjekt: …, weil *ich mich* freue.', 'Perfekt: Sie *hat sich* gestern *gemeldet*. Modalverb: Du *musst dich* ausruhen.'] },
      { kind: 'tip', text: 'Nicht jedes Verb mit einem weiteren Objekt folgt automatisch derselben Regel. Lerne feste Muster wie *sich etwas merken* (Dativ) und *sich für etwas interessieren* (Akkusativ; für leitet eine Präpositionalgruppe ein).' },
    ],
  },
  {
    id: 'zweiteilige-konnektoren', title: 'Zweiteilige Konnektoren',
    summary: 'Beides, Alternative, Verneinung oder Gegensatz? Sechs wichtige Paare.',
    blocks: [
      { kind: 'table', head: ['Konnektor', 'Bedeutung / meaning / المعنى', 'Beispiel'], rows: [
        ['sowohl … als auch …', 'beides / both … and / كلاهما', 'Ich höre *sowohl* Jazz *als auch* Pop.'],
        ['nicht nur …, sondern auch …', 'beides, zweite Information betont / not only … but also / ليس فقط بل أيضًا', 'Sie singt *nicht nur*, *sondern* spielt *auch* Gitarre.'],
        ['entweder … oder …', 'Alternative / either … or / إما … أو', 'Wir gehen *entweder* ins Kino *oder* ins Theater.'],
        ['weder … noch …', 'beides nicht / neither … nor / لا … ولا', 'Ich mag *weder* Rock *noch* Techno.'],
        ['zwar …, aber …', 'Einschränkung / admittedly … but / صحيح أن … لكن', 'Das Konzert ist *zwar* gut, *aber* teuer.'],
        ['einerseits …, andererseits …', 'zwei Seiten / on the one hand … on the other / من جهة … ومن جهة أخرى', '*Einerseits* liebe ich Musik, *andererseits* brauche ich Ruhe.'],
      ] },
      { kind: 'rule', title: 'Satzbau und Kommas', lines: [
        '*sowohl … als auch* verbindet meistens parallele Satzteile: zwei Nomen, zwei Adjektive oder zwei Tätigkeiten.',
        'Vor *sondern*, *aber* und zwischen den Hauptsätzen mit *einerseits … andererseits* steht ein Komma.',
        'Bei einfachen Verbindungen mit *sowohl … als auch*, *weder … noch*, *entweder … oder* brauchst du kein Komma.',
        '*aber*, *oder* und *sondern* stehen außerhalb der Positionen des Hauptsatzes: …, aber *ich höre* lieber Jazz.',
        '*andererseits* und *noch* besetzen Position 1, wenn sie einen neuen Hauptsatz beginnen: andererseits *brauche ich* Ruhe; noch *spiele ich* Klavier.',
        'Gleiche Satzteile kannst du weglassen: Ich spiele nicht nur Klavier, sondern auch Gitarre.',
      ] },
      { kind: 'examples', title: 'Zwei ganze Hauptsätze', items: ['Ich höre weder Radio noch *sehe ich* fern.', '*Einerseits möchte ich* zum Konzert gehen, *andererseits muss ich* lernen.', 'Ich höre *zwar* gern Musik, *aber ich kann* dabei nicht lernen.', 'Entweder *gehen wir* spazieren oder *wir bleiben* zu Hause.'] },
      { kind: 'tip', text: '*weder … noch* ist schon negativ: kein zusätzliches „nicht“. Bei Satzbau-Aufgaben hilft: Konnektor erkennen → Subjekt suchen → konjugiertes Verb auf Position 2 setzen. Nebensätze in den Satzteilen können zusätzliche Kommas nötig machen.' },
    ],
  },
  {
    id: 'hilfe-und-rat', title: 'Hilfe anbieten, annehmen, ablehnen und raten',
    summary: 'Redemittel für Gespräche im Krankenhaus und im Alltag.',
    blocks: [
      { kind: 'table', head: ['Funktion', 'Redemittel'], rows: [
        ['Hilfe anbieten', 'Kann ich etwas für dich tun? / Brauchen Sie Hilfe?'],
        ['Hilfe annehmen', 'Ja, das wäre sehr nett. / Gern, vielen Dank.'],
        ['Hilfe ablehnen', 'Nein, danke. Das ist nicht nötig.'],
        ['Rat geben', 'Du solltest dich ausruhen. / Ich rate Ihnen, vorsichtig zu sein.'],
        ['Warnen', 'Seien Sie vorsichtig! / Ich muss Sie warnen.'],
      ] },
      { kind: 'rule', title: 'du oder Sie?', lines: ['du: *Kann ich dir helfen?* / *Ruh dich aus!*', 'Sie: *Kann ich Ihnen helfen?* / *Ruhen Sie sich aus!*', 'Nach *solltest* kommt der Infinitiv ohne zu: Du solltest mehr trinken.', 'Nach *raten* kannst du einen zu-Infinitiv benutzen: Ich rate dir, mehr zu schlafen.'] },
      { kind: 'examples', title: 'Mini-Dialog zum Üben', items: ['A: Du siehst müde aus. Kann ich dir etwas bringen?', 'B: Ja, ein Glas Wasser wäre nett. Danke!', 'A: Gern. Du brauchst nur zu fragen.', 'B: Danke. Danach möchte ich mich etwas ausruhen.'] },
    ],
  },
  {
    id: 'informationen-weitergeben', title: 'Informationen einfach weitergeben',
    summary: 'Eine kurze Zusammenfassung und die eigene Meinung schreiben.',
    blocks: [
      { kind: 'rule', title: 'Vom Text zur Zusammenfassung', lines: ['Lies den Text und markiere *Kernaussagen*.', 'Lass lange Beispiele und unwichtige Einzelheiten weg.', 'Nutze einfache Wörter: *empfinden → fühlen*, *beeinflussen → verändern*.', 'Schreibe kurze Sätze in *eigenen Worten*. Erfinde keine Informationen.', 'Trenne den Inhalt des Textes von deiner eigenen Meinung.'] },
      { kind: 'examples', title: 'Nützliche Satzanfänge', items: ['In dem Text geht es um …', 'Die wichtigste Information ist, dass …', 'Im Text steht außerdem, dass …', 'Zusammenfassend kann man sagen, dass …', 'Meiner Meinung nach … / Ich denke, dass …', 'Ich stimme dir zu. / Das sehe ich anders, weil …'] },
      { kind: 'text', text: '*Übung:* Schreibe einer Person, die im Kurs gefehlt hat, 80–100 Wörter über einen Text aus dem Unterricht. Erkläre drei wichtige Informationen mit einfachen Wörtern. Ergänze deine Meinung mit einem zweiteiligen Konnektor. Diese Länge ist eine Übungsempfehlung, keine bestätigte Prüfungsvorgabe.' },
      { kind: 'tip', text: 'Kontrolle: Alle Aufgabenpunkte beantwortet? Passende Anrede und Schluss? Verbposition richtig? Sätze verbunden? Prüfe besonders Reflexivpronomen und zweiteilige Konnektoren.' },
    ],
  },
];
