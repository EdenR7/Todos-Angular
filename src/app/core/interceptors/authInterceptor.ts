import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
// import { PersistanceService } from './persistance.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const localStorageService = inject(LocalStorageService);
  const token = localStorageService.get('token') || '';

  request = request.clone({
    setHeaders: {
      Authorization: token as string,
    },
  });

  return next(request);
};
