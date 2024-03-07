import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterData } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly AUTH_UTL: string = 'http://127.0.0.1:8000/auth/';

  constructor(private httpClient: HttpClient) {}

  register(user: RegisterData): Observable<any> {
    return this.httpClient.post(this.AUTH_UTL + 'register/', user);
  }
}
