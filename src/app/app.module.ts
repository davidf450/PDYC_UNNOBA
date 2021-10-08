// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { ToastaModule } from 'ngx-toasta';
import { FlexLayoutModule } from '@angular/flex-layout';
 
// Material
import { MatButtonModule, MatCardModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {
  MatPaginatorModule,
  MatPaginatorIntl
} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


// Components
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginComponent } from './components/login/login.component';
import { MenuOverComponent } from './components/toolbar/menu-over/menu-over.component';

// Usuarios
import { ListadoUsersComponent } from './components/users/listado-users/listado-users.component';
import { UsersComponent } from './components/users/users.component';
import { EditarUsuarioComponent } from './components/users/editar-usuario/editar-usuario.component';
import { AgregarUserComponent } from './components/users/agregar-user/agregar-user.component';

// Services
import { TokenInterceptorService } from './interceptors/auth-token/token-interceptor.service';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { EnvService } from './services/env/env.service';
import { NotificationService } from './services/notification/notification.service';
import { ErrorService } from './services/error/error.service';


import {
  UserNameValidator,
  UserNameValidatorDirective
} from './components/users/shared/username-validator.directive';

import { getEspanishPaginatorIntl } from './services/i18n/esp-paginator';


import { AppConfigService } from './app-config.service';
import { BaseUrlInterceptorService } from './interceptors/base-url/base-url-interceptor.service';
import { CancionesComponent } from './components/canciones/canciones.component';
import { PlayListComponent } from './components/play-list/play-list.component';
import { NewPlaylistComponent } from './components/play-list/new-playlist/new-playlist.component';
import { EditPlaylistComponent } from './components/play-list/edit-playlist/edit-playlist.component';
import { DetalleComponent } from './components/play-list/detalle/detalle.component'

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

@NgModule({
  declarations: [
    CancionesComponent,
    UserNameValidatorDirective,
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    MenuOverComponent,
    ListadoUsersComponent,
    UsersComponent,
    EditarUsuarioComponent,
    AgregarUserComponent,
    PlayListComponent,
    NewPlaylistComponent,
    EditPlaylistComponent,
    DetalleComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTooltipModule,
    MatRadioModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDialogModule,
    HttpClientModule,
    ToastaModule.forRoot(),
  ],
  entryComponents: [
    EditPlaylistComponent,
    DetalleComponent
  ],

  providers: [
    EnvService,
    AuthGuardService,
    NotificationService,
    UserNameValidator,
    {
    provide: ErrorHandler,
    useClass: ErrorService
   },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    { provide: MatPaginatorIntl, useValue: getEspanishPaginatorIntl() },
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    }, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
    ); // Or whatever path you placed mdi.svg at
  }
}
