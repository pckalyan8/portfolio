import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TerminalHeaderComponent } from './shared/components/terminal-header/terminal-header.component';
import { FooterComponent } from './shared/components/footer/footer.component';


@Component({
  selector: 'kez-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    TerminalHeaderComponent, 
    FooterComponent,
  ],
  template: `
    <app-terminal-header />
    <main class="main-content">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .main-content {
      flex: 1;
      padding-top: var(--navbar-height);
    }
  `]
})
export class App {}
