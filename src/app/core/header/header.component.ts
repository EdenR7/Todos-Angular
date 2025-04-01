import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // private routerLink = inject(RouterLink)
  private authService = inject(AuthService);
  user = computed(() => this.authService.loggedInUser());
  loggedInUser = this.user();

  logout() {
    this.authService.logout();
  }
}
