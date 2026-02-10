import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SocialLinksComponent, SocialLink } from '../social-links/social-links.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule, MatDividerModule, SocialLinksComponent],
  template: `
    <footer class="site-footer">
      <div class="footer-content">
        <div class="footer-info">
          <p class="terminal-text">
            <span class="prompt">root@portfolio:~$</span>
            <span class="command">whoami</span>
          </p>
          <p class="tagline">Full Stack Developer • AI Engineer • Quantum Enthusiast</p>
        </div>
        
        <div class="footer-social">
          <app-social-links [links]="socialLinks()" />
        </div>
      </div>
      
      <mat-divider></mat-divider>
      
      <div class="footer-bottom">
        <p class="copyright">© {{ year() }} Your Name. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      background: rgba(18, 18, 18, 0.95);
      backdrop-filter: blur(var(--glass-blur));
      border-top: 1px solid var(--glass-border);
      padding: var(--spacing-xl) var(--spacing-md);
      margin-top: var(--spacing-3xl);
      
      .footer-content {
        max-width: var(--container-xl);
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--spacing-xl);
        margin-bottom: var(--spacing-md);
        
        @media (max-width: 639px) {
          flex-direction: column;
          text-align: center;
        }
        
        .footer-info {
          .terminal-text {
            font-family: var(--font-mono);
            margin-bottom: var(--spacing-xs);
            font-size: var(--font-size-sm);
            
            .prompt {
              color: var(--color-primary);
              margin-right: var(--spacing-sm);
            }
            
            .command {
              color: var(--color-accent);
            }
          }
          
          .tagline {
            color: var(--color-text-secondary);
            font-size: var(--font-size-sm);
            margin: 0;
          }
        }
      }
      
      mat-divider {
        margin: var(--spacing-md) 0;
        border-color: var(--glass-border);
      }
      
      .footer-bottom {
        max-width: var(--container-xl);
        margin: 0 auto;
        text-align: center;
        
        .copyright {
          color: var(--color-text-muted);
          font-size: var(--font-size-xs);
          margin: 0;
        }
      }
    }
  `]
})
export class FooterComponent {
  year = signal(new Date().getFullYear());
  
  socialLinks = signal<SocialLink[]>([
    { name: 'GitHub', url: 'https://github.com/yourusername', icon: 'code', color: 'var(--color-primary)' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: 'work', color: 'var(--color-secondary)' },
    { name: 'Dev.to', url: 'https://dev.to/yourusername', icon: 'article', color: 'var(--color-accent)' }
  ]);
}