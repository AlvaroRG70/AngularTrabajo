import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {
  movie_id: number = 0;
  movie: any;

  constructor(private http: HttpClient, private peliculaService: PeliculasService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movie_id = +params['id'];
      this.peliculaService.getFilm(this.movie_id).subscribe((data: any) => {
        this.movie = data;
      });
    });
  }

  addToWatchlist(): void {
    const url = 'https://api.themoviedb.org/3/account/20862103/watchlist';
    const body = {                    
      media_type: 'movie',
      media_id: this.movie_id,
      watchlist: true
    };
    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjVlZGRjMjk1MzZkMWZmYzRlNWZkYWNlNDdhZThjNyIsInN1YiI6IjY1OGFiMzFiYjdiNjlkMDk2MjZkZTczOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rufsppd2z4JY3JZaxJZDpC3FBWVswXCeqYoRkFl09ss'
      })
    };
  
    this.http.post(url, body, options)  
      .subscribe(
        (data: any) => {
          console.log('Película añadida a la lista de seguimiento:', data);
          alert('Película añadida a la lista de seguimiento');
        },
        error => {
          console.error('Error al agregar a la lista de seguimiento:', error);
        }
      );
  }
  

  deleteToWatchlist(): void {
    const url = 'https://api.themoviedb.org/3/account/20862103/watchlist';
    const body = {                   
      media_type: 'movie',
      media_id: this.movie_id,
      watchlist: false
    };
    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjVlZGRjMjk1MzZkMWZmYzRlNWZkYWNlNDdhZThjNyIsInN1YiI6IjY1OGFiMzFiYjdiNjlkMDk2MjZkZTczOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rufsppd2z4JY3JZaxJZDpC3FBWVswXCeqYoRkFl09ss'
      })
    };
  
    this.http.post(url, body, options)   
      .subscribe(
        (data: any) => {
          console.log('Película eliminada de la lista de seguimiento:', data);
          alert('Película eliminada de la lista de seguimiento');
        },
        error => {
          console.error('Error al eliminar de la lista de seguimiento:', error);
        }
      );
  }
  
}

