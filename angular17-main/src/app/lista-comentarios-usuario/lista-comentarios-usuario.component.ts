import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-lista-comentarios-usuario',
  templateUrl: './lista-comentarios-usuario.component.html',
  styleUrl: './lista-comentarios-usuario.component.scss'
})
export class ListaComentariosUsuarioComponent {

  usuario: any;
  servicio_id: number = 0;
  servicio: any;
  comentarios: any;

  constructor(private http: HttpClient, private ApiServiceService: ApiServiceService, private route: ActivatedRoute, private router: Router) { } 
  
  ngOnInit(): void {
    this.listaComentarios();


  }

  obtenerUsuario(Usuario: string) {
    this.route.params.subscribe(params => {
      this.ApiServiceService.getusuario(Usuario).subscribe((data: any) => {
        console.log(data)
        this.usuario = data;
      });
    });
  }

  obtenerUsername() {
    return sessionStorage.getItem('nombreUsuario') || '';
  }

  listaComentarios(): void {
    this.ApiServiceService.getComentariosUsuarios().subscribe((data: any) => {
      
      this.comentarios = data;
      this.servicio_id = data.servicio;
      
    });
  }

  eliminarResenia(id: string): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta reseña?');
    if (confirmacion) {
      this.ApiServiceService.deleteResenias(id).subscribe(
        response => {
          alert('Reseña eliminada correctamente');
          window.location.reload();
        },
        error => {
          console.error('Error al eliminar la reseña:', error);
        }
      );
    }
  }

}
