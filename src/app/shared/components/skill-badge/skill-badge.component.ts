import { Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

export interface SkillBadge {
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon?: string;
}

@Component({
  selector: 'app-skill-badge',
  standalone: true,
  imports: [MatChipsModule, MatIconModule],
  template: `
    <div class="skill-badge" [class]="'level-' + skill().level">
      @if (skill().icon) {
        <mat-icon>{{ skill().icon }}</mat-icon>
      }
      <span class="skill-name">{{ skill().name }}</span>
      @if (skill().level && showLevel()) {
        <span class="skill-level">{{ skill().level }}</span>
      }
    </div>
  `,
  styles: [`
    .skill-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: rgba(76, 175, 80, 0.15);
      border: 1px solid rgba(76, 175, 80, 0.3);
      border-radius: 20px;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(76, 175, 80, 0.25);
        border-color: #4caf50;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
      }
      
      mat-icon {
        font-size: 1.2rem;
        width: 1.2rem;
        height: 1.2rem;
        color: #4caf50;
      }
      
      .skill-name {
        color: #e0e0e0;
        font-weight: 500;
      }
      
      .skill-level {
        font-size: 0.75rem;
        padding: 0.15rem 0.5rem;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.1);
        text-transform: uppercase;
      }
      
      &.level-beginner {
        border-color: rgba(255, 193, 7, 0.5);
        .skill-level { color: #ffc107; }
      }
      
      &.level-intermediate {
        border-color: rgba(33, 150, 243, 0.5);
        .skill-level { color: #2196f3; }
      }
      
      &.level-advanced {
        border-color: rgba(76, 175, 80, 0.5);
        .skill-level { color: #4caf50; }
      }
      
      &.level-expert {
        border-color: rgba(156, 39, 176, 0.5);
        .skill-level { color: #9c27b0; }
      }
    }
  `]
})
export class SkillBadgeComponent {
  skill = input.required<SkillBadge>();
  showLevel = input<boolean>(false);
}