import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-terminal-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <mat-toolbar class="terminal-header">
      <div class="header-content">
        <div class="logo">
          <span class="prompt">root@portfolio:~$</span>
          <span class="cursor">_</span>
        </div>
        
        <nav class="desktop-nav">
          <a mat-button routerLink="/home" routerLinkActive="active">
            <mat-icon>home</mat-icon> ./home
          </a>
          <a mat-button routerLink="/about" routerLinkActive="active">
            <mat-icon>person</mat-icon> ./about
          </a>
          <a mat-button routerLink="/skills" routerLinkActive="active">
            <mat-icon>code</mat-icon> ./skills
          </a>
          <a mat-button routerLink="/projects" routerLinkActive="active">
            <mat-icon>work</mat-icon> ./projects
          </a>
          <a mat-button routerLink="/blog" routerLinkActive="active">
            <mat-icon>article</mat-icon> ./blog
          </a>
          <a mat-button routerLink="/contact" routerLinkActive="active">
            <mat-icon>mail</mat-icon> ./contact
          </a>
        </nav>
        
        <button mat-icon-button class="mobile-menu" [matMenuTriggerFor]="menu">
          <mat-icon>menu</mat-icon>
        </button>
        
        <mat-menu #menu="matMenu">
          <a mat-menu-item routerLink="/home"><mat-icon>home</mat-icon> Home</a>
          <a mat-menu-item routerLink="/about"><mat-icon>person</mat-icon> About</a>
          <a mat-menu-item routerLink="/skills"><mat-icon>code</mat-icon> Skills</a>
          <a mat-menu-item routerLink="/projects"><mat-icon>work</mat-icon> Projects</a>
          <a mat-menu-item routerLink="/blog"><mat-icon>article</mat-icon> Blog</a>
          <a mat-menu-item routerLink="/contact"><mat-icon>mail</mat-icon> Contact</a>
        </mat-menu>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .terminal-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: var(--z-fixed);
      background: rgba(18, 18, 18, 0.95) !important;
      backdrop-filter: blur(var(--glass-blur));
      border-bottom: 1px solid var(--glass-border);
      height: var(--navbar-height);
      
      // Fix scroll glitch
      transform: translateZ(0);
      will-change: transform;
      backface-visibility: hidden;
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: var(--container-2xl);
      margin: 0 auto;
      padding: 0 var(--spacing-md);
    }
    
    .logo {
      font-family: var(--font-mono);
      font-size: var(--font-size-lg);
      color: var(--color-primary);
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      font-weight: var(--font-weight-semibold);
      
      .prompt {
        text-shadow: var(--glow-primary);
      }
      
      .cursor {
        animation: blink 1s infinite;
      }
    }
    
    .desktop-nav {
      display: flex;
      gap: var(--spacing-xs);
      
      a {
        font-family: var(--font-mono);
        color: var(--color-text-primary);
        transition: all var(--transition-normal);
        font-size: var(--font-size-sm);
        padding: var(--spacing-xs) var(--spacing-sm);
        
        &.active {
          color: var(--color-primary);
          background: rgba(var(--color-primary-rgb), 0.1);
        }
        
        &:hover {
          color: var(--color-primary-light);
          background: rgba(var(--color-primary-rgb), 0.05);
          box-shadow: var(--glow-primary);
        }
        
        mat-icon {
          margin-right: var(--spacing-xs);
          font-size: var(--font-size-base);
          width: var(--font-size-base);
          height: var(--font-size-base);
        }
      }
    }
    
    .mobile-menu {
      display: none;
    }
    
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    
    @media (max-width: 1023px) {
      .desktop-nav {
        display: none;
      }
      
      .mobile-menu {
        display: block;
      }
    }
  `]
})
export class TerminalHeaderComponent {}