import { Injectable } from '@angular/core';
import {
  ToastaService,
  ToastaConfig,
  ToastOptions,
  ToastData
} from 'ngx-toasta';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private toastaService: ToastaService,
    private toastaConfig: ToastaConfig
  ) {
    this.toastaConfig.theme = 'material';
  }

  addToast(response) {
    // Just add default Toast with title only
    // this.toastaService.default('Hola Usuario');
    // Or create the instance of ToastOptions
    const toastOptions: ToastOptions = {
      title: 'Notificacion',
      msg: response.msg,
      showClose: true,
      timeout: 3500,
      theme: 'material'
      /* onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function(toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      } */
    };
    if (response.success) {
      this.toastaService.success(toastOptions);
    } else {
      this.toastaService.error(toastOptions);
    }
    // Add see all possible types in one shot
    // this.toastaService.info(toastOptions);
    // this.toastaService.wait(toastOptions);
    // this.toastaService.warning(toastOptions);
  }
}
