import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';


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
          this.router.navigate(['lista/servicios']);
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
