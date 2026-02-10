import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [GlassCardComponent, PageHeaderComponent, MatIconModule, MatProgressBarModule],
  template: `
    <div class="skills-container container">
      <app-page-header 
        command="cat skills.json"
        title="Technical Skills"
        description="A comprehensive overview of my technical expertise across different domains"
        icon="code"
      />
      
      @for (category of skillCategories(); track category.category) {
        <app-glass-card>
          <div class="category-header">
            <mat-icon>{{ category.icon }}</mat-icon>
            <h2>{{ category.category }}</h2>
          </div>
          
          <div class="skills-grid">
            @for (skill of category.skills; track skill.name) {
              <div class="skill-item">
                <div class="skill-header">
                  <div class="skill-name-wrapper">
                    <mat-icon class="skill-icon">{{ skill.icon }}</mat-icon>
                    <span class="skill-name">{{ skill.name }}</span>
                  </div>
                  <span class="skill-percentage">{{ skill.level }}%</span>
                </div>
                <div class="progress-wrapper">
                  <mat-progress-bar 
                    mode="determinate" 
                    [value]="skill.level"
                    [color]="getProgressColor(skill.level)">
                  </mat-progress-bar>
                </div>
              </div>
            }
          </div>
        </app-glass-card>
      }
    </div>
  `,
  styles: [`
    .skills-container {
      max-width: var(--container-xl);
      margin: 0 auto;
      padding: var(--spacing-xl);
      
      @media (max-width: 639px) {
        padding: var(--spacing-md);
      }
    }
    
    .category-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-2xl);
      
      mat-icon {
        font-size: var(--font-size-4xl);
        width: var(--font-size-4xl);
        height: var(--font-size-4xl);
        color: var(--color-primary);
        filter: drop-shadow(var(--glow-primary));
      }
      
      h2 {
        margin: 0;
        color: var(--color-primary);
      }
    }
    
    .skills-grid {
      display: grid;
      gap: var(--spacing-lg);
    }
    
    .skill-item {
      padding: var(--spacing-md);
      background: rgba(var(--color-primary-rgb), 0.03);
      border-radius: var(--radius-md);
      border: 1px solid transparent;
      transition: all var(--transition-normal);
      
      &:hover {
        background: rgba(var(--color-primary-rgb), 0.08);
        border-color: var(--glass-border);
        transform: translateX(var(--spacing-xs));
      }
      
      .skill-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-sm);
        
        .skill-name-wrapper {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          
          .skill-icon {
            font-size: var(--font-size-lg);
            width: var(--font-size-lg);
            height: var(--font-size-lg);
            color: var(--color-primary);
          }
          
          .skill-name {
            font-weight: var(--font-weight-medium);
            color: var(--color-text-primary);
            font-size: var(--font-size-base);
          }
        }
        
        .skill-percentage {
          color: var(--color-primary);
          font-weight: var(--font-weight-semibold);
          font-family: var(--font-mono);
          font-size: var(--font-size-sm);
        }
      }
      
      .progress-wrapper {
        mat-progress-bar {
          height: var(--progress-bar-height);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }
      }
    }
  `]
})
export class SkillsComponent {
  skillCategories = signal<SkillCategory[]>([
    {
      category: 'Frontend Development',
      icon: 'web',
      skills: [
        { name: 'Angular', level: 95, icon: 'arrow_forward' },
        { name: 'TypeScript', level: 90, icon: 'code' },
        { name: 'RxJS', level: 85, icon: 'sync' },
        { name: 'Angular Material', level: 90, icon: 'palette' },
        { name: 'HTML5/CSS3/SCSS', level: 95, icon: 'html' }
      ]
    },
    {
      category: 'Backend Development',
      icon: 'dns',
      skills: [
        { name: 'Java', level: 90, icon: 'coffee' },
        { name: 'Spring Boot', level: 85, icon: 'spa' },
        { name: 'REST APIs', level: 90, icon: 'api' },
        { name: 'Microservices', level: 80, icon: 'hub' },
        { name: 'SQL/NoSQL', level: 85, icon: 'storage' }
      ]
    },
    {
      category: 'Cloud & DevOps',
      icon: 'cloud',
      skills: [
        { name: 'AWS (EC2, S3, Lambda)', level: 85, icon: 'cloud_queue' },
        { name: 'Docker', level: 80, icon: 'widgets' },
        { name: 'CI/CD', level: 75, icon: 'autorenew' },
        { name: 'Git', level: 90, icon: 'account_tree' }
      ]
    },
    {
      category: 'AI & Machine Learning',
      icon: 'psychology',
      skills: [
        { name: 'TensorFlow', level: 75, icon: 'memory' },
        { name: 'PyTorch', level: 70, icon: 'whatshot' },
        { name: 'NLP', level: 75, icon: 'chat' },
        { name: 'Computer Vision', level: 70, icon: 'visibility' }
      ]
    },
    {
      category: 'Quantum Computing',
      icon: 'science',
      skills: [
        { name: 'Qiskit', level: 65, icon: 'token' },
        { name: 'Quantum Algorithms', level: 60, icon: 'functions' },
        { name: 'Quantum ML', level: 55, icon: 'psychology' }
      ]
    }
  ]);
  
  getProgressColor(level: number): 'primary' | 'accent' | 'warn' {
    if (level >= 80) return 'primary';
    if (level >= 60) return 'accent';
    return 'warn';
  }
}