import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { TimelineComponent, TimelineItem } from '../../shared/components/timeline/timeline.component';
import { SocialLinksComponent, SocialLink } from '../../shared/components/social-links/social-links.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    GlassCardComponent,
    PageHeaderComponent,
    TimelineComponent,
    SocialLinksComponent,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <div class="about-container container">
      <app-page-header 
        command="cat about.txt"
        title="About Me"
        description="Full Stack Developer passionate about building innovative solutions"
        icon="person"
      />
      
      <app-glass-card>
        <div class="intro-section">
          <div class="avatar-section">
            <div class="terminal-avatar">
              <div class="ascii-art">
                <pre>{{ asciiAvatar() }}</pre>
              </div>
            </div>
          </div>
          
          <div class="intro-text">
            <h2>Hello, I'm [Your Name]</h2>
            <h3>Full Stack Developer • AI Engineer • Quantum Computing Enthusiast</h3>
            
            <p>
              I'm a passionate developer with expertise in building scalable web applications
              using modern technologies. With a strong foundation in Angular and Spring Boot,
              I create robust full-stack solutions deployed on AWS.
            </p>
            
            <p>
              Beyond traditional development, I'm deeply involved in AI/ML research and
              quantum computing exploration. I believe in the convergence of classical
              and quantum computing to solve complex real-world problems.
            </p>
            
            <div class="quick-facts">
              <div class="fact">
                <mat-icon>location_on</mat-icon>
                <span>Based in [Your Location]</span>
              </div>
              <div class="fact">
                <mat-icon>work</mat-icon>
                <span>[Current Role] at [Company]</span>
              </div>
              <div class="fact">
                <mat-icon>email</mat-icon>
                <span>your.email@example.com</span>
              </div>
            </div>
            
            <div class="social-section">
              <app-social-links [links]="socialLinks()" />
            </div>
          </div>
        </div>
      </app-glass-card>
      
      <app-glass-card [terminalStyle]="true">
        <h2 class="section-title">
          <mat-icon>work_history</mat-icon>
          <span>Experience</span>
        </h2>
        <mat-divider></mat-divider>
        <app-timeline [items]="experience()" />
      </app-glass-card>
      
      <app-glass-card [terminalStyle]="true">
        <h2 class="section-title">
          <mat-icon>school</mat-icon>
          <span>Education</span>
        </h2>
        <mat-divider></mat-divider>
        <app-timeline [items]="education()" />
      </app-glass-card>
      
      <app-glass-card>
        <h2 class="section-title">
          <mat-icon>interests</mat-icon>
          <span>Interests & Hobbies</span>
        </h2>
        <mat-divider></mat-divider>
        
        <div class="interests-grid">
          @for (interest of interests(); track interest.name) {
            <div class="interest-item">
              <mat-icon>{{ interest.icon }}</mat-icon>
              <span>{{ interest.name }}</span>
            </div>
          }
        </div>
      </app-glass-card>
    </div>
  `,
  styles: [`
    .about-container {
      max-width: var(--container-xl);
      margin: 0 auto;
      padding: var(--spacing-xl);
      
      @media (max-width: 639px) {
        padding: var(--spacing-md);
      }
    }
    
    .intro-section {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: var(--spacing-2xl);
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: var(--spacing-xl);
      }
    }
    
    .avatar-section {
      .terminal-avatar {
        background: var(--glass-bg-dark);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-md);
        padding: var(--spacing-md);
        backdrop-filter: blur(var(--glass-blur-subtle));
        
        .ascii-art {
          color: var(--color-primary);
          font-size: var(--font-size-xs);
          line-height: 0.6rem;
          text-align: center;
          text-shadow: var(--glow-primary);
        }
      }
    }
    
    .intro-text {
      h2 {
        font-size: var(--font-size-3xl);
        margin-bottom: var(--spacing-sm);
        color: var(--color-primary);
      }
      
      h3 {
        color: var(--color-secondary);
        font-size: var(--font-size-lg);
        margin-bottom: var(--spacing-lg);
        font-weight: var(--font-weight-normal);
      }
      
      p {
        color: var(--color-text-primary);
        line-height: var(--line-height-loose);
        margin-bottom: var(--spacing-md);
      }
      
      .quick-facts {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
        margin: var(--spacing-2xl) 0;
        padding: var(--spacing-lg);
        background: rgba(var(--color-primary-rgb), 0.05);
        border-radius: var(--radius-md);
        border: 1px solid var(--glass-border);
        
        .fact {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--color-text-primary);
          
          mat-icon {
            color: var(--color-primary);
            font-size: var(--font-size-xl);
            width: var(--font-size-xl);
            height: var(--font-size-xl);
          }
        }
      }
      
      .social-section {
        margin-top: var(--spacing-2xl);
        padding-top: var(--spacing-xl);
        border-top: 1px solid var(--glass-border);
      }
    }
    
    .section-title {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-lg);
      
      mat-icon {
        color: var(--color-primary);
        filter: drop-shadow(var(--glow-primary));
      }
      
      span {
        color: var(--color-primary);
      }
    }
    
    mat-divider {
      margin-bottom: var(--spacing-2xl);
      border-color: var(--glass-border);
    }
    
    .interests-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-lg);
      margin-top: var(--spacing-xl);
      
      .interest-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-md);
        background: rgba(var(--color-primary-rgb), 0.05);
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-md);
        transition: all var(--transition-normal);
        
        &:hover {
          background: rgba(var(--color-primary-rgb), 0.1);
          border-color: var(--color-primary);
          transform: translateY(calc(var(--spacing-xs) * -1));
          box-shadow: var(--glow-primary);
        }
        
        mat-icon {
          color: var(--color-primary);
          font-size: var(--font-size-2xl);
          width: var(--font-size-2xl);
          height: var(--font-size-2xl);
        }
        
        span {
          color: var(--color-text-primary);
          font-weight: var(--font-weight-medium);
        }
      }
    }
  `]
})
export class AboutComponent {
  asciiAvatar = signal(`
    ▄▄▄▄▄▄▄▄▄▄▄
  ▄█████████████▄
 ███████████████
 ███████████████
 ███████████████
 ███████████████
  ▀█████████████▀
    ▀▀▀▀▀▀▀▀▀▀▀
   ███████████
   ███████████
   ███████████
  `);
  
  socialLinks = signal<SocialLink[]>([
    { name: 'GitHub', url: 'https://github.com/yourusername', icon: 'code', color: 'var(--color-primary)' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: 'work', color: 'var(--color-secondary)' },
    { name: 'Dev.to', url: 'https://dev.to/yourusername', icon: 'article', color: 'var(--color-accent)' },
    { name: 'Twitter', url: 'https://twitter.com/yourusername', icon: 'tag', color: 'var(--color-primary-light)' }
  ]);
  
  experience = signal<TimelineItem[]>([
    {
      title: 'Senior Full Stack Developer',
      subtitle: 'Tech Company Inc.',
      period: '2022 - Present',
      description: 'Leading development of enterprise web applications using Angular and Spring Boot. Architecting microservices deployed on AWS with automated CI/CD pipelines.',
      icon: 'work',
      tags: ['Angular', 'Spring Boot', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL']
    },
    {
      title: 'Full Stack Developer',
      subtitle: 'Startup Solutions',
      period: '2020 - 2022',
      description: 'Developed scalable web applications and RESTful APIs. Implemented AI-powered features using TensorFlow and integrated quantum computing experiments.',
      icon: 'code',
      tags: ['Angular', 'Java', 'Python', 'TensorFlow', 'Qiskit', 'MongoDB']
    },
    {
      title: 'Junior Developer',
      subtitle: 'Digital Agency',
      period: '2018 - 2020',
      description: 'Built responsive web applications and collaborated with design teams to create user-friendly interfaces.',
      icon: 'web',
      tags: ['Angular', 'TypeScript', 'Node.js', 'MySQL']
    }
  ]);
  
  education = signal<TimelineItem[]>([
    {
      title: 'Master of Science in Computer Science',
      subtitle: 'University Name',
      period: '2016 - 2018',
      description: 'Specialized in Artificial Intelligence and Quantum Computing',
      icon: 'school'
    },
    {
      title: 'Bachelor of Technology in Information Technology',
      subtitle: 'College Name',
      period: '2012 - 2016',
      description: 'Focus on Software Engineering and Web Technologies',
      icon: 'school'
    }
  ]);
  
  interests = signal([
    { name: 'Open Source', icon: 'code' },
    { name: 'Quantum Computing', icon: 'science' },
    { name: 'AI Research', icon: 'psychology' },
    { name: 'Technical Writing', icon: 'article' },
    { name: 'Photography', icon: 'photo_camera' },
    { name: 'Gaming', icon: 'sports_esports' }
  ]);
}