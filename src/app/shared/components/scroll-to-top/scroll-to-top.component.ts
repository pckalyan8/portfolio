import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    @if (showButton()) {
      <button 
        mat-fab 
        class="scroll-to-top" 
        (click)="scrollToTop()"
        color="primary"
        aria-label="Scroll to top"
      >
        <mat-icon>keyboard_arrow_up</mat-icon>
      </button>
    }
  `,
  styles: [`
    .scroll-to-top {
      position: fixed;
      bottom: var(--spacing-2xl);
      right: var(--spacing-2xl);
      z-index: var(--z-fixed);
      animation: fadeIn var(--transition-normal) ease;
      box-shadow: var(--shadow-lg), var(--glow-primary);
      
      &:hover {
        box-shadow: var(--shadow-xl), var(--glow-primary-lg);
        transform: translateY(calc(var(--spacing-xs) * -1));
      }
      
      mat-icon {
        font-size: var(--font-size-2xl);
        width: var(--font-size-2xl);
        height: var(--font-size-2xl);
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(var(--spacing-lg));
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @media (max-width: 639px) {
      .scroll-to-top {
        bottom: var(--spacing-xl);
        right: var(--spacing-md);
      }
    }
  `]
})
export class ScrollToTopComponent implements OnInit, OnDestroy {
  private document = inject(DOCUMENT);
  showButton = signal(false);
  
  ngOnInit() {
    this.document.defaultView?.addEventListener('scroll', this.onScroll.bind(this));
  }
  
  ngOnDestroy() {
    this.document.defaultView?.removeEventListener('scroll', this.onScroll.bind(this));
  }
  
  private onScroll() {
    this.showButton.set((this.document.defaultView?.scrollY || 0) > 300);
  }
  
  scrollToTop() {
    this.document.defaultView?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}