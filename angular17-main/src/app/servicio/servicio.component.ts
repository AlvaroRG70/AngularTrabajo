import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss']  // Corrección aquí
})
export class ServicioComponent implements OnInit {
  servicio_id: number = 0;
  servicio: any;

  comentario: string = "";
  puntuacion: number = 0;

  nombreUsuario: string = "";
  usuario: any;

  mostrarFormulario: boolean = false;

  constructor(private http: HttpClient, private ApiServiceService: ApiServiceService, private route: ActivatedRoute, private router: Router) { }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  ngOnInit(): void {
    this.servicioSimple(this.servicio_id);
    this.nombreUsuario = sessionStorage.getItem('nombreUsuario') || '';
    this.obtenerUsuario(this.nombreUsuario);
  }

  servicioSimple(id: number) {
    this.route.params.subscribe(params => {
      id = +params['id'];
      this.ApiServiceService.getServicio(id).subscribe((data: any) => {
        this.servicio = data;
      });
    });
  }

  eliminarProducto(id: number): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmacion) {
      this.ApiServiceService.deleteServicio(id).subscribe(
        response => {
          this.router.navigate(['lista/servicios']);
          alert('Servicio eliminado correctamente');
        },
        error => {
          console.error('Error al eliminar el producto:', error);
          // Manejar el error de eliminación
        }
      );
    }
  }

  obtenerUsuario(Usuario: string) {
    this.route.params.subscribe(params => {
      this.ApiServiceService.getusuario(Usuario).subscribe((data: any) => {
        this.usuario = data;
      });
    });
  }

  obtenerUsername() {
    return sessionStorage.getItem('nombreUsuario') || '';
  }

  reseniaCreate(idServicio: number, idUsuario: number) {
    const dataSignUp = {
      comentario: this.comentario,
      puntuacion: this.puntuacion,
    };

    this.ApiServiceService.createResenias(dataSignUp, idUsuario, idServicio)
      .subscribe(
        response => {
          window.location.reload();
        },
        error => {
          console.log(error);
        }
      );
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

  agregarCarrito(id: string): void {
    this.ApiServiceService.aniadirCarrito(id).subscribe(
      response => {
        alert('Servicio añadido correctamente');
        window.location.reload();
      },
      error => {
        console.error('Error al añadir el producto:', error);
      }
    );
  }
}
