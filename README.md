# B1.2 Lernreise

Grammar summaries, exercises and vocabulary flashcards for *Netzwerk neu B1.2* — one chapter at a time.

```bash
npm install
npm start          # http://localhost:4200
npm run build
```

## Deployment

Every push to `main` builds and publishes the site to GitHub Pages via
`.github/workflows/deploy.yml`: https://anas-m-ardah.github.io/Lernreise/

The site is an installable PWA (works offline). On a phone: open the link, then
**Share → Add to Home Screen** (iOS Safari) or **⋮ → Install app** (Android Chrome).
App icons are generated from `public/favicon.svg` and `public/icons/icon-maskable.svg`.

## Structure

```
src/app/
  core/
    models/        Typed content model (Chapter, GrammarBlock, Question, VocabEntry)
    services/      ChapterService, ProgressService (localStorage), ThemeService, SpeechService
    utils/         Pure helpers (text, storage)
  data/
    chapters.ts    Registry of available + upcoming chapters
    kapitel-07/    grammar.ts · exercises.ts · vocabulary.ts · index.ts
    kapitel-08/    Health, music, reflexive verbs and paired connectors
    kapitel-09/    Art, adjective endings, negation and exam revision
  features/
    home/          Chapter overview
    chapter/       Shell + tabs: grammar/, exercises/, vocabulary/
  shared/ui/       Icon, RichText, ProgressRing
```

## Adding a chapter

Chapters are pure data — no new components needed.

1. Copy `src/app/data/kapitel-07/` to `kapitel-08/` and replace the content.
2. Register it in `src/app/data/chapters.ts` (add to `CHAPTERS`, remove from `UPCOMING_CHAPTERS`).

Content conventions:

- `*word*` highlights a word in any grammar text.
- `___` marks the gap in `choice` and `gap` questions.
- `order` questions list the words in the correct order; the app shuffles them.
- Grammar blocks: `text`, `rule`, `tip`, `table`, `examples`, `timeline`, `clauses`, `connectors`.

## Units 8 and 9

Both chapters are available in the app, including German grammar explanations,
English and Arabic vocabulary meanings, answer explanations, original reading
practice and mixed revision quizzes. Chapter 9 includes a revision plan for the
October 10, 2026 exam, with time reserved for the existing Chapter 7 material.
Listening revision uses course recordings; the app provides vocabulary pronunciation,
not recorded listening comprehension tests.

The interface gives each chapter its own visual identity: rose and conversation
artwork for relationships (7), teal with rhythm and leaf motifs for wellbeing (8),
and lavender with geometric artwork for art (9). Chapter accents apply to lesson
navigation, exercises and flashcards in light and dark modes. The article, tense
and answer-feedback colors retain their separate learning meanings.

Content scope was checked against the local course materials in the parent folder:

- `Slides_Termin6_26.09.2026.pdf` and `Slides_Termin7_28.09.2026.pdf`
- `Zweiteilige Konnektoren_Expertengruppen_PDF.pdf`
- `NWneu_B1_kapiteltest-k8.pdf` and `NWneu_B1_kapiteltest-k9.pdf`
- `Slides_Termin9_03.10.2026.pdf` and `Slides_Termin10_05.10.2026.pdf`
- `B1.2_E9_Kunststücke_Wortschatz_Quiz.pdf`
- `B1.2_E9_Wir können mehr_Adjektivdeklination_Perfekte Matches_HA.pdf`
- `B1.2_E8_Musik und Emotionen_Text mit KI verbessern.pdf`

The new explanations, examples, reading texts and practice questions are authored
study aids aligned with these materials, not a transcription of the textbook,
an official answer key, or a complete publisher vocabulary list. Exam details in
the plan come from the October 5 slides (page 3); writing practice lengths are
suggestions rather than confirmed exam requirements.

Run `npm run check:content` to check IDs, topic references, question structure,
answer choices, vocabulary card IDs and grammar tables. Run `npm run build`
to verify the Angular production build.

## German pronunciation

Vocabulary playback explicitly selects a German voice, prefers de-DE and enhanced voices, and waits for asynchronously loaded voices. Open **Aussprache · Deutsch** to choose the voice and learning speed or test a sample. If no German voice is available, enable German speech in your device settings or try another browser; the app never substitutes an English voice. Voice quality and availability depend on the browser/device.

Run `npm run check:speech` to verify German-only selection, delayed loading, speed controls, timeout/error handling, and cleanup.
