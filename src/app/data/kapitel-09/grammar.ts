import { GrammarTopic } from '../../core/models';

export const grammar: readonly GrammarTopic[] = [
  {
    id: 'pruefungsplan', title: 'Dein Plan bis Samstag, 10.10.2026',
    summary: 'Test 1: Kapitel 7, 8 und 9 · Hören, Grammatik & Wortschatz, Lesen, Schreiben.',
    blocks: [
      { kind: 'text', text: 'Laut Kursfolie vom 05.10.2026: digitaler Test am *Samstag, 10.10.*, Start *18 Uhr*, Dauer *ca. 90 Minuten*. Wiederholen Sie *Einheit 7, 8 und 9*. Die vier Teile sind Hören, Grammatik & Wortschatz, Lesen und Schreiben. Dieser Lernplan ist ein Vorschlag; die Kursankündigung ist die Quelle für die Testdaten.' },
      { kind: 'table', caption: 'Etwa 60–90 Minuten pro Tag', head: ['Tag', 'Schwerpunkt', 'Konkrete Aufgabe'], rows: [
        ['Montag, 05.10.', 'Kapitel 8: Grundlagen', 'brauchen … zu und Reflexivpronomen lesen; beide Übungssets lösen; 20 Wörter wiederholen.'],
        ['Dienstag, 06.10.', 'Kapitel 8: Konnektoren', 'Alle sechs Paare üben; Satzbau und Lesetraining lösen; kurze Zusammenfassung schreiben.'],
        ['Mittwoch, 07.10.', 'Kapitel 9: Endungen', 'Artikel wiederholen; starke Endungen lernen; beide Adjektivsets lösen; eine Anzeige schreiben.'],
        ['Donnerstag, 08.10.', 'Kapitel 9: Verneinung', 'nicht und sondern üben; Wortfamilien und Lesetraining lösen; eine E-Mail schreiben.'],
        ['Freitag, 09.10.', 'Kapitel 7 + gemischte Wiederholung', 'Plusquamperfekt und Temporalsätze wiederholen; Prüfungsrunden 8 und 9 lösen; Fehler erneut üben.'],
        ['Samstag, 10.10.', 'Leichte Wiederholung', 'Fehlerliste und schwierige Karten ansehen; Technik prüfen und pünktlich zum Test kommen.'],
      ] },
      { kind: 'rule', title: 'Jeden Tag kurz aktiv üben', lines: [
        '*Wortschatz:* 15 Minuten Karten in beide Richtungen abfragen, inklusive Artikel und Plural.',
        '*Hören:* 10–15 Minuten mit einer Kursaufnahme üben. Erst Thema erkennen, dann Details notieren, anschließend kontrollieren. Die App-Kartenaussprache ersetzt keine Hörprüfung.',
        '*Schreiben:* 15–20 Minuten eine Kursaufgabe bearbeiten. Erst allein schreiben, dann Inhalt, Aufbau, Wortschatz, Grammatik und Satzverknüpfung prüfen.',
        '*Fehlerliste:* Schreibe die Regel und einen eigenen richtigen Beispielsatz zu jedem wiederholten Fehler.',
      ] },
      { kind: 'examples', title: 'Zwei eigene Schreibaufgaben', items: [
        'Kapitel 8: Schreibe einer Freundin, die krank ist. Biete Hilfe an, gib einen Rat und erkläre, was sie nicht zu tun braucht. Nutze ein Reflexivverb und einen zweiteiligen Konnektor.',
        'Kapitel 9: Lade einen Freund zu einer Ausstellung ein. Nenne Termin und Treffpunkt, beschreibe die Kunst und begründe deine Meinung. Nutze Adjektive und eine Korrektur mit nicht … sondern.',
      ] },
      { kind: 'tip', text: 'Prüfungsrunden und Lesetexte hier sind selbst erstellte Übungsaufgaben. Sie ergänzen deine Kursunterlagen und sind weder der Originaltest noch eine Vorhersage der Prüfungsfragen.' },
    ],
  },
  {
    id: 'adjektive-ohne-artikel', title: 'Adjektivdeklination ohne Artikel',
    summary: 'Starke Endungen: guter Film, moderne Kunst, mit bunten Farben.',
    blocks: [
      { kind: 'text', text: 'Ohne Artikel zeigt das *Adjektiv* Genus, Numerus und Kasus. Das ist die starke Deklination. Sie ist häufig in Anzeigen und kurzen Nachrichten: „Suche *helles Zimmer*.“ العربية: عند غياب أداة التعريف تحمل نهاية الصفة معلومات الجنس والحالة الإعرابية.' },
      { kind: 'table', caption: 'Starke Adjektivendungen', head: ['Kasus', 'maskulin', 'neutrum', 'feminin', 'Plural'], rows: [
        ['Nominativ', 'gut*er* Film', 'schön*es* Bild', 'modern*e* Kunst', 'bunt*e* Farben'],
        ['Akkusativ', 'gut*en* Film', 'schön*es* Bild', 'modern*e* Kunst', 'bunt*e* Farben'],
        ['Dativ', 'gut*em* Film', 'schön*em* Bild', 'modern*er* Kunst', 'bunt*en* Farben'],
        ['Genitiv', 'gut*en* Films', 'schön*en* Bildes', 'modern*er* Kunst', 'bunt*er* Farben'],
      ] },
      { kind: 'rule', title: 'Drei Schritte', lines: ['1. Artikel des Nomens kennen: *der Film*, *das Bild*, *die Kunst*.', '2. Kasus bestimmen: Subjekt → Nominativ; direktes Objekt → Akkusativ; *mit / von / aus / bei / zu* → Dativ; *für / ohne* → Akkusativ.', '3. Endung aus der Tabelle wählen: *mit schönem Bild*, *für neuen Film*.', 'Mehrere Adjektive erhalten normalerweise dieselbe Endung: *mit frischem, leckerem Obst*.'] },
      { kind: 'examples', items: ['*Junger Künstler* sucht *helles Atelier*.', 'Wir suchen *kreative Personen* mit *guten Ideen*.', 'Ich interessiere mich für *moderne Kunst*.', 'Die Ausstellung zeigt Bilder aus *altem Holz* und *buntem Papier*.', 'Wir tanzen zu *klassischer Musik*.'] },
      { kind: 'tip', text: 'Merke besonders: maskulin Akkusativ *-en*, Dativ *-em / -em / -er / -en*. Im Dativ Plural bekommt das Nomen oft zusätzlich *-n*: mit bunten *Bildern*; aber mit neuen *Fotos*. Genitiv maskulin/neutrum hat beim Adjektiv *-en*, nicht -es.' },
    ],
  },
  {
    id: 'adjektive-mit-artikel', title: 'Wiederholung: Adjektive mit Artikel',
    summary: 'der gute Film · ein guter Film · guter Film.',
    blocks: [
      { kind: 'table', caption: 'Nach bestimmtem Artikel', head: ['Kasus', 'maskulin', 'neutrum', 'feminin', 'Plural'], rows: [
        ['Nom.', 'der gut*e* Film', 'das schön*e* Bild', 'die nett*e* Person', 'die bunt*en* Bilder'],
        ['Akk.', 'den gut*en* Film', 'das schön*e* Bild', 'die nett*e* Person', 'die bunt*en* Bilder'],
        ['Dat.', 'dem gut*en* Film', 'dem schön*en* Bild', 'der nett*en* Person', 'den bunt*en* Bildern'],
      ] },
      { kind: 'table', caption: 'Nach ein / eine', head: ['Kasus', 'maskulin', 'neutrum', 'feminin'], rows: [
        ['Nom.', 'ein gut*er* Film', 'ein schön*es* Bild', 'eine nett*e* Person'],
        ['Akk.', 'einen gut*en* Film', 'ein schön*es* Bild', 'eine nett*e* Person'],
        ['Dat.', 'einem gut*en* Film', 'einem schön*en* Bild', 'einer nett*en* Person'],
      ] },
      { kind: 'rule', title: 'Artikel zuerst prüfen', lines: ['Bestimmter Artikel: meistens *-en*; Nominativ Singular und Akkusativ feminin/neutrum haben *-e*.', 'ein hat bei maskulin Nominativ und neutrum Nom./Akk. keine Endung. Dann trägt das Adjektiv die starke Endung: ein *guter* Film, ein *schönes* Bild.', 'Nach Possessivartikeln und kein gelten die entsprechenden ein-Endungen: mein *guter* Freund, kein *schönes* Bild.', 'Plural mit meine / keine: *meine guten Freunde*, *mit keinen alten Möbeln*. Ohne Artikel: *gute Freunde*, *mit alten Möbeln*.'] },
      { kind: 'tip', text: 'Ein Adjektiv nach *sein* hat keine Deklinationsendung: Das Bild ist *schön*. Vor einem Nomen braucht es eine Endung: ein *schönes Bild*.' },
    ],
  },
  {
    id: 'nicht-position', title: 'Die Position von nicht',
    summary: 'Den ganzen Satz oder einen bestimmten Satzteil verneinen.',
    blocks: [
      { kind: 'text', text: '*nicht* verneint Verben, Adjektive und bestimmte Satzteile. *kein* verneint ein Nomen mit unbestimmtem Artikel oder ohne Artikel: Ich habe *kein Ticket*. English: not / no. العربية: نفي الجملة أو جزء محدد منها.' },
      { kind: 'table', caption: 'Den ganzen Satz verneinen: typische Muster', head: ['Muster', 'Beispiel'], rows: [
        ['Einfaches Verb: oft am Ende', 'Ich kenne den Künstler *nicht*.'],
        ['Perfekt: vor dem Partizip', 'Ich habe den Film *nicht gesehen*.'],
        ['Modalverb: vor dem Infinitiv', 'Ich kann heute *nicht kommen*.'],
        ['Trennbares Verb: vor dem Verbteil', 'Wir führen das Stück *nicht auf*.'],
        ['sein + Adjektiv: vor dem Adjektiv', 'Die Ausstellung ist *nicht interessant*.'],
        ['Ort / Richtung: oft davor', 'Wir gehen heute *nicht ins Museum*.'],
        ['Feste Präpositionalgruppe: oft davor', 'Wir sprechen *nicht über moderne Kunst*.'],
      ] },
      { kind: 'rule', title: 'Einen Satzteil verneinen', lines: ['*nicht* steht direkt vor dem Teil, den du korrigierst.', 'Ich gehe *nicht heute* ins Museum, sondern morgen. → Zeit korrigieren.', 'Ich gehe heute *nicht ins Museum*, sondern ins Kino. → Ziel korrigieren.', '*Nicht ich* gehe ins Museum, sondern mein Bruder. → Person korrigieren.'] },
      { kind: 'tip', text: '„nicht steht immer am Ende“ ist keine vollständige Regel. Frage zuerst: *Was wird verneint?* Dann prüfe die Satzklammer: gesehen, kommen, auf und ähnliche Verbteile bleiben am Ende.' },
      { kind: 'examples', items: ['Ich finde das Gemälde *nicht schön*.', 'Die Malerin hat das Bild *nicht verkauft*.', 'Wir nehmen an der Führung *nicht teil*.', 'Ich kaufe *keine Bilder*, aber ich besuche gern Museen.'] },
    ],
  },
  {
    id: 'sondern', title: 'nicht / kein …, sondern …',
    summary: 'Eine falsche Information durch eine richtige ersetzen.',
    blocks: [
      { kind: 'rule', title: 'Korrektur', lines: ['Vor *sondern* muss eine Verneinung stehen: *nicht*, *kein* oder eine andere negative Aussage.', '*sondern* steht auf Position 0. Danach bleibt die Hauptsatzstellung: …, sondern *ich gehe* ins Kino.', 'Vor sondern steht ein *Komma*.', 'Gleiche Satzteile musst du nicht wiederholen: Das ist kein Roman, sondern ein Gedicht.'] },
      { kind: 'examples', items: ['Ich höre *nicht Jazz, sondern Pop*.', 'Das ist *kein Museum, sondern ein Theater*.', 'Er hat das Bild *nicht gekauft, sondern gemalt*.', 'Sie spricht *nicht mit dem Maler, sondern mit der Regisseurin*.'] },
      { kind: 'tip', text: '*aber* verbindet einen Gegensatz: Das Bild ist schön, aber teuer. *sondern* ersetzt die falsche Information: Das Bild ist nicht teuer, sondern günstig.' },
    ],
  },
  {
    id: 'kunst-kommentieren', title: 'Kunst kommentieren und nachfragen',
    summary: 'Aussagen verstärken, relativieren und auf Informationen reagieren.',
    blocks: [
      { kind: 'table', head: ['Funktion', 'Wörter / Redemittel', 'Beispiel'], rows: [
        ['Verstärken', 'total, wirklich, richtig, besonders', 'Das Bild gefällt mir *besonders* gut.'],
        ['Relativieren', 'eher, relativ, ziemlich', 'Der Film ist *relativ* spannend.'],
        ['Eigene Einschätzung', 'eigentlich', 'Das Bild gefällt mir *eigentlich* gut.'],
        ['Beschreibung', 'im Vordergrund / Hintergrund, links / rechts', '*Im Hintergrund* sieht man ein Haus.'],
        ['Nachfragen', 'Könntest du erklären, …?', 'Könntest du erklären, *woher die Bilder kommen*?'],
        ['Verständnis prüfen', 'Habe ich richtig verstanden, dass …?', 'Habe ich richtig verstanden, *dass der Eintritt frei ist*?'],
        ['Reagieren', 'Das klingt interessant! / Das ist ja schrecklich!', 'Das klingt interessant! Ich möchte mehr erfahren.'],
      ] },
      { kind: 'tip', text: 'Die Wirkung hängt vom Kontext ab: *ziemlich* kann auch „quite / fairly“ und damit recht stark sein. *eigentlich* kann eine Aussage vorsichtig machen oder eine Erwartung korrigieren. Indirekte Fragen haben das Verb *am Ende*.' },
      { kind: 'examples', title: 'Sprechen üben', items: ['Auf dem Bild erkenne ich zwei Personen. Die Farben sind ziemlich dunkel.', 'Mir gefällt das Bild besonders gut, weil es eine interessante Geschichte erzählt.', 'Das ist eher nicht mein Geschmack. Ich finde das Motiv langweilig.', 'Mich würde interessieren, wie die Künstlerin das Bild gemalt hat.'] },
    ],
  },
  {
    id: 'wortfamilien-schreiben', title: 'Wortfamilien und kurze Anzeigen',
    summary: 'denken → der Gedanke; kreativ → die Kreativität. Schreiben mit Adjektivendungen.',
    blocks: [
      { kind: 'table', head: ['Nomen', 'Verb / Adjektiv'], rows: [['der Gedanke', 'denken'], ['der Konsum', 'konsumieren'], ['die Veranstaltung', 'veranstalten'], ['der Schrei', 'schreien'], ['das Chaos', 'chaotisch'], ['das Missverständnis', 'missverstehen'], ['das Treffen', 'sich treffen'], ['das Talent', 'talentiert'], ['die Musik', 'musizieren'], ['die Kreativität', 'kreativ']] },
      { kind: 'rule', title: 'Schreiben: Punkte, Aufbau, Sprache', lines: ['Beantworte *alle Inhaltspunkte* der Aufgabe.', 'Nutze die passende Textsorte: E-Mail mit Anrede und Schluss; Anzeige kurz und klar.', 'Verbinde Sätze sinnvoll: weil, dass, aber, nicht nur … sondern auch.', 'Kontrolliere Kasus, Artikel, Adjektivendungen und Verbposition.', 'Bei Nomen aus Wortfamilien den *Artikel* mitlernen und großschreiben.'] },
      { kind: 'examples', title: 'Eigene Übungsbeispiele', items: ['Anzeige: Wir suchen kreative Personen für ein neues Theaterprojekt. Erfahrung ist nicht nötig. Bitte meldet euch per E-Mail.', 'Nachricht: Hallo Sara, kannst du kalte Getränke und frisches Obst mitbringen? Ich kümmere mich um gute Musik. Danke und bis Samstag!', 'Aufgabe: Schreibe eine Anzeige für einen Kunstkurs. Nenne Zielgruppe, Aktivität, Termin und Kontakt. Nutze mindestens drei Adjektive vor Nomen.'] },
      { kind: 'tip', text: 'Prüfe eine Anzeige Wort für Wort: Wir suchen *talentierte Musiker* (Akk. Pl.) mit *guten Ideen* (Dat. Pl.) für *neue Projekte* (Akk. Pl.).' },
    ],
  },
];
