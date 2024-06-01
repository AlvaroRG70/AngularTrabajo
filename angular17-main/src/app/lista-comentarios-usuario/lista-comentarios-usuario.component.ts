import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás volver atrás!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ApiServiceService.deleteResenias(id).subscribe(
          response => {
            Swal.fire({
              title: 'Eliminado!',
              text: 'El servicio ha sido eliminado.',
              icon: 'success'
            }).then(() => {
              window.location.reload();
            });
          },
          error => {
            console.error('Error al eliminar la reseña:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Hubo un problema al eliminar la reseña.',
              icon: 'error'
            });
          }
        );
      }
    });
  }

}
