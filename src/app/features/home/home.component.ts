import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { AnimatedCounterComponent } from '../../shared/components/animated-counter/animated-counter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink, GlassCardComponent, AnimatedCounterComponent],
  template: `
    <div class="home-container">
      <section class="hero">
        <app-glass-card [terminalStyle]="true">
          <div class="terminal-content">
            <div class="typing-effect">
              <span class="prompt">visitor@portfolio:~$</span>
              <span class="command">whoami</span>
            </div>
            <div class="output">
              <h1 class="glow-text">Full Stack Developer</h1>
              <h2>AI Engineer • Quantum Computing Enthusiast</h2>
              <p class="subtitle">
                Building scalable applications with Angular, Spring Boot & AWS |
                Exploring the frontiers of AI & Quantum Computing
              </p>
            </div>
            <div class="cta-buttons">
              <a mat-raised-button color="primary" routerLink="/projects">
                <mat-icon>folder</mat-icon>
                View Projects
              </a>
              <a mat-raised-button routerLink="/blog">
                <mat-icon>article</mat-icon>
                Read Articles
              </a>
            </div>
          </div>
        </app-glass-card>
      </section>
      
      <section class="quick-stats">
        <app-glass-card>
          <div class="stats-grid">
            <div class="stat-item">
              <mat-icon>terminal</mat-icon>
              <app-animated-counter [target]="100000" suffix="+" [duration]="2500" />
              <p>Lines of Code</p>
            </div>
            <div class="stat-item">
              <mat-icon>psychology</mat-icon>
              <app-animated-counter [target]="25" suffix="+" [duration]="2000" />
              <p>AI Projects</p>
            </div>
            <div class="stat-item">
              <mat-icon>cloud</mat-icon>
              <app-animated-counter [target]="50" suffix="+" [duration]="2200" />
              <p>AWS Deployments</p>
            </div>
            <div class="stat-item">
              <mat-icon>science</mat-icon>
              <app-animated-counter [target]="10" suffix="+" [duration]="1800" />
              <p>Quantum Experiments</p>
            </div>
          </div>
        </app-glass-card>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: var(--container-xl);
      margin: 0 auto;
      padding: var(--spacing-xl);
      
      @media (max-width: 639px) {
        padding: var(--spacing-md);
      }
    }
    
    .hero {
      margin-bottom: var(--spacing-3xl);
    }
    
    .terminal-content {
      .typing-effect {
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
      
      .output {
        margin: var(--spacing-2xl) 0;
        
        h2 {
          color: var(--color-secondary);
          font-size: var(--font-size-2xl);
          margin-bottom: var(--spacing-md);
        }
        
        .subtitle {
          color: var(--color-text-primary);
          font-size: var(--font-size-lg);
          line-height: var(--line-height-relaxed);
        }
      }
      
      .cta-buttons {
        display: flex;
        gap: var(--spacing-md);
        flex-wrap: wrap;
        margin: var(--spacing-2xl) 0;
        
        a {
          mat-icon {
            margin-right: var(--spacing-sm);
          }
        }
      }
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-2xl);
      
      .stat-item {
        text-align: center;
        padding: var(--spacing-lg);
        border-radius: var(--radius-md);
        background: rgba(var(--color-primary-rgb), 0.05);
        border: 1px solid var(--glass-border);
        transition: all var(--transition-normal);
        
        &:hover {
          background: rgba(var(--color-primary-rgb), 0.1);
          border-color: var(--color-primary);
          transform: translateY(calc(var(--spacing-xs) * -1));
          box-shadow: var(--glow-primary);
        }
        
        mat-icon {
          font-size: var(--spacing-3xl);
          width: var(--spacing-3xl);
          height: var(--spacing-3xl);
          color: var(--color-primary);
          margin-bottom: var(--spacing-md);
          filter: drop-shadow(var(--glow-primary));
        }
        
        p {
          color: var(--color-text-secondary);
          font-size: var(--font-size-sm);
          margin-bottom: 0;
          margin-top: var(--spacing-sm);
        }
      }
    }
    
    @media (max-width: 639px) {
      .cta-buttons {
        flex-direction: column;
        
        a {
          width: 100%;
        }
      }
      
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-md);
      }
    }
  `]
})
export class HomeComponent {
  stats = signal({
    linesOfCode: '100K+',
    aiProjects: '25+',
    cloudDeployments: '50+',
    quantumExperiments: '10+'
  });
}