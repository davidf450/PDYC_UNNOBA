import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/app-config.service';
@Injectable({
  providedIn: 'root'
})
export class BaseUrlInterceptorService implements HttpInterceptor {
  private apiReq;
  constructor(private injector: Injector) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let url :string;//req.url;
    const env = this.injector.get(AppConfigService);
    const props = env.getConfig();
    if (!req.url.includes("assets")) {
      url = 'http://' + props.host + ':' + props.port + '/' + props.project + req.url;
    }
    this.apiReq = req.clone({ url: url });
    return next.handle(this.apiReq);
  }
}
