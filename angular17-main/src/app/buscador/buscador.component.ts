import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})

export class BuscadorComponent {
  
  peliculas: any[] = [];
  peliculasId!: string;

  constructor(private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.peliculasId = this.peliculasService.peliculaId;
    this.buscarPeliculas(this.peliculasId); 
  }


  ngDoCheck () {
    if(this.peliculasId != this.peliculasService.peliculaId){
      this.peliculasId = this.peliculasService.peliculaId;
      this.buscarPeliculas(this.peliculasId);
    }
  }



  buscarPeliculas(query: string): void {
    if (query.trim()) {
      this.peliculasService.buscarPeliculas(query).subscribe(
        (data: any) => {
          this.peliculas = data.results;
        },
        (error) => {
          console.error('Error al buscar películas:', error);
        }
      );
    }
  }




}

