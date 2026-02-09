import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { SkillsComponent } from './components/skills/skills.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'kez-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HeroComponent,
    SkillsComponent,
    BlogListComponent,
    FooterComponent
  ],
  template: `
    <app-header></app-header>
    <main>
      <app-hero></app-hero>
      <app-skills></app-skills>
      <app-blog-list></app-blog-list>
    </main>
    <app-footer></app-footer>
    <router-outlet />
  `,
  styles: [`
    main {
      min-height: 100vh;
    }
  `]
})
export class App {}
