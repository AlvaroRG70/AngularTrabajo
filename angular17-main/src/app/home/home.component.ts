import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeliculasService } from '../services/peliculas.service';
import { ApiServiceService } from '../services/api-service.service';
import Swal from 'sweetalert2';
import { TokenService } from '../services/token.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  rateds: any[] = [];

  nombre: string = "";
  email_contact: string = "";
  message: string = "";

  eltoken:string = '';

  
  constructor(private http: HttpClient, private peliculaService: PeliculasService, private createService: ApiServiceService, private tokenService: TokenService) { } 

  ngOnInit(): void {
    this.peliculaService.getPopularMovies().subscribe((data: any) => {
      this.movies = data.results.slice(0, 3);
    });
    


    this.peliculaService.getTopRated().subscribe((data: any) => {
      this.rateds = data.results.slice(0, 15);
    });

    this.tieneToken()
  }



  onSubmit() {
    const data = {
      nombre: this.nombre,
      email_contact: this.email_contact,
      message: this.message
    };
    this.createService.enviarCorreoContacto(data).subscribe(
      response => {
        Swal.fire({
          icon: "success",
          title: "Correo enviado con éxito",
          showConfirmButton: false,
          timer: 1500
        });
      },
      error => {
        console.error('Error al enviar el correo', error);
        Swal.fire({
          icon: "error",
          title: "Error al enviar el correo",
          text: error.message
        });
      }
    );
  }

  tieneToken(): boolean {
    return !!sessionStorage.getItem('token');
  }
}


