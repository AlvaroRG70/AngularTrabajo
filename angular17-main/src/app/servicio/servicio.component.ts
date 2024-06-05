import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss']
})
export class ServicioComponent implements OnInit {
  servicio_id: number = 0;
  servicio: any;

  comentario: string = "";
  puntuacion: number = 0;
  mediaPuntuacion: number = 0; // Declarar la propiedad mediaPuntuacion

  nombreUsuario: string = "";
  usuario: any;

  mostrarFormulario: boolean = false;
  loading: boolean = true;




  constructor(private http: HttpClient, private ApiServiceService: ApiServiceService, private route: ActivatedRoute, private router: Router, private location: Location,) { }

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
        this.calcularMediaPuntuacion(); // Llamar al método aquí
        this.loading = false;

      });
    });
  }

  eliminarProducto(id: number): void {
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
        this.ApiServiceService.deleteServicio(id).subscribe(
          response => {
            Swal.fire({
              title: 'Eliminado!',
              text: 'El servicio ha sido eliminado.',
              icon: 'success'
            }).then(() => {
              this.router.navigate(['lista/servicios']);
            });
          },
          error => {
            console.error('Error al eliminar el producto:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Hubo un problema al eliminar el producto.',
              icon: 'error'
            });
          }
        );
      }
    });
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
          Swal.fire({
            icon: "success",
            title: "Has creado el comentario correctamente",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
              window.location.reload();
          }); 
        },
        error => {
          console.log(error);
        }
      );
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
              text: 'La reseña ha sido eliminado.',
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

  agregarCarrito(id: string): void {
    this.ApiServiceService.aniadirCarrito(id).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Añadido al carrito correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload();
        });
      },
      error => {
        console.error('Error al añadir el producto:', error);
        // Manejar el error de añadir al carrito
      }
    );
  }

  calcularMediaPuntuacion(): void {
    if (this.servicio && this.servicio.resenias && this.servicio.resenias.length > 0) {
      const totalPuntuaciones = this.servicio.resenias.reduce((acc: number, resenia: { puntuacion: number }) => acc + resenia.puntuacion, 0);
      this.mediaPuntuacion = totalPuntuaciones / this.servicio.resenias.length;
    } else {
      this.mediaPuntuacion = 0; // Si no hay reseñas, la media es 0
    }
  }


  getStarCount(): number {
    if (this.mediaPuntuacion === undefined) {
      return 0;
    } else if (this.mediaPuntuacion < 1) {
      return 0;
    } else if (this.mediaPuntuacion < 2) {
      return 1;
    } else if (this.mediaPuntuacion < 3) {
      return 2;
    } else if (this.mediaPuntuacion < 4) {
      return 3;
    } else if (this.mediaPuntuacion < 5) {
      return 4;
    } else {
      return 5;
    }
  }

  getEmptyStarCount(): number {
    return 5 - this.getStarCount();
  }

  volver() {
    this.location.back();
  }
}
