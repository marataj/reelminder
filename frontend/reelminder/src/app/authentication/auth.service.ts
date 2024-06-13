import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, firstValueFrom } from 'rxjs';
import {
  AuthResponseData,
  ChangePasswordData,
  LoginData,
  RegisterData,
  User,
} from './auth.model';
import { Route, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Service responsible for handling authentication.
   */
  user = new BehaviorSubject<User>(null);
  readonly AUTH_UTL: string = environment.API_URL + '/auth/';
  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  register(user: RegisterData): Observable<any> {
    return this.httpClient.post(this.AUTH_UTL + 'register/', user);
  }
  login(user: LoginData): Observable<any> {
    return this.httpClient.post(this.AUTH_UTL + 'login/', user);
  }
  refreshToken(refreshToken: { refresh: string }): Observable<any> {
    return this.httpClient.post(this.AUTH_UTL + 'token/refresh/', refreshToken);
  }
  changePassword(data: ChangePasswordData): Observable<any> {
    return this.httpClient.put(this.AUTH_UTL + 'password-change/', data);
  }

  async refreshTokens(): Promise<boolean> {
    /**
     * Method responsible for refreshing the access and refresh tokens using proper endpoint,
     * updating userData in the localStorage and sends new user using user subject.
     *
     * Returns true if flow was done, false otherwise.
     */
    const userData: {
      _accessToken: string;
      _refreshToken: string;
      username: string;
      email: string;
      _lifetime_s: number;
      _expirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData'));

    let tokenPair = await firstValueFrom(
      this.refreshToken({ refresh: userData._refreshToken })
    );

    if (tokenPair.access && tokenPair.refresh) {
      const loadedUser = new User(
        tokenPair.access,
        tokenPair.refresh,
        userData.username,
        userData.email,
        userData._lifetime_s,
        new Date(userData._expirationDate)
      );
      if (loadedUser.is_valid) {
        this.user.next(loadedUser);
        localStorage.setItem('userData', JSON.stringify(loadedUser));
        let remainingTokenExpirationDuration =
          new Date(userData._expirationDate).getTime() - new Date().getTime();
        this.autoLogout(remainingTokenExpirationDuration);
        return true;
      }
    }
    return false;
  }

  autoLogin() {
    /**
     * Method responsible for automatically singing in the user, based on locally stored user data.
     */
    const userData: {
      _accessToken: string;
      _refreshToken: string;
      username: string;
      email: string;
      _lifetime_s: number;
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
      userData._lifetime_s,
      new Date(new Date().getTime() + userData._lifetime_s * 1000)
    );

    if (loadedUser.is_valid) {
      this.user.next(loadedUser);
      let remainingTokenExpirationDuration =
        new Date(userData._expirationDate).getTime() - new Date().getTime();
      this.autoLogout(remainingTokenExpirationDuration);
    } else {
      console.log('Calling from autologin');
      this.refreshTokens();
    }
  }

  autoLogout(tokenExpirationDuration) {
    /**
     * Method responsible for automatically logging out the user, after reaching the timeout.
     */
    this.tokenExpirationTimer = setTimeout(() => {
      console.log('Calling from autologout');
      if (this.refreshTokens()) {
        return;
      }
      this.logout();
    }, tokenExpirationDuration);
  }

  logout() {
    /**
     * Logout method.
     */
    this.user.next(null);
    this.router.navigate(['']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  handleAuthentication(authResponse: AuthResponseData) {
    /**
     * Method responsible for logging in the user, based on the Authentication Response.
     */
    const user = new User(
      authResponse.access,
      authResponse.refresh,
      authResponse.username,
      authResponse.email,
      authResponse.access_lifetime_s,
      new Date(new Date().getTime() + authResponse.access_lifetime_s * 1000)
    );
    this.user.next(user);
    this.autoLogout(authResponse.access_lifetime_s * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
