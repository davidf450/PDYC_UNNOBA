import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    const idToken = authService.getToken();

    if (idToken) {
      let cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + idToken)
      });

      if (!req.headers.has('Content-Type')) {
        cloned = req.clone({
          headers: req.headers.set('Content-Type', 'application/json')
        });
      }

      cloned = req.clone({
        headers: req.headers.set('Accept', '*')
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
