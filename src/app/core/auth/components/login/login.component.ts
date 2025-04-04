import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import { UiButtonComponent } from '../../../../shared/ui/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  async onSubmit() {
    const { email, password } = this.form.value;
    if (this.form.invalid || !password || !email) return;
    this.authService.login({ email, password }).subscribe({
      next: (user) => {
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.error('login Failed', error);
      },
    });
  }
}
