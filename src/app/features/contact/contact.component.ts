import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { GlassCardComponent } from '../../shared/components/glass-card/glass-card.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { SocialLinksComponent, SocialLink } from '../../shared/components/social-links/social-links.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    GlassCardComponent,
    PageHeaderComponent,
    SocialLinksComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="contact-container container">
      <app-page-header 
        command="cat contact.txt"
        title="Get in Touch"
        description="Let's work together on something amazing"
        icon="mail"
      />
      
      <div class="contact-grid">
        <app-glass-card [terminalStyle]="true">
          <h2>Send a Message</h2>
          
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
            <mat-form-field appearance="outline">
              <mat-label>Name</mat-label>
              <input matInput formControlName="name" placeholder="Your name">
              <mat-icon matPrefix>person</mat-icon>
              @if (contactForm.get('name')?.hasError('required') && contactForm.get('name')?.touched) {
                <mat-error>Name is required</mat-error>
              }
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" placeholder="your@email.com">
              <mat-icon matPrefix>email</mat-icon>
              @if (contactForm.get('email')?.hasError('required') && contactForm.get('email')?.touched) {
                <mat-error>Email is required</mat-error>
              }
              @if (contactForm.get('email')?.hasError('email') && contactForm.get('email')?.touched) {
                <mat-error>Invalid email format</mat-error>
              }
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Subject</mat-label>
              <input matInput formControlName="subject" placeholder="Subject">
              <mat-icon matPrefix>subject</mat-icon>
              @if (contactForm.get('subject')?.hasError('required') && contactForm.get('subject')?.touched) {
                <mat-error>Subject is required</mat-error>
              }
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Message</mat-label>
              <textarea matInput formControlName="message" rows="5" placeholder="Your message"></textarea>
              <mat-icon matPrefix>message</mat-icon>
              @if (contactForm.get('message')?.hasError('required') && contactForm.get('message')?.touched) {
                <mat-error>Message is required</mat-error>
              }
            </mat-form-field>
            
            <button 
              mat-raised-button 
              color="primary" 
              type="submit"
              [disabled]="contactForm.invalid || submitting()"
            >
              @if (submitting()) {
                <ng-container>
                  <mat-icon>hourglass_empty</mat-icon>
                  <span>Sending...</span>
                </ng-container>
              } @else {
                <ng-container>
                  <mat-icon>send</mat-icon>
                  <span>Send Message</span>
                </ng-container>
              }
            </button>
          </form>
        </app-glass-card>
        
        <div class="contact-info-wrapper">
          <app-glass-card>
            <h2>Contact Information</h2>
            
            <div class="info-items">
              <div class="info-item">
                <mat-icon>email</mat-icon>
                <div class="info-content">
                  <h3>Email</h3>
                  <a href="mailto:your.email@example.com">your.email@example.com</a>
                </div>
              </div>
              
              <div class="info-item">
                <mat-icon>location_on</mat-icon>
                <div class="info-content">
                  <h3>Location</h3>
                  <p>Your City, Country</p>
                </div>
              </div>
              
              <div class="info-item">
                <mat-icon>schedule</mat-icon>
                <div class="info-content">
                  <h3>Response Time</h3>
                  <p>Usually within 24 hours</p>
                </div>
              </div>
            </div>
          </app-glass-card>
          
          <app-glass-card>
            <h2>Connect</h2>
            <p class="social-description">Find me on social media</p>
            <app-social-links [links]="socialLinks()" />
          </app-glass-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-container {
      max-width: var(--container-xl);
      margin: 0 auto;
      padding: var(--spacing-xl);
      
      @media (max-width: 639px) {
        padding: var(--spacing-md);
      }
    }
    
    .contact-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: var(--spacing-2xl);
      
      @media (max-width: 1023px) {
        grid-template-columns: 1fr;
      }
    }
    
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      
      mat-form-field {
        width: 100%;
      }
      
      button {
        align-self: flex-start;
        
        mat-icon {
          margin-right: var(--spacing-sm);
        }
      }
    }
    
    .contact-info-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
    }
    
    .info-items {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
      
      .info-item {
        display: flex;
        gap: var(--spacing-md);
        align-items: flex-start;
        
        mat-icon {
          color: var(--color-primary);
          font-size: var(--font-size-2xl);
          width: var(--font-size-2xl);
          height: var(--font-size-2xl);
          flex-shrink: 0;
        }
        
        .info-content {
          h3 {
            color: var(--color-primary);
            font-size: var(--font-size-base);
            margin-bottom: var(--spacing-xs);
          }
          
          p, a {
            color: var(--color-text-primary);
            font-size: var(--font-size-sm);
            margin: 0;
          }
          
          a {
            color: var(--color-accent);
            
            &:hover {
              color: var(--color-primary-light);
            }
          }
        }
      }
    }
    
    .social-description {
      color: var(--color-text-secondary);
      font-size: var(--font-size-sm);
      margin-bottom: var(--spacing-md);
    }
  `]
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  
  submitting = signal(false);
  
  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });
  
  socialLinks = signal<SocialLink[]>([
    { name: 'GitHub', url: 'https://github.com/yourusername', icon: 'code', color: 'var(--color-primary)' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: 'work', color: 'var(--color-secondary)' },
    { name: 'Dev.to', url: 'https://dev.to/yourusername', icon: 'article', color: 'var(--color-accent)' },
    { name: 'Twitter', url: 'https://twitter.com/yourusername', icon: 'tag', color: 'var(--color-primary-light)' }
  ]);
  
  async onSubmit() {
    if (this.contactForm.valid) {
      this.submitting.set(true);
      
      // Simulate API call
      setTimeout(() => {
        this.snackBar.open('Message sent successfully! I\'ll get back to you soon.', 'Close', {
          duration: 5000
        });
        this.contactForm.reset();
        this.submitting.set(false);
      }, 1500);
    }
  }
}