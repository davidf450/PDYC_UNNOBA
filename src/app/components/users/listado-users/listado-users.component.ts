import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { MatTableDataSource } from '@angular/material';
import { UsersApiService } from 'src/app/api/users/users-api.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-users-usuario',
  templateUrl: './listado-users.component.html',
  styleUrls: ['./listado-users.component.css']
})
export class ListadoUsersComponent implements OnInit {
  datosColumns: String[] = [
    'idUsuario',
    'nombre',
    'apellido',
    'descripcion',
    'user',
    'editar',
    'activar'
  ];

  datos: MatTableDataSource<any> = new MatTableDataSource();
  constructor(
    private router: Router,
    private userApiService: UsersApiService,
    private changeDetector: ChangeDetectorRef,
    private notificacionApiService: NotificationService
  ) {}

  ngOnInit() {
    this.getDatos();
  }
  getDatos() {
    this.userApiService.getUsers().subscribe((usuarios: Usuario[]) => {
      if (usuarios) {
        this.datos = new MatTableDataSource(usuarios);
      }
      this.changeDetector.detectChanges();
    });
  }

  editarUsuario(usuario: Usuario) {
    const id = +usuario.idUsuario;
    this.router.navigate(['/usuarios/editar/' + id]);
  }

  activarUsuario(usuario: Usuario) {
    if (usuario.activo === '0') {
      this.userApiService
        .activateUserById(usuario.idUsuario)
        .subscribe(response => {
          this.notificacionApiService.addToast(response);
          this.getDatos();
        });
    } else {
      this.userApiService
        .deleteUserById(usuario.idUsuario)
        .subscribe(response => {
          this.notificacionApiService.addToast(response);
          this.getDatos();
        });
    }
  }

  applyFilter(filterValue: string) {
    this.datos.filter = filterValue.trim().toLowerCase();
  }
}
