import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import {
  MatSort,
  MatPaginator,
  PageEvent,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { NewPlaylistComponent } from './new-playlist/new-playlist.component';
import { Playlist } from 'src/app/model/playlist';
import { EditPlaylistComponent } from './edit-playlist/edit-playlist.component';
import { DetalleComponent } from './detalle/detalle.component';
import { PlaylistService } from "src/app/api/Playlist/playlist.service";


@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.css']
})
export class PlayListComponent implements OnInit {
  nombrePlaylist;
  datosColumns: String[] = [
    'nombre',
    'detalle',
    'editar'
  ];

  datos: MatTableDataSource<any> = new MatTableDataSource();
  constructor(public dialog: MatDialog, private playlistApiService: PlaylistService) { }

  ngOnInit() {
     
    this.playlistApiService.getPlaylists()
    .subscribe(data => {
      const lista = data.lista as Playlist[];
      this.datos = new MatTableDataSource(lista);

      console.log(data);
    });
}
  
 
  

  // ----------------Dialogo de una nueva playlist ---------------------------
  nuevaPlaylist() {
    const dialogRef = this.dialog.open(NewPlaylistComponent, {
      width: '50%',
      height: 'auto',
      data: Playlist
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  // ------------------ Dialogo de una nueva playlist -------------------------


  // ----------------Dialogo para editar una playlist ---------------------------
  editPlaylist() {
    const dialogRef = this.dialog.open(EditPlaylistComponent, {
      width: '50%',
      height: 'auto',
      data: Playlist
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  // ------------------ Dialogo para editar una playlists -------------------------

   // ----------------Dialogo de Detalle de una playlist ---------------------------
    detallePlaylist() {
    const dialogRef = this.dialog.open(DetalleComponent, {
      width: '50%',
      height: 'auto',
      data: Playlist
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  // ------------------ Dialogo para editar una playlists -------------------------
}
