import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { Playlist } from 'src/app/model/playlist';

@Component({
  selector: 'app-new-playlist',
  templateUrl: './new-playlist.component.html',
  styleUrls: ['./new-playlist.component.css']
})
export class NewPlaylistComponent implements OnInit {
  datos: MatTableDataSource<any> = new MatTableDataSource();
  datosColumns: String[] = [
    'nombre',
    'artista',
    'genero',
    'seleccionada'
  ];
  constructor(public dialogRef: MatDialogRef<NewPlaylistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Playlist
) { }

  ngOnInit() {
    this.datos.data.push(
      {nombre: 'Los dinosaurios', artista: 'Charly Garcia', genero: 'Rock Nacional', seleccionada: true},
      {nombre: 'A veces vuelvo', artista: 'Catupecu machu', genero: 'Rock Nacional', seleccionada: true},
      {nombre: 'Prohibido', artista: 'Callejeros', genero: 'Rock Nacional', seleccionada:false});
  }

}
