import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            loadComponent: () =>
              import('./core/auth/components/login/login.component').then(
                (m) => m.LoginComponent
              ),
          },
          {
            path: 'register',
            loadComponent: () =>
              import('./core/auth/components/register/register.component').then(
                (m) => m.RegisterComponent
              ),
          },
        ],
      },
    ],
  },
];
