import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color?: string;
}

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  template: `
    <div class="social-links" [class.vertical]="vertical()">
      @for (link of links(); track link.name) {
        <a 
          mat-icon-button 
          [href]="link.url" 
          target="_blank"
          [matTooltip]="link.name"
          [style.color]="link.color || 'var(--color-primary)'"
          class="social-link"
        >
          <mat-icon>{{ link.icon }}</mat-icon>
        </a>
      }
    </div>
  `,
  styles: [`
    .social-links {
      display: flex;
      gap: var(--spacing-sm);
      flex-wrap: wrap;
      
      &.vertical {
        flex-direction: column;
      }
      
      .social-link {
        transition: all var(--transition-normal);
        
        &:hover {
          transform: translateY(calc(var(--spacing-xs) * -1));
          filter: brightness(1.3);
          box-shadow: var(--glow-primary);
        }
        
        mat-icon {
          font-size: var(--font-size-2xl);
          width: var(--font-size-2xl);
          height: var(--font-size-2xl);
        }
      }
    }
  `]
})
export class SocialLinksComponent {
  links = input.required<SocialLink[]>();
  vertical = input<boolean>(false);
}