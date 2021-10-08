import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationService } from '../notification/notification.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {
  static readonly GENERIC: string = 'Ocurrio un error.';
  static readonly REFRESH_PAGE: string = 'Refresque la pagina.';
  static readonly DEFAULT_ERROR_TITLE: string = 'Haga click en Ir al Inicio.';
  static readonly USER_ERROR: string = 'Usuario y/o contraseña incorrecto';
  static readonly NOT_ALLOWED: string = 'Acceso denegado';
  static readonly NO_CONNECTION: string = 'Dominio incorrecto';

  constructor(private injector: Injector, private zone: NgZone) {}

  public handleError(error: any) {
    console.log(error);
    const auth = this.injector.get(AuthService);
    const router = this.injector.get(Router);
    const httpErrorCode = error.status;
    switch (httpErrorCode) {
      case 0:
        this.showError(ErrorService.NO_CONNECTION);
        this.zone.run(() => router.navigate(['/login']));
        break;
      case 400:
        auth.logout();
        this.showError(error.message);
        this.zone.run(() => router.navigate(['/login']));
        break;
      case 401:
        auth.logout();
        this.showError(ErrorService.USER_ERROR);
        this.zone.run(() => router.navigate(['/login']));
        break;
      case 403:
        this.showError(ErrorService.NOT_ALLOWED);
        auth.logout();
        this.zone.run(() => router.navigate(['/login']));
        break;
      case 404:
        this.showError(ErrorService.NO_CONNECTION);
        auth.logout();
        this.zone.run(() => router.navigate(['/login']));
        break;
      default:
        this.zone.run(() => router.navigate(['/login']));
    }
  }

  private showError(message: string) {
    const notificationService = this.injector.get(NotificationService);
    notificationService.addToast({
      msg: ErrorService.GENERIC + ' ' + message,
      success: false
    });
  }
}
