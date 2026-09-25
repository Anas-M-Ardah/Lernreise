import { VocabEntry } from '../../../core/models';

/** Text for speech synthesis: `fest|stellen` → `feststellen`, with article. */
export function spokenForm(entry: VocabEntry): string {
  return [entry.article, entry.term.replace(/\|/g, '')].filter(Boolean).join(' ');
}

/** Secondary grammar info shown under a word, e.g. `-n` or `hält, hielt, hat gehalten`. */
export function grammarInfo(entry: VocabEntry): string {
  return [entry.plural, entry.forms].filter(Boolean).join(' · ');
}
