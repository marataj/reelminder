import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthResponseData, LoginData, RegisterData, User } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  readonly AUTH_UTL: string = 'http://127.0.0.1:8000/auth/';

  constructor(private httpClient: HttpClient) {}

  register(user: RegisterData): Observable<any> {
    return this.httpClient.post(this.AUTH_UTL + 'register/', user);
  }
  login(user: LoginData): Observable<any> {
    return this.httpClient.post(this.AUTH_UTL + 'login/', user);
  }

  handleAuthentication(authResponse: AuthResponseData) {
    const user = new User(authResponse);
    this.user.next(user);
  }
}
