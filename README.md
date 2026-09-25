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
