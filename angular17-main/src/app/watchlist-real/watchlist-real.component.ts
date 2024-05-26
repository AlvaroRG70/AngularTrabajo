import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-watchlist-real',
  templateUrl: './watchlist-real.component.html',
  styleUrl: './watchlist-real.component.scss'
})
export class WatchlistRealComponent implements OnInit {
  movies: any[] = [];
  usuarioId: number = 20862103;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getMovieCuenta();
  }

  getMovieCuenta(): void {
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjVlZGRjMjk1MzZkMWZmYzRlNWZkYWNlNDdhZThjNyIsInN1YiI6IjY1OGFiMzFiYjdiNjlkMDk2MjZkZTczOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rufsppd2z4JY3JZaxJZDpC3FBWVswXCeqYoRkFl09ss'
      }
    };

    this.http.get<any>(`https://api.themoviedb.org/3/account/${this.usuarioId}/watchlist/movies`, options)
      .subscribe(
        data => {
          this.movies = data.results;
        },
        error => {
          console.error('Error fetching movies:', error);
        }
      );
  }

}