import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from 'src/app/model/usuario';
// import { PaginationResult } from 'src/app/model/pagination-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  baseUrl:string
  urlUsuario = '/usuarios';
  urlValidate = '/usuarios/validar/';
  private myHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private myParams = new HttpParams();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
   this.myParams = this.myParams.set('user', localStorage.getItem('user').toString());
    return this.http.get<any>(this.urlUsuario, { headers: this.myHeaders, params: this.myParams });
  }

  addUser(usuario: Usuario): Observable<any> {
    this.myParams = this.myParams.set('user', localStorage.getItem('user').toString());
    return this.http.post<any>(this.urlUsuario, usuario, {
      headers: this.myHeaders, params: this.myParams
    });
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(this.urlUsuario + '/' + id, {
      headers: this.myHeaders
    });
  }
  getUserNameValidation(userName: string): Observable<any> {
    return this.http.get<any>(this.urlValidate + userName, {
      headers: this.myHeaders
    });
  }

  activateUserById(id: string): Observable<any> {
    return this.http.post<any>(this.urlUsuario + '/' + id, {
      headers: this.myHeaders
    });
  }

  deleteUserById(id: string): Observable<any> {
    return this.http.delete<any>(this.urlUsuario + '/' + id, {
      headers: this.myHeaders
    });
  }

  getCantidadUsuario(): Promise<any> {
    return this.http
      .get('/cantidad')
      .toPromise()
      .then(response => {
        return response;
      });
  }


}
