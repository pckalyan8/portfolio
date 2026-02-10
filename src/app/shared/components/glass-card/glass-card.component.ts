import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <mat-card [class.terminal-window]="terminalStyle()" class="glass-card">
      <ng-content />
    </mat-card>
  `,
  styles: [`
    .glass-card {
      margin-bottom: var(--spacing-lg);
      
      &.terminal-window {
        padding-top: calc(var(--spacing-xl) + var(--terminal-header-height)) !important;
      }
    }
  `]
})
export class GlassCardComponent {
  terminalStyle = input<boolean>(false);
}