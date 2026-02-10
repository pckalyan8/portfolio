import { Component, input, signal, effect } from '@angular/core';

@Component({
  selector: 'app-animated-counter',
  standalone: true,
  template: `
    <div class="counter">
      <span class="counter-value">{{ displayValue() }}</span>
      @if (suffix()) {
        <span class="counter-suffix">{{ suffix() }}</span>
      }
    </div>
  `,
  styles: [`
    .counter {
      font-family: var(--font-mono);
      
      .counter-value {
        font-size: var(--font-size-4xl);
        color: var(--color-primary);
        font-weight: var(--font-weight-bold);
        text-shadow: var(--text-shadow-glow);
      }
      
      .counter-suffix {
        font-size: var(--font-size-2xl);
        color: var(--color-accent);
        margin-left: var(--spacing-xs);
        font-weight: var(--font-weight-semibold);
      }
    }
  `]
})
export class AnimatedCounterComponent {
  target = input.required<number>();
  duration = input<number>(2000);
  suffix = input<string>('');
  
  displayValue = signal<string>('0');
  
  constructor() {
    effect(() => {
      this.animateCounter();
    });
  }
  
  private animateCounter() {
    const targetVal = this.target();
    const durationMs = this.duration();
    const startTime = Date.now();
    const startValue = 0;
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / durationMs, 1);
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentValue = Math.floor(startValue + (targetVal - startValue) * easeOutQuad(progress));
      
      this.displayValue.set(currentValue.toLocaleString());
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }
}