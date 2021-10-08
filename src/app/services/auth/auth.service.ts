import { Injectable } from '@angular/core';

import * as moment from 'moment-timezone';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { share, map, catchError,tap } from 'rxjs/operators';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private myHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  constructor(
    private http: HttpClient,
    private notificatioService: NotificationService
  ) {
    moment.tz.link('America/Argentina/Buenos_Aires|America/Buenos_Aires');
  }

  login(credentials: any) {
    return this.http
      .post<any>( '/auth', credentials, {
        headers: this.myHeaders
      })
      .do(res => this.setSession(res))
      .shareReplay();
  }

  private setSession(authResult) {
    const decoder = new JwtHelperService();
    let token;
    console.log(authResult.authToken.startsWith('Bearer '));
    if (authResult.authToken.startsWith('Bearer ')) {
      token = authResult.authToken.substring(7, authResult.length);
    } else {
      // Error
      throw new Error('Not a valid token');
    }
    localStorage.setItem('token', token);

    const decodedToken = decoder.decodeToken(token);
    const expiresAt = moment().add(decodedToken.exp, 'second');
    const email = decodedToken.sub;
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf())); 
    localStorage.setItem('email', email);
  }

  logout() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  refreshToken(): Observable<string> {
    const url = 'url to refresh token here'; 

    const refreshToken = localStorage.getItem('refreshToken');
    const expiredToken = localStorage.getItem('token');

    return this.http
      .get(url, {
        headers: new HttpHeaders()
          .set('refreshToken', refreshToken)
          .set('token', expiredToken),
        observe: 'response'
      })
      .pipe(
        share(), 
        map(res => {
          const token = res.headers.get('token');
          const newRefreshToken = res.headers.get('refreshToken');

          localStorage.setItem('refreshToken', newRefreshToken);
          localStorage.setItem('token', token);

          return token;
        })
      );
  }

  getToken(): Observable<string> {
    const decoder = new JwtHelperService();

    const token = localStorage.getItem('token');
    const isTokenExpired = decoder.isTokenExpired(token);

    if (!isTokenExpired) {
      return of(token);
    }

    return this.refreshToken();
  }
}
