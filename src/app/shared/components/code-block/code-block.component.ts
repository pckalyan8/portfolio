import { Component, input, signal, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="code-block">
      <div class="code-header">
        <span class="language">{{ language() }}</span>
        <button 
          mat-icon-button 
          (click)="copyCode()" 
          class="copy-btn"
          [attr.aria-label]="copied() ? 'Copied!' : 'Copy code'"
        >
          <mat-icon>{{ copied() ? 'check' : 'content_copy' }}</mat-icon>
        </button>
      </div>
      <pre><code>{{ code() }}</code></pre>
    </div>
  `,
  styles: [`
    .code-block {
      background: var(--glass-bg-dark);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-md);
      overflow: hidden;
      margin: var(--spacing-md) 0;
      
      .code-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-sm) var(--spacing-md);
        background: rgba(var(--color-primary-rgb), 0.1);
        border-bottom: 1px solid var(--glass-border);
        
        .language {
          color: var(--color-accent);
          font-family: var(--font-mono);
          font-size: var(--font-size-xs);
          text-transform: uppercase;
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--letter-spacing-wider);
        }
        
        .copy-btn {
          color: var(--color-primary);
          
          &:hover {
            background: rgba(var(--color-primary-rgb), 0.2);
          }
        }
      }
      
      pre {
        margin: 0;
        padding: var(--spacing-md);
        overflow-x: auto;
        
        code {
          font-family: var(--font-mono);
          font-size: var(--font-size-sm);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-primary);
          background: none;
          border: none;
          padding: 0;
        }
      }
    }
  `]
})
export class CodeBlockComponent {
  private snackBar = inject(MatSnackBar);
  private document = inject(DOCUMENT);
  
  code = input.required<string>();
  language = input<string>('code');
  
  copied = signal(false);
  
  async copyCode() {
    try {
      await this.document.defaultView?.navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      this.snackBar.open('Code copied to clipboard!', 'Close', {
        duration: 2000
      });
      setTimeout(() => this.copied.set(false), 2000);
    } catch (err) {
      this.snackBar.open('Failed to copy code', 'Close', {
        duration: 2000
      });
    }
  }
}