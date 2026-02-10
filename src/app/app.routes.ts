import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component')
      .then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component')
      .then(m => m.AboutComponent)
  },
  {
    path: 'skills',
    loadComponent: () => import('./features/skills/skills.component')
      .then(m => m.SkillsComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects.component')
      .then(m => m.ProjectsComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog.component')
      .then(m => m.BlogComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component')
      .then(m => m.ContactComponent)
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];