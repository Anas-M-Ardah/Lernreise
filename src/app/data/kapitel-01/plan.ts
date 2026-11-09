import { RevisionPlan } from '../../core/models';

/**
 * Lernpfad for the first B1.3 lesson (Mo 09.11.2026): Kennenlernen, the text
 * „Gelebte Träume“ and the homework on Präteritum / Perfekt.
 */
export const plan: RevisionPlan = {
  title: 'Leute heute – deine erste Woche',
  intro: 'Kurze Lektionen wie bei einer Sprach-App: Jede Lektion dauert 3–5 Minuten. Falsche Antworten kommen am Ende noch einmal. Mit 5 Herzen kommst du durch jede Lektion.',
  dailyGoal: 30,
  units: [
    {
      id: 'k1-u1',
      title: 'Kennenlernen',
      day: 'Mo 09.11. · heute im Kurs',
      source: 'LB S. 9 Üb. 1–2 · AB S. 88 Üb. 1a–c',
      description: 'Wörter zu Arbeit, Familie, Wohnen und Freizeit – und die sechs Kurztexte A–F.',
      lessons: [
        { id: 'k1-l-wortfelder', title: 'Wörter und Themen', kind: 'vocab', setIds: ['k1-wortfelder'] },
        { id: 'k1-l-familie-wohnen', title: 'Familie und Wohnen', kind: 'vocab', setIds: ['k1-familie-wohnen'] },
        { id: 'k1-l-kurztexte', title: 'Die Kurztexte A–F', kind: 'reading', setIds: ['k1-kurztexte'] },
        { id: 'k1-l-vorstellen', title: 'Sich vorstellen', kind: 'speaking', setIds: ['k1-vorstellen'] },
      ],
      tasks: [
        { id: 'k1-t-saetze', text: 'AB S. 88 Üb. 1c: Schreib zu jedem Thema einen Satz über dich.' },
      ],
    },
    {
      id: 'k1-u2',
      title: 'Gelebte Träume lesen',
      day: 'Mo 09.11. · heute im Kurs',
      source: 'LB S. 10–11 Üb. 3a, b · AB S. 90 Üb. 1a, b',
      description: 'Leonie, Georg und Matthias: Was war ihr Traum, was ist daraus geworden?',
      lessons: [
        { id: 'k1-l-traum-wortschatz', title: 'Wörter aus dem Text', kind: 'vocab', setIds: ['k1-traum-wortschatz'] },
        { id: 'k1-l-leonie', title: 'Leonie', kind: 'reading', setIds: ['k1-leonie'] },
        { id: 'k1-l-georg', title: 'Georg', kind: 'reading', setIds: ['k1-georg'] },
        { id: 'k1-l-matthias', title: 'Matthias', kind: 'reading', setIds: ['k1-matthias'] },
        { id: 'k1-l-wer', title: 'Wer ist das?', kind: 'review', setIds: ['k1-wer'] },
      ],
    },
    {
      id: 'k1-u3',
      title: 'Über Träume sprechen',
      day: 'Di 10.11.',
      source: 'AB S. 90 Üb. 1b · LB S. 11 Üb. 5',
      description: 'Verben rund um „Traum“ und Sätze für das Gespräch über deine eigenen Träume.',
      lessons: [
        { id: 'k1-l-traum-verben', title: 'Verben rund um „Traum“', kind: 'vocab', setIds: ['k1-traum-verben'] },
        { id: 'k1-l-traeume-erzaehlen', title: 'Über Träume berichten', kind: 'speaking', setIds: ['k1-traeume-erzaehlen'] },
      ],
      tasks: [
        { id: 'k1-t-praesentation', text: 'Präsentation: Thema auswählen (Link im Kursplan).' },
        { id: 'k1-t-lernplattform', text: 'Lernplattform: Text „Träume werden Wirklichkeit“ bearbeiten.' },
      ],
    },
    {
      id: 'k1-u4',
      title: 'Hausaufgabe: Präteritum & Perfekt',
      day: 'Di 10.11.',
      source: 'LB S. 11 Üb. 4 · AB S. 90–91 Üb. 2a–c · Grammatik-Rückschau LB S. 21',
      description: 'Erst die Regeln, dann die Formen – so ist die Hausaufgabe im Arbeitsbuch leicht.',
      lessons: [
        { id: 'k1-l-welche-zeit', title: 'Welche Zeitform?', kind: 'grammar', setIds: ['k1-welche-zeit'] },
        { id: 'k1-l-praeteritum', title: 'Präteritum-Formen', kind: 'grammar', setIds: ['k1-praeteritum'] },
        { id: 'k1-l-partizip', title: 'Partizip II', kind: 'grammar', setIds: ['k1-partizip'] },
        { id: 'k1-l-haben-sein', title: 'haben oder sein?', kind: 'grammar', setIds: ['k1-haben-sein'] },
        { id: 'k1-l-verbformen', title: 'Verbformen-Memory', kind: 'vocab', setIds: ['k1-verbformen'] },
        { id: 'k1-l-plusquamperfekt', title: 'Plusquamperfekt', kind: 'grammar', setIds: ['k1-plusquamperfekt'] },
        { id: 'k1-l-biografie', title: 'Eine Kurzbiografie', kind: 'grammar', setIds: ['k1-biografie'] },
      ],
      tasks: [
        { id: 'k1-t-ab-2abc', text: 'AB S. 90–91 Üb. 2a, b, c machen und mit den Lösungen auf allango.net prüfen.' },
        { id: 'k1-t-formen', text: 'Die Formen Präteritum – Perfekt lernen (Liste im Kurs-Link; Tabelle auch unter „Grammatik“).' },
        { id: 'k1-t-lb-4a', text: 'LB S. 11 Üb. 4a: zu jeder Zeitform einen Beispielsatz aus dem Text notieren.', optional: true },
      ],
    },
    {
      id: 'k1-u5',
      title: 'Fit für die nächste Stunde',
      day: 'Mi 11.11. · vor dem Unterricht',
      source: 'Kapitel 1, Auftakt und Modul 1',
      description: 'Zwei Wiederholungen mit zufälligen Aufgaben – jedes Mal neu gemischt.',
      lessons: [
        {
          id: 'k1-l-verben-blitz',
          title: 'Verbformen-Blitz',
          kind: 'review',
          setIds: ['k1-welche-zeit', 'k1-praeteritum', 'k1-partizip', 'k1-haben-sein', 'k1-verbformen', 'k1-plusquamperfekt', 'k1-biografie'],
        },
        {
          id: 'k1-l-kapitel-mix',
          title: 'Kapitel-Mix',
          kind: 'review',
          setIds: [
            'k1-wortfelder', 'k1-familie-wohnen', 'k1-kurztexte', 'k1-vorstellen', 'k1-traum-wortschatz', 'k1-leonie', 'k1-georg',
            'k1-matthias', 'k1-wer', 'k1-traum-verben', 'k1-traeume-erzaehlen', 'k1-welche-zeit', 'k1-praeteritum', 'k1-partizip',
            'k1-haben-sein', 'k1-verbformen', 'k1-plusquamperfekt', 'k1-biografie',
          ],
        },
      ],
    },
  ],
};
