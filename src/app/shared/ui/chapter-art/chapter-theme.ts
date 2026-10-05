import { IconName } from '../icon/icons';

export interface ChapterTheme {
  readonly label: string;
  readonly icon: IconName;
  readonly note: string;
}

const themes: Record<number, ChapterTheme> = {
  7: { label: 'Verbindungen', icon: 'heart', note: 'Menschen verstehen. Geschichten erzählen.' },
  8: { label: 'Balance & Rhythmus', icon: 'music', note: 'Den Körper spüren. Den Geist stärken.' },
  9: { label: 'Das Kreativatelier', icon: 'palette', note: 'Kunst entdecken. Eigene Ideen ausdrücken.' },
};

export function chapterTheme(number: number): ChapterTheme {
  return themes[number] ?? { label: 'Neue Perspektiven', icon: 'book-open', note: 'Schritt für Schritt weiterlernen.' };
}
