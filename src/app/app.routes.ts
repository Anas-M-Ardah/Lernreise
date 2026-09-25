import { Routes } from '@angular/router';
import { chapterResolver } from './features/chapter/chapter.resolver';

export const routes: Routes = [
  {
    path: '',
    title: 'B1.2 Lernreise',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'kapitel/:chapterId',
    resolve: { chapter: chapterResolver },
    loadComponent: () => import('./features/chapter/chapter-shell').then((m) => m.ChapterShell),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'grammatik' },
      {
        path: 'grammatik',
        title: 'Grammatik · B1.2 Lernreise',
        loadComponent: () => import('./features/chapter/grammar/grammar-page').then((m) => m.GrammarPage),
      },
      {
        path: 'uebungen',
        title: 'Übungen · B1.2 Lernreise',
        loadComponent: () => import('./features/chapter/exercises/exercises-page').then((m) => m.ExercisesPage),
      },
      {
        path: 'uebungen/:setId',
        title: 'Übung · B1.2 Lernreise',
        loadComponent: () => import('./features/chapter/exercises/exercise-player').then((m) => m.ExercisePlayer),
      },
      {
        path: 'wortschatz',
        title: 'Wortschatz · B1.2 Lernreise',
        loadComponent: () => import('./features/chapter/vocabulary/vocabulary-page').then((m) => m.VocabularyPage),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
