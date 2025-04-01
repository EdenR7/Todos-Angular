import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { LoggedInUserI } from './types/user.interface';
import {
  UserLoginReqValuesI,
  UserLoginResValuesI,
  UserRegisterReqValuesI,
} from './types/auth.interface';
import { Observable, tap, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = signal<LoggedInUserI | null | undefined>(undefined);
  loggedInUser = this._user.asReadonly();
  private authUrl = environment.apiUrl + 'auth/';
  private userUrl = environment.apiUrl + 'user/';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(data: UserLoginReqValuesI): Observable<LoggedInUserI> {
    return this.http
      .post<UserLoginResValuesI>(this.authUrl + 'login/', data)
      .pipe(
        tap((user) => {
          this._user.set(user);
          this.localStorageService.set('token', user.token);
        }),
        map(({ token, ...user }) => user)
      );
  }

  register(data: UserRegisterReqValuesI): Observable<LoggedInUserI> {
    return this.http.post<LoggedInUserI>(this.authUrl + 'register/', data);
  }

  async getUser(): Promise<LoggedInUserI | null> {
    console.log('Refetching user...');

    const token = this.localStorageService.get('token');
    if (!token) {
      this._user.set(null);
      return null;
    }

    try {
      const user = await this.http
        .get<UserLoginResValuesI>(this.userUrl)
        .toPromise();
      console.log(user);
      if (!user) return null;

      this._user.set(user);
      const { token: _, ...userData } = user;
      return userData;
    } catch {
      this.logout();
      return null;
    }
  }

  logout(): void {
    this._user.set(null);
    this.localStorageService.remove('token');
  }
}
