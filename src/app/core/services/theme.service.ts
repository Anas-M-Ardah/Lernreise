import { DOCUMENT, Injectable, effect, inject, signal } from '@angular/core';
import { readStorage, writeStorage } from '../utils/storage';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'b12-lernreise.theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly theme = signal<Theme>(readStorage<Theme>(STORAGE_KEY, this.systemTheme()));

  constructor() {
    effect(() => {
      const theme = this.theme();
      this.document.documentElement.dataset['theme'] = theme;
      writeStorage(STORAGE_KEY, theme);
    });
  }

  toggle(): void {
    this.theme.update((theme) => (theme === 'dark' ? 'light' : 'dark'));
  }

  private systemTheme(): Theme {
    return this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
