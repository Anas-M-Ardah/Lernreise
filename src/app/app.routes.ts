import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ChapterService } from './core/services/chapter.service';
import { chapterResolver } from './features/chapter/chapter.resolver';

export const routes: Routes = [
  {
    path: '',
    title: 'Lernreise',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'pruefung',
    title: 'Prüfungspfad · Lernreise',
    loadComponent: () => import('./features/path/path-page').then((m) => m.PathPage),
  },
  {
    path: 'pruefung/:lessonId',
    title: 'Lektion · Lernreise',
    loadComponent: () => import('./features/path/lesson-player').then((m) => m.LessonPlayer),
  },
  {
    path: 'kapitel/:chapterId/lektion/:lessonId',
    title: 'Lektion · Lernreise',
    resolve: { chapter: chapterResolver },
    loadComponent: () => import('./features/lernpfad/lernpfad-lesson').then((m) => m.LernpfadLesson),
  },
  {
    path: 'kapitel/:chapterId',
    resolve: { chapter: chapterResolver },
    loadComponent: () => import('./features/chapter/chapter-shell').then((m) => m.ChapterShell),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: ({ params }) =>
          inject(ChapterService).find(params['chapterId'])?.plan ? 'lernpfad' : 'grammatik',
      },
      {
        path: 'lernpfad',
        title: 'Lernpfad · Lernreise',
        loadComponent: () => import('./features/lernpfad/lernpfad-page').then((m) => m.LernpfadPage),
      },
      {
        path: 'grammatik',
        title: 'Grammatik · Lernreise',
        loadComponent: () => import('./features/chapter/grammar/grammar-page').then((m) => m.GrammarPage),
      },
      {
        path: 'uebungen',
        title: 'Übungen · Lernreise',
        loadComponent: () => import('./features/chapter/exercises/exercises-page').then((m) => m.ExercisesPage),
      },
      {
        path: 'uebungen/:setId',
        title: 'Übung · Lernreise',
        loadComponent: () => import('./features/chapter/exercises/exercise-player').then((m) => m.ExercisePlayer),
      },
      {
        path: 'wortschatz',
        title: 'Wortschatz · Lernreise',
        loadComponent: () => import('./features/chapter/vocabulary/vocabulary-page').then((m) => m.VocabularyPage),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
