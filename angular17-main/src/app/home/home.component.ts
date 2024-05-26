import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  rateds: any[] = [];
  
  constructor(private http: HttpClient, private peliculaService: PeliculasService) { } 

  ngOnInit(): void {
    this.peliculaService.getPopularMovies().subscribe((data: any) => {
      this.movies = data.results.slice(0, 3);
    });


    this.peliculaService.getTopRated().subscribe((data: any) => {
      this.rateds = data.results.slice(0, 15);
    });
  }
}


