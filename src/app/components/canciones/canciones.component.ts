import { Component, OnInit, Inject } from "@angular/core";
import {
  MatSort,
  MatPaginator,
  PageEvent,
  MatTableDataSource,
  MatDialog
} from "@angular/material";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CancionesService } from "src/app/api/canciones/canciones.service";
import { Cancion } from 'src/app/model/cancion';

@Component({
  selector: "app-canciones",
  templateUrl: "./canciones.component.html",
  styleUrls: ["./canciones.component.css"]
})
export class CancionesComponent implements OnInit {
  datosColumns: String[] = ["nombre", "artista", "genero"];
  generoSelected;
  artistaSelected;
  artistas: String[] = [
    "Queens of the Sone Age",
    "Alice In Chainns",
    "Nirvana",
    "Muse",
    "Guns N' Roses",
    "Scorpions",
    "Oasis",
    "Arctic Monkeys",
    "Franz Ferdninand",
    "Arctic Monkeys"

  ];
  generos: String[] = ["Grunge", "Hard", "Britpop", "Alternative", "Indie"];

  datos: MatTableDataSource<any> = new MatTableDataSource();
  constructor(private cancionesApiService: CancionesService) {}

  ngOnInit() {
    //Este metodo trae el listado de canciones de la api
    // this.cancionesApiService.getCanciones().subscribe(data =>{
    //   console.log(data);
    // })
  }

  canciones() {
    this.cancionesApiService
      .getCanciones(this.artistaSelected, this.generoSelected)
      .subscribe(data => {
        const lista = data.lista as Cancion[];
        this.datos = new MatTableDataSource(lista);

        console.log(data);
      });
  }
}
