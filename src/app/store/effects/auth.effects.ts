import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs'
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Cookies } from '@cedx/ngx-cookies';
import { CookieOptions } from '@cedx/ngx-cookies';

import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
  LogOut,
  GetStatus,
} from '../actions/auth.actions';
import { AuthenticationService } from '../../core/services/authentication.service';
import { User } from '../../models/User';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private cookies: Cookies,
    private authService: AuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap((payload: any) => {
      return this.authService.authenticateUser(payload.login, payload.password)
        .pipe(
          tap((authResult) => {
            this.cookies.set('token', authResult.token, new CookieOptions({
              path: '/'
            }));
          }),
          switchMap(() => {
            return this.authService.loadUserByToken()
              .pipe(
                map((user: User) => {
                  return new LogInSuccess({ user: user });
                }));
          }),
          catchError((error) => {
            return of(new LogInFailure({ error: error }));
          }));
    }));

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((authResult) => {
      if (this.router.url.includes('/login')) {
        this.router.navigateByUrl('/sensors');
      }
    }));

  @Effect({ dispatch: false })
  AuthFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      this.cookies.remove('token');
      this.router.navigateByUrl('/login');
    })
  );

  @Effect()
  GetStatus: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.GET_STATUS),
    map((action: LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.loadUserByToken().pipe(
        map((user) => {
          return new LogInSuccess({ user: user });
        }),
        catchError((error) => {
          return of(new LogInFailure({ error: error }));
        }));
    }));
}
