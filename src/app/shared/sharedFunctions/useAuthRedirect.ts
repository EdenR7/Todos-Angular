import { inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

export function useAuthRedirect() {
  const authService = inject(AuthService);
  const router = inject(Router);

  effect(() => {
    if (authService.loggedInUser() === null) {
      router.navigate(['/']);
    }
  });
}
