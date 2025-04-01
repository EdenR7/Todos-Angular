// src/app/config/app-init.ts
import { APP_INITIALIZER, Provider } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';

export const appInitializer: Provider = {
  provide: APP_INITIALIZER,
  useFactory: (auth: AuthService) => () => auth.getUser(),
  deps: [AuthService],
  multi: true,
};
