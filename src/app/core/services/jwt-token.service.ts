import { Injectable } from '@angular/core';
import jwt_decode from "../../../../node_modules/jwt-decode";
import { TokenPayLoad } from './token-payload';
import { from } from 'rxjs';
import { Cookies } from '@cedx/ngx-cookies'

@Injectable({ providedIn: 'root' })
export class JwtTokenService {

  constructor(private cookies: Cookies) {
  }

  decodeToken(token: string): TokenPayLoad {
    return jwt_decode(token);
  }

  getToken(): string {
    return this.cookies.get('token');
  }

  isTokenExpired(tokenPayload: TokenPayLoad): boolean {
    const expiryTime = tokenPayload.exp;
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }


}