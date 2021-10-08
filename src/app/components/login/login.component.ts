import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
// import { LoggerService } from 'src/app/services/logger/logger.service';
import { EnvService } from 'src/app/services/env/env.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  getMailError() {
    return this.f.email.hasError('required')
      ? 'Debe ingresar un E-mail valido'
      : '';
  }

  getPasswordError() {
    return this.f.password.hasError('required')
      ? 'Debe ingresar el password'
      : '';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(values) {
    this.authService.login(values).subscribe(data => {
      console.log(data);
      if (data) {
        this.notificationService.addToast({
          msg: data.msg,
          success: true
        });
        this.router.navigate(['/playlist/listado']);
      } else {
        this.notificationService.addToast({
          msg: data.msg,
          success: false
        });
      }
      // this.logger.debug(
      //   'Usuario ' + this.f.user.value + ' logueado exitosamente'
      // );
      // this.router.navigate(['/welcome']);
    });
  }
}
