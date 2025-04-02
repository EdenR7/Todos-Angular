import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { AuthLayoutComponent } from './core/auth/components/auth-layout/auth-layout.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./core/generic-home/generic-home.component').then(
            (m) => m.GenericHomeComponent
          ),
      },
      {
        path: 'todos',
        loadComponent: () =>
          import('./features/todos/todos.component').then(
            (m) => m.TodosComponent
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
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
];
