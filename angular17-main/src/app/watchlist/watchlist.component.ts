import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss'
})
export class WatchlistComponent implements OnInit {
  movies: any[] = [];
  currentPage = 1;
  pageSize = 10;
  
  constructor(private http: HttpClient, private peliculaService: PeliculasService) { } 

  ngOnInit(): void {
    this.loadMovies()
  }

  loadMovies(): void {
    this.peliculaService.getPopularMovies().subscribe((data: any) => {
      this.movies = data.results;
    });
  }

  
}





