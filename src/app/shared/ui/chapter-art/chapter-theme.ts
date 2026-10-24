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
  10: { label: 'Gemeinsam stark', icon: 'sparkles', note: 'Werte teilen. Sich für andere einsetzen.' },
  11: { label: 'Stadtspaziergang', icon: 'layers', note: 'Viertel erkunden. Mitreden und vermitteln.' },
  12: { label: 'Geld & Glück', icon: 'trophy', note: 'Klug sparen. Je mehr, desto besser.' },
};

export function chapterTheme(number: number): ChapterTheme {
  return themes[number] ?? { label: 'Neue Perspektiven', icon: 'book-open', note: 'Schritt für Schritt weiterlernen.' };
}
