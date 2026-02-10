import { Component, signal, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
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
        <textarea matInput formControlName="message" rows="6" placeholder="Your message"></textarea>
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
            Sending...
          </ng-container>
        } @else {
          <ng-container>
            <mat-icon>send</mat-icon>
            Send Message
          </ng-container>
        }
      </button>
    </form>
  `,
  styles: [`
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 600px;
      
      mat-form-field {
        width: 100%;
      }
      
      button {
        align-self: flex-start;
        
        mat-icon {
          margin-right: 0.5rem;
        }
      }
    }
  `]
})
export class ContactFormComponent {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  
  submitMessage = output<ContactMessage>();
  
  submitting = signal(false);
  
  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });
  
  async onSubmit() {
    if (this.contactForm.valid) {
      this.submitting.set(true);
      
      // Simulate API call
      setTimeout(() => {
        this.submitMessage.emit(this.contactForm.value);
        this.snackBar.open('Message sent successfully!', 'Close', {
          duration: 3000
        });
        this.contactForm.reset();
        this.submitting.set(false);
      }, 1500);
    }
  }
}