import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (req.url.search('auth/register/') != -1) {
          return next.handle(req);
        }
        let token = user ? user.accessToken : '';
        const modifiedReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
