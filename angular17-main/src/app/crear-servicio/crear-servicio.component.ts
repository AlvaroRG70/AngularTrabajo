import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.scss']  // Corrección aquí
})
export class CrearServicioComponent {
  servicios: any[] = [];

  nombre: string = "";
  descripcion: string = "";
  precio: string = "";
  imagen: File | null = null;

  constructor(private http: HttpClient, private createService: ApiServiceService, private router: Router) { }

  servicioCreate() {
    const dataSignUp = new FormData();
    dataSignUp.append('nombre', this.nombre);
    dataSignUp.append('descripcion', this.descripcion);
    dataSignUp.append('precio', this.precio);
    if (this.imagen) {
      dataSignUp.append('imagen', this.imagen);
    }
    this.createService.createServicios(dataSignUp)
      .subscribe(
        response => {
          Swal.fire({
            icon: "success",
            title: "Has creado el servicio correctamente",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            // Navegar a la página deseada
            this.router.navigate(['lista/servicios']).then(() => {
              // Recargar la página después de la navegación
              window.location.reload();
            });
          }); 
        },
        error => {
          console.log(error);
        }
      );
  }

  onFileSelected(event: any) {
    this.imagen = event.target.files[0];
  }
}
