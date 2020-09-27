import { Injectable } from '@angular/core'
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router'
import { catchError } from 'rxjs/operators';
import { Cookies } from '@cedx/ngx-cookies';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router,
        private cookies: Cookies) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((response: any) => {
                if (response instanceof HttpErrorResponse && response.status === 401) {
                    this.cookies.remove('token');
                    this.router.navigateByUrl('/login');
                }
                return throwError(response);
            })
        )
    }
}