import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserNameValidator } from '../shared/username-validator.directive';
import { UsersApiService } from 'src/app/api/users/users-api.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Router } from '@angular/router';
import {
  errorMessages,
  ConfirmValidParentMatcher,
  CustomValidators
} from '../shared/password-match-validator.directive';

@Component({
  selector: 'app-agregar-user',
  templateUrl: './agregar-user.component.html',
  styleUrls: ['./agregar-user.component.css']
})
export class AgregarUserComponent implements OnInit {
  datos: FormGroup;
  usuario = new Usuario();
  public title = 'Agregar Usuario';
  errors = errorMessages;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(
    private router: Router,
    public userNameValidator: UserNameValidator,
    private userApiService: UsersApiService,
    private notificationService: NotificationService,
  ) {}
  ngOnInit() {
    this.datos = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      apellido: new FormControl('', Validators.required),
      descripcion: new FormControl(''),
      user: new FormControl(null, {
        validators: Validators.required,
        asyncValidators: this.userNameValidator.validate.bind(
          this.userNameValidator
        ),
        updateOn: 'blur'
      }),
      passwordGroup: new FormGroup(
        {
          password: new FormControl('', [
            Validators.required,
            Validators.minLength(6)
          ]),
          passRepeat: new FormControl('', [Validators.required])
        },
        { validators: CustomValidators.childrenEqual }
      )
    });
  }
  get form() {
    return this.datos.controls;
  }
  get user() {
    return this.datos.get('user');
  }
  get nombre() {
    return this.datos.get('nombre');
  }
  get apellido() {
    return this.datos.get('apellido');
  }

  agregar() {
    this.usuario.nombre = this.datos.controls['nombre'].value;
    this.usuario.apellido = this.datos.controls['apellido'].value;
    this.usuario.descripcion = this.datos.controls['descripcion'].value;
    this.usuario.mail = this.datos.controls['mail'].value;
    this.usuario.password = this.datos.controls['passwordGroup'].get(
      'password'
    ).value;
    this.usuario.intentos = 0;
    this.usuario.activo = '1';
    this.userApiService.addUser(this.usuario).subscribe(res => {
      this.notificationService.addToast(res);
      console.log(res);
      if (res.success) {
        this.notificationService.addToast({
          msg: 'Usuario agregado Exitosamente',
          success: true
        });
      } else {
        this.notificationService.addToast({
          msg: 'No se pudo guardar el usuario',
          success: false
        });
      }
      this.datos.reset();
      this.usuario = new Usuario();
    });
  }
  goBack(): void {
    this.router.navigate(['/usuarios/listado']);
  }
}
