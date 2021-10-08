import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Cancion } from 'src/app/model/cancion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CancionesService {
  urlCanciones = '/songs';
  urlGenero = 'genero';
  utrArtista = 'artista';

  private myHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private myParams = new HttpParams();

  constructor(private http: HttpClient) { }

  //Todas las canciones disponibles
  getCanciones(artista, genero): Observable<any> {
    this.myParams = this.myParams.set('author', artista.toString());
    this.myParams = this.myParams.set('genre', genero.toString());
    return this.http.get<any>(this.urlCanciones, { headers: this.myHeaders, params: this.myParams });
  }

}
