import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.scss']
})
export class EditarServicioComponent implements OnInit {
  
  
  id_servicio = signal('')

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl(),
    descripcion: new FormControl(),
    precio: new FormControl(),

  })

  constructor(
  
    private activatedRoute: ActivatedRoute,
    private apiServiceService: ApiServiceService,
    private router: Router,

  ) {}


  ngOnInit() {
    this.activatedRoute.params.subscribe(async params=>{

      const id_servicio = params['id_servicio'];
      this.id_servicio.set(id_servicio)

      const servicio = await this.apiServiceService.getId(id_servicio)
      console.log(servicio)

      //para editar el formulario

      delete servicio.id
      delete servicio.resenias
      delete servicio.imagen

      this.formulario.setValue(servicio)

    })
  }

  async servicioEditar() {
    try {
        const response = await this.apiServiceService.editarServicios(this.id_servicio(), this.formulario.value);
        Swal.fire({
            icon: 'success',
            title: 'Servicio editado con éxito',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            this.router.navigate([`servicio/${this.id_servicio()}`]).then(() => {
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            });
        });
        console.log(response);
    } catch (error) {
        console.error('Error al editar el servicio:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al editar el servicio. Por favor, inténtalo de nuevo.'
        });
    }
}



}
