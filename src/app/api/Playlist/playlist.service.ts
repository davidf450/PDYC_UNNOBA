import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Playlist } from 'src/app/model/playlist';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  urlPlaylists= '/playlists';

  private myHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  private myParams = new HttpParams();
  
  constructor(private http: HttpClient) { }

    //Todas las playlists disponibles
    getPlaylists(): Observable<any> {
      return this.http.get<any>(this.urlPlaylists, { headers: this.myHeaders, params: this.myParams });
    }
}
