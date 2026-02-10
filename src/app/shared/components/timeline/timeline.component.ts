import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export interface TimelineItem {
  title: string;
  subtitle?: string;
  period: string;
  description: string;
  icon?: string;
  tags?: string[];
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="timeline">
      @for (item of items(); track $index) {
        <div class="timeline-item">
          <div class="timeline-line"></div>
          <div class="timeline-marker">
            @if (item.icon) {
              <mat-icon>{{ item.icon }}</mat-icon>
            } @else {
              <div class="marker-dot"></div>
            }
          </div>
          <div class="timeline-content">
            <div class="timeline-header">
              <h3>{{ item.title }}</h3>
              <span class="period">{{ item.period }}</span>
            </div>
            @if (item.subtitle) {
              <h4>{{ item.subtitle }}</h4>
            }
            <p>{{ item.description }}</p>
            @if (item.tags && item.tags.length > 0) {
              <div class="tags">
                @for (tag of item.tags; track tag) {
                  <span class="tag">{{ tag }}</span>
                }
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .timeline {
      position: relative;
      padding-left: 0;
    }
    
    .timeline-item {
      position: relative;
      margin-bottom: var(--spacing-3xl);
      padding-left: calc(var(--spacing-3xl) + var(--spacing-md));
      
      &:last-child {
        margin-bottom: 0;
        
        .timeline-line {
          display: none;
        }
      }
    }
    
    .timeline-line {
      position: absolute;
      left: 1rem;
      top: calc(var(--spacing-2xl) + var(--spacing-md));
      bottom: calc(var(--spacing-3xl) * -1);
      width: 2px;
      background: linear-gradient(
        to bottom,
        var(--color-primary),
        transparent
      );
    }
    
    .timeline-marker {
      position: absolute;
      left: 0;
      top: 0;
      width: var(--spacing-2xl);
      height: var(--spacing-2xl);
      border-radius: var(--radius-full);
      background: rgba(var(--color-primary-rgb), 0.2);
      border: 2px solid var(--color-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--glow-primary);
      z-index: var(--z-dropdown);
      
      mat-icon {
        color: var(--color-primary);
        font-size: var(--font-size-lg);
        width: var(--font-size-lg);
        height: var(--font-size-lg);
      }
      
      .marker-dot {
        width: var(--spacing-sm);
        height: var(--spacing-sm);
        border-radius: var(--radius-full);
        background: var(--color-primary);
        box-shadow: var(--glow-primary);
      }
    }
    
    .timeline-content {
      .timeline-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--spacing-sm);
        gap: var(--spacing-md);
        flex-wrap: wrap;
        
        h3 {
          color: var(--color-primary);
          font-size: var(--font-size-xl);
          margin: 0;
          font-weight: var(--font-weight-semibold);
          flex: 1;
          min-width: 0;
        }
        
        .period {
          color: var(--color-accent);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          font-family: var(--font-mono);
          white-space: nowrap;
          flex-shrink: 0;
        }
      }
      
      h4 {
        color: var(--color-secondary);
        font-size: var(--font-size-base);
        margin: 0 0 var(--spacing-md) 0;
        font-weight: var(--font-weight-normal);
      }
      
      p {
        color: var(--color-text-primary);
        line-height: var(--line-height-relaxed);
        margin-bottom: var(--spacing-md);
      }
      
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-sm);
        
        .tag {
          background: rgba(var(--color-primary-rgb), 0.2);
          color: var(--color-primary-light);
          padding: var(--spacing-xs) var(--spacing-md);
          border-radius: var(--radius-full);
          font-size: var(--font-size-xs);
          border: 1px solid rgba(var(--color-primary-rgb), 0.3);
          font-family: var(--font-mono);
          white-space: nowrap;
        }
      }
    }
    
    @media (max-width: 639px) {
      .timeline-item {
        padding-left: calc(var(--spacing-2xl) + var(--spacing-md));
      }
      
      .timeline-line {
        left: 0.75rem;
      }
      
      .timeline-marker {
        width: var(--spacing-lg);
        height: var(--spacing-lg);
        
        mat-icon {
          font-size: var(--font-size-base);
          width: var(--font-size-base);
          height: var(--font-size-base);
        }
      }
      
      .timeline-content .timeline-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-xs);
        
        .period {
          font-size: var(--font-size-xs);
        }
      }
    }
  `]
})
export class TimelineComponent {
  items = input.required<TimelineItem[]>();
}