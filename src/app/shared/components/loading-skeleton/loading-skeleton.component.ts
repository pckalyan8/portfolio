import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  template: `
    <div 
      class="skeleton" 
      [class.skeleton-circle]="circle()"
      [style.height.rem]="height() / 16"
      [style.width]="width() ? (width() / 16) + 'rem' : '100%'"
    >
      <div class="skeleton-shimmer"></div>
    </div>
  `,
  styles: [`
    .skeleton {
      background: rgba(var(--color-primary-rgb), 0.1);
      border-radius: var(--radius-sm);
      position: relative;
      overflow: hidden;
      
      &.skeleton-circle {
        border-radius: var(--radius-full);
      }
      
      .skeleton-shimmer {
        position: absolute;
        top: 0;
        left: -100%;
        height: 100%;
        width: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(var(--color-primary-rgb), 0.2),
          transparent
        );
        animation: shimmer 1.5s infinite;
      }
    }
    
    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }
  `]
})
export class LoadingSkeletonComponent {
  height = input<number>(20);
  width = input<number>(0); // 0 means 100%
  circle = input<boolean>(false);
}