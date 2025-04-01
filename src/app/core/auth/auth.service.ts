import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { LoggedInUserI } from './types/user.interface';
import {
  UserLoginReqValuesI,
  UserLoginResValuesI,
  UserRegisterReqValuesI,
} from './types/auth.interface';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = signal<LoggedInUserI | null | undefined>(undefined);
  user = this._user.asReadonly();
  authUrl = environment.apiUrl + 'auth/';
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(data: UserLoginReqValuesI): Observable<LoggedInUserI> {
    return this.http
      .post<UserLoginResValuesI>(this.authUrl + 'login/', data)
      .pipe(
        tap((user) => {
          this.localStorageService.set('token', user.token);
        }),
        map(({ token, ...user }) => user)
      );
  }

  register(data: UserRegisterReqValuesI): Observable<LoggedInUserI> {
    return this.http.post<LoggedInUserI>(this.authUrl + 'regiser/', data);
  }
}
