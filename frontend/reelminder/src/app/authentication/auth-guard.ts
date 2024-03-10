import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IsAuthenticatedService {
  constructor(private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.user.pipe(
      map((user) => {
        return !!user;
      })
    );
  }
}

export const isAuthenticated: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | Promise<boolean> | Observable<boolean> => {
  /**
   * Guard activates only if user is authenticated
   */
  return inject(IsAuthenticatedService).canActivate(next, state);
};

@Injectable({ providedIn: 'root' })
export class IsNotAuthenticatedService {
  constructor(private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.user.pipe(
      map((user) => {
        return !user;
      })
    );
  }
}

export const isNotAuthenticated: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | Promise<boolean> | Observable<boolean> => {
  /**
   * Guard activates only if user is not authenticated
   */
  return inject(IsNotAuthenticatedService).canActivate(next, state);
};
