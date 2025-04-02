import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generic-home',
  imports: [],
  templateUrl: './generic-home.component.html',
  styleUrl: './generic-home.component.scss',
})
export class GenericHomeComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) this.router.navigate(['/todos']);
  }
}
