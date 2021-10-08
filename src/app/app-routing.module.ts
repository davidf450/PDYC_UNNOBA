import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../app/components/login/login.component';
import { ListadoUsersComponent } from './components/users/listado-users/listado-users.component';
// users
import { UsersComponent } from './components/users/users.component';
import { AgregarUserComponent } from './components/users/agregar-user/agregar-user.component';
import { EditarUsuarioComponent } from './components/users/editar-usuario/editar-usuario.component';


// Resolver
import { UsersResolverService } from './resolver/users/users-resolver.service';
import { CancionesComponent } from './components/canciones/canciones.component';
import { PlayListComponent } from './components/play-list/play-list.component';
import { NewPlaylistComponent } from './components/play-list/new-playlist/new-playlist.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },


  {
    path: 'usuarios',
    component: UsersComponent,
    children: [
      {
        path: 'listado',
        component: ListadoUsersComponent,
        resolve: { usuarios: UsersResolverService }
      },
      {
         path: 'agregar',
         component: AgregarUserComponent },
      {
        path: 'editar/:id',
        component: EditarUsuarioComponent
      }
    ]
  },
  {
    path: 'canciones',
    children: [
      {
        path: 'listado',
        component: CancionesComponent
      }
    ]
  },
  {
    path: 'playlist',
    children: [
      {
        path: 'listado',
        component: PlayListComponent
      },

      { path: 'agregar', component: NewPlaylistComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
