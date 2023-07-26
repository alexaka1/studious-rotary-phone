import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'blog',
    loadComponent: () => import('./components/blog/blog.component').then((m) => m.BlogComponent),
  },
];
