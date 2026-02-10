import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="page-header terminal-window">
      <div class="terminal-line">
        <span class="prompt">root@portfolio:~$</span>
        <span class="command">{{ command() }}</span>
      </div>
      @if (title()) {
        <h1 class="page-title">
          @if (icon()) {
            <mat-icon>{{ icon() }}</mat-icon>
          }
          {{ title() }}
        </h1>
      }
      @if (description()) {
        <p class="page-description">{{ description() }}</p>
      }
    </div>
  `,
  styles: [`
    .page-header {
      padding: var(--spacing-2xl);
      margin-bottom: var(--spacing-2xl);
      
      .terminal-line {
        font-family: var(--font-mono);
        margin-bottom: var(--spacing-lg);
        font-size: var(--font-size-lg);
        
        .prompt {
          color: var(--color-primary);
          margin-right: var(--spacing-sm);
          text-shadow: var(--glow-primary);
        }
        
        .command {
          color: var(--color-accent);
        }
      }
      
      .page-title {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        font-size: var(--font-size-4xl);
        color: var(--color-primary);
        text-shadow: var(--text-shadow-glow);
        margin-bottom: var(--spacing-md);
        
        mat-icon {
          font-size: var(--font-size-4xl);
          width: var(--font-size-4xl);
          height: var(--font-size-4xl);
        }
      }
      
      .page-description {
        color: var(--color-text-primary);
        font-size: var(--font-size-lg);
        line-height: var(--line-height-relaxed);
        max-width: 800px;
        margin-bottom: 0;
      }
    }
  `]
})
export class PageHeaderComponent {
  command = input.required<string>();
  title = input<string>('');
  description = input<string>('');
  icon = input<string>('');
}