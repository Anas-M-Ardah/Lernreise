import { GrammarTopic } from '../../core/models';

export const grammar: readonly GrammarTopic[] = [
  {
    id: 'spickzettel', title: 'Spickzettel: Termin 11–18 auf einen Blick',
    summary: 'Die ganze Grammatik für den Test am Montag in einer Tabelle.',
    blocks: [
      { kind: 'table', caption: 'Grammatik', head: ['Thema', 'Formel', 'Beispiel'], rows: [
        ['Passiv Präsens', 'wird / werden + Partizip II', 'Die Lebensmittel *werden verteilt*.'],
        ['Passiv Präteritum', 'wurde / wurden + Partizip II', 'Die Tafel *wurde* 1993 *gegründet*.'],
        ['Passiv Perfekt', 'ist / sind + Partizip II + worden', 'Der Brand *ist gelöscht worden*.'],
        ['Passiv + Modalverb', 'Modalverb … Partizip II + werden', 'Steuern *müssen bezahlt werden*.'],
        ['Relativsatz was', 'alles, etwas, nichts, das, ganzer Satz', 'Alles, *was* ich brauche, …'],
        ['Relativsatz wo', 'Ort', 'die Stadt, *wo* ich wohne'],
        ['Adjektiv als Nomen', 'Endung wie Adjektiv vor Nomen', 'der Angestellt*e* · ein Angestellt*er*'],
        ['Artikel als Pronomen', 'einer · eins · eine · welche', 'Ja, ich bin *einer*. Hier sind *welche*.'],
        ['irgendein', 'unbestimmt; Pronomen irgendeiner/-eins', 'Gib mir *irgendeins*!'],
        ['je … desto/umso', 'Je + Komparativ … Verb Ende, desto + Komparativ + Verb', '*Je mehr* ich übe, *desto besser* spreche ich.'],
      ] },
      { kind: 'rule', title: 'Die fünf häufigsten Fehler', lines: [
        'Passiv mit Akkusativ: „*Den* Müll wird …“ → *Der* Müll wird weggeworfen.',
        '*geworden* statt *worden*: Im Passiv-Perfekt immer worden.',
        '*was / wo* vertauscht: Nach alles/nichts/etwas immer was; nach Orten wo.',
        'Adjektiv als Nomen klein oder ohne Endung: die *Angestellten*, ein *Obdachloser*.',
        'je … desto ohne Komparativ oder mit falscher Wortstellung: Je *weniger* Geld man hat, desto *regelmäßiger muss* man …',
      ] },
    ],
  },
  {
    id: 'je-desto', title: 'je …, desto / umso …',
    summary: 'Je mehr Geld Anna verdient, desto mehr spart sie.',
    blocks: [
      { kind: 'text', text: 'Mit *je …, desto / umso …* sagst du: Wenn sich eine Sache ändert, ändert sich auch eine andere. Teil 1 nennt die *Bedingung*, Teil 2 die *Folge*. *desto* und *umso* bedeuten dasselbe. English: the more …, the more … العربية: كلما … كلما …' },
      { kind: 'rule', title: 'Satzbau (Termin 18)', lines: [
        '*Je* + Komparativ + Subjekt + … + *Verb am Ende* (Nebensatz),',
        '*desto / umso* + Komparativ + *Verb* (Position 2) + Subjekt + … (Hauptsatz).',
        'Nach *je* und nach *desto / umso* steht *immer ein Komparativ*.',
        'Der Komparativ kann auch vor einem Nomen stehen: Je *mehr Geld* …, desto *weniger Zeit* …',
      ] },
      { kind: 'clauses', title: 'Nebensatz + Hauptsatz', sentences: [
        [{ type: 'NS', text: 'Je höher das Einkommen *ist*,' }, { type: 'HS', text: 'umso mehr Steuern *muss* man zahlen.' }],
        [{ type: 'NS', text: 'Je länger jemand arbeitslos *ist*,' }, { type: 'HS', text: 'desto schwerer *findet* er eine neue Stelle.' }],
        [{ type: 'NS', text: 'Je flexibler die Arbeitszeiten *sind*,' }, { type: 'HS', text: 'umso zufriedener *sind* die Mitarbeiter.' }],
      ] },
      { kind: 'table', caption: 'Komparative (Arbeitsblatt „SOS – Je mehr, desto“)', head: ['Adjektiv', 'Komparativ', 'Adjektiv', 'Komparativ'], rows: [
        ['groß', 'größer', 'hoch', '*höher* (ohne c!)'],
        ['früh', 'früher', 'gern', '*lieber*'],
        ['lang', 'länger', 'teuer', '*teurer* (ohne e)'],
        ['alt', 'älter', 'billig', 'billiger'],
        ['viel', '*mehr*', 'gut', '*besser*'],
        ['wenig', 'weniger', 'flexibel', '*flexibler* (ohne e)'],
      ] },
      { kind: 'examples', title: 'Arbeit und Geld (ÜB S. 140)', items: [
        'Je langweiliger die Arbeit *ist*, desto langsamer *vergeht* die Zeit.',
        'Je größer eine Firma *ist*, umso leichter *bekommt* sie von der Bank einen Kredit.',
        'Je besser der Gewinn einer Firma *ist*, desto höher *sind* die Gehälter der Manager.',
        'Je höher der Kredit *ist*, desto höher *sind* die Zinsen.',
        'Je mehr Hausaufgaben wir *bekommen*, desto mehr Deutsch *üben* wir!',
      ] },
      { kind: 'tip', text: 'SOS-Fehlersatz: „Je *wenigste* Geld man hat *im* Konto, desto *regelmäßig* man die Kontoauszüge kontrollieren *muss*.“ → Richtig: Je *weniger* Geld man *auf dem* Konto *hat*, desto *regelmäßiger muss* man die Kontoauszüge kontrollieren. (Komparativ, nicht Superlativ · Verb am Ende im je-Teil · Verb direkt nach desto + Komparativ · Geld *auf* dem Konto.)' },
    ],
  },
  {
    id: 'bankgeschaefte', title: 'Bankgeschäfte',
    summary: 'Gespräche in der Bank verstehen und führen: Konto, Kredit, Zinsen, Gebühren.',
    blocks: [
      { kind: 'table', caption: 'Wortschatz mit Definition (Termin 18)', head: ['Wort', 'Definition'], rows: [
        ['der Betrag, ¨-e', 'eine Summe Geld (Geldbetrag)'],
        ['der Kontoauszug, ¨-e', 'Papier aus dem Automaten; zeigt, wie viel Geld auf dem Konto ist'],
        ['der Kredit, -e', 'Geld, das man von der Bank leiht, z. B. für ein Auto oder ein Haus'],
        ['die Zinsen (Pl.)', 'Geld, das man an die Bank zahlen muss, wenn man Geld geliehen hat'],
        ['die Rate, -n', 'der Betrag, den man monatlich für eine bestimmte Zeit bezahlt'],
        ['die Gebühr, -en', 'Geldbetrag für eine Serviceleistung'],
        ['die Mahnung, -en', 'Erinnerung und Aufforderung, eine Rechnung zu bezahlen'],
        ['die Schulden (Pl.)', 'Wenn man sich Geld leiht, hat man Schulden.'],
        ['die Einnahmen / die Ausgaben', 'Geld, das man bekommt / Geld, das man bezahlt'],
        ['die IBAN / die BIC', 'Kontonummer / Bankleitzahl für Überweisungen ins Ausland'],
        ['die Münze, -n / der Schein, -e', 'Geldstück / Geldschein'],
      ] },
      { kind: 'table', caption: 'Nomen + Verb (KB S. 138)', head: ['Nomen', 'passende Verben'], rows: [
        ['das Konto', 'eröffnen, sperren, überziehen'],
        ['der Kredit', 'beantragen'],
        ['das Geld / der Betrag', 'überweisen, einzahlen, abheben, zahlen, sparen, verlangen'],
        ['die Bankkarte / Kreditkarte', 'beantragen, sperren'],
        ['der Kontoauszug / der Beleg', 'drucken'],
        ['die Rate / die Gebühr', 'überweisen, zahlen, verlangen'],
      ] },
      { kind: 'rule', title: 'Verben erklärt (Folie)', lines: [
        '*beantragen*: einen Antrag stellen – ein Visum / einen Kredit beantragen.',
        '*überweisen*: Geld digital an ein anderes Konto senden.',
        '*sperren*: Nach dreimal falscher PIN wird die Karte gesperrt.',
        '*abheben*: Geld vom Automaten holen. · *einzahlen*: Geld auf das Konto bringen.',
        '*verlangen*: fordern – Für ein Visum verlangt die Botschaft Reisepass und Kontoauszüge.',
        '*überziehen*: mehr Geld ausgeben, als auf dem Konto ist.',
      ] },
      { kind: 'examples', title: 'Zwei Bankgespräche (KB S. 138)', items: [
        'Gespräch 1: Nina Ramon möchte ein *Girokonto eröffnen*. Bei mehr als 800 Euro Einkommen gibt es *keine Kontoführungsgebühren*. Es ist eine Internetbank ohne Filialen; Kontoauszüge kommen als PDF; die Kreditkarte ist kostenlos.',
        'Gespräch 2: Herr Richter braucht einen *Kredit* über 5.000 Euro für eine neue Küche. Er kann 400 Euro im Monat zurückzahlen. Ab 2.000 Euro kostet der Kredit 3,99 % *Zinsen*, über 7.500 Euro nur 3,69 %. Laufzeit: 14 Monate.',
        'Je höher der Kredit ist, desto günstiger sind hier die Zinsen.',
      ] },
    ],
  },
  {
    id: 'geld-redemittel', title: 'Wofür braucht man Geld?',
    summary: 'Redemittel aus Termin 17/18: über Geld und Prioritäten sprechen.',
    blocks: [
      { kind: 'rule', title: 'Redemittel', lines: [
        'Sicher braucht man (relativ viel / kein) Geld für …',
        '… erfordert (nicht) viel Geld.',
        'Für mich ist … besonders wichtig.',
        'Ich investiere gern Geld in …',
        'Dabei spielt Geld (k)eine große Rolle.',
        'Dafür brauche ich viel / nicht so viel / kein Geld.',
      ] },
      { kind: 'examples', title: 'Glück und Geld (KB S. 136)', items: [
        'Szene 1: Mit dem Motorrad kann er Stress und Ärger vergessen. Dafür hat er lange gespart.',
        'Szene 2: Draußen in der Natur sein und mit dem Hund Luna spielen – dabei spielt Geld keine Rolle.',
        'Szene 3: Mit Freunden zusammen sein, sich unterhalten und lachen.',
        'Szene 4: Eine schicke Wohnung – „Da wollen wir keine Kompromisse machen.“',
      ] },
      { kind: 'tip', text: 'Artikelwörter als Pronomen passen gut zu Bankgesprächen: Gibt es hier in der Nähe eine Bank? – Gleich da drüben ist *eine*. / Rechts an der Ecke findest du *eine*. / Hier ist leider *keine*. / Im Zentrum gibt es *welche*.' },
    ],
  },
];
