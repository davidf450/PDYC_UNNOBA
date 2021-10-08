// mod a importar ejem
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import {
  CustomValidators,
  ConfirmValidParentMatcher
} from '../shared/password-match-validator.directive';
import { errorMessages } from '../shared/password-match-validator.directive';

import { UsersApiService } from 'src/app/api/users/users-api.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit, AfterViewInit {
  usuario: Usuario = new Usuario();
  datos: FormGroup;
  errors = errorMessages;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userApiService: UsersApiService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit() {
    this.datos = this.formBuilder.group(this.setDatos());
    this.getUsuario();
  }
  ngAfterViewInit() {}

  agregar() {
    this.usuario.nombre = this.datos.controls['nombre'].value;
    this.usuario.apellido = this.datos.controls['apellido'].value;
    this.usuario.descripcion = this.datos.controls['descripcion'].value;
    this.usuario.mail = this.datos.controls['mail'].value;
    this.usuario.password = this.datos.controls['passwordGroup'].get('password').value;
    // TODO: mandar usuario a la base de datos
  }

  setDatos() {
    return {
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', Validators.required],
      descripcion: [''],
      user: [
        { value: '', disabled: true },
        {
          validators: Validators.required,
        }
      ],
      passwordGroup: this.formBuilder.group(
        {
          password: ['', [Validators.required, Validators.minLength(6)]],
          passRepeat: ['', Validators.required]
        },
        { validator: CustomValidators.childrenEqual }
      )
    };
  }
  getUsuario() {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.userApiService.getUserById(id).subscribe((user: Usuario) => {
        this.usuario = user;
        this.editar();
      });
    });
  }
  saveUsuario(): void {
    this.agregar();
    this.userApiService.addUser(this.usuario).subscribe(response => {
      this.notificationService.addToast(response);
      this.goBack();
    });
  }
  getPasswordError() {
    return 'La contraseña debe tener al menos 6 caracteres';
  }
  goBack(): void {
    this.router.navigate(['/usuarios/listado']);
  }
  editar() {
    this.datos.controls['nombre'].setValue(this.usuario.nombre);
    this.datos.controls['apellido'].setValue(this.usuario.apellido);
    this.datos.controls['descripcion'].setValue(this.usuario.descripcion);
    this.datos.controls['user'].setValue(this.usuario.mail);
    this.datos.controls['passwordGroup']
      .get('password')
      .setValue(this.usuario.password);
    this.datos.controls['passwordGroup']
      .get('passRepeat')
      .setValue(this.usuario.password);
  }
}
