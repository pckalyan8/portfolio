import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    GlassCardComponent,
    PageHeaderComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="projects-container container">
      <app-page-header 
        command="git log --all --projects"
        title="My Projects"
        description="A showcase of my work across full-stack development, AI, and quantum computing"
        icon="work"
      />
      
      <div class="projects-grid">
        @for (project of projects(); track project.title) {
          <app-glass-card>
            <div class="project-card">
              @if (project.image) {
                <img [src]="project.image" [alt]="project.title" class="project-image" />
              }
              
              <h2>{{ project.title }}</h2>
              <p>{{ project.description }}</p>
              
              <div class="tech-stack">
                @for (tech of project.technologies; track tech) {
                  <span class="tech-chip">{{ tech }}</span>
                }
              </div>
              
              <div class="project-actions">
                @if (project.github) {
                  <a mat-button [href]="project.github" target="_blank">
                    <mat-icon>code</mat-icon> Code
                  </a>
                }
                @if (project.demo) {
                  <a mat-raised-button color="primary" [href]="project.demo" target="_blank">
                    <mat-icon>launch</mat-icon> Demo
                  </a>
                }
              </div>
            </div>
          </app-glass-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .projects-container {
      max-width: var(--container-xl);
      margin: 0 auto;
      padding: var(--spacing-xl);
      
      @media (max-width: 639px) {
        padding: var(--spacing-md);
      }
    }
    
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: var(--spacing-2xl);
      
      @media (max-width: 639px) {
        grid-template-columns: 1fr;
      }
    }
    
    .project-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      
      .project-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: var(--radius-md);
        margin-bottom: var(--spacing-md);
        border: 1px solid var(--glass-border);
      }
      
      h2 {
        color: var(--color-primary);
        margin-bottom: var(--spacing-md);
        font-size: var(--font-size-xl);
      }
      
      p {
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-lg);
        line-height: var(--line-height-relaxed);
        flex: 1;
      }
      
      .tech-stack {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-lg);
        
        .tech-chip {
          background: rgba(var(--color-primary-rgb), 0.2);
          color: var(--color-primary-light);
          padding: var(--spacing-xs) var(--spacing-md);
          border-radius: var(--radius-full);
          font-size: var(--font-size-xs);
          border: 1px solid rgba(var(--color-primary-rgb), 0.3);
          font-family: var(--font-mono);
          font-weight: var(--font-weight-medium);
        }
      }
      
      .project-actions {
        display: flex;
        gap: var(--spacing-md);
        margin-top: auto;
        
        a mat-icon {
          margin-right: var(--spacing-xs);
        }
      }
    }
  `]
})
export class ProjectsComponent {
  projects = signal<Project[]>([
    {
      title: 'AI-Powered Chat Application',
      description: 'Real-time chat with AI assistant using Angular, Spring Boot, and WebSockets',
      technologies: ['Angular', 'Spring Boot', 'WebSocket', 'AWS', 'TensorFlow'],
      github: 'https://github.com/yourusername/ai-chat',
      demo: 'https://ai-chat-demo.com'
    },
    {
      title: 'Quantum Algorithm Simulator',
      description: 'Web-based quantum computing simulator built with Qiskit and Angular',
      technologies: ['Angular', 'Python', 'Qiskit', 'Docker'],
      github: 'https://github.com/yourusername/quantum-sim'
    },
    {
      title: 'Microservices E-commerce Platform',
      description: 'Scalable e-commerce platform with microservices architecture',
      technologies: ['Angular', 'Spring Boot', 'AWS', 'Docker', 'Kubernetes'],
      github: 'https://github.com/yourusername/ecommerce'
    }
  ]);
}