import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Cookies } from '@cedx/ngx-cookies';
import { CookieOptions } from '@cedx/ngx-cookies';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private loginUrl = environment.apiUrl + 'auth/login';
    private signUpUrl = environment.apiUrl + 'users';

    constructor(private http: HttpClient,
        private cookies: Cookies) { }

    authenticateUser(login: string, password: string): Observable<any> {
        let body = { login: login, password: password };
        return this.http.post(this.loginUrl, body);
    }

    getToken() {
        return this.cookies.get('token');
    }

    loadUserByToken() {
        const url = environment.apiUrl + 'users/me';
        return this.http.get(url);
    }

    
}