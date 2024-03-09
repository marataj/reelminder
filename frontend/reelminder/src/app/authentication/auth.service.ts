import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthResponseData, LoginData, RegisterData, User } from './auth.model';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  readonly AUTH_UTL: string = 'http://127.0.0.1:8000/auth/';

  constructor(private httpClient: HttpClient, private router: Router) {}

  register(user: RegisterData): Observable<any> {
    return this.httpClient.post(this.AUTH_UTL + 'register/', user);
  }
  login(user: LoginData): Observable<any> {
    return this.httpClient.post(this.AUTH_UTL + 'login/', user);
  }

  autoLogin() {
    const userData: {
      _accessToken: string;
      _refreshToken: string;
      username: string;
      email: string;
      _expirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData._accessToken,
      userData._refreshToken,
      userData.username,
      userData.email,
      new Date(userData._expirationDate)
    );

    if (loadedUser.is_valid) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['']);
  }

  handleAuthentication(authResponse: AuthResponseData) {
    const user = new User(
      authResponse.access,
      authResponse.refresh,
      authResponse.username,
      authResponse.email,
      new Date(new Date().getTime() + authResponse.access_lifetime_s * 1000)
    );
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
