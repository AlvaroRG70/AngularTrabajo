import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-resenia',
  templateUrl: './editar-resenia.component.html',
  styleUrl: './editar-resenia.component.scss'
})
export class EditarReseniaComponent {

    
  id_resenia = signal('')

  id_servicio: string=""

  formulario: FormGroup = new FormGroup({
    
    comentario: new FormControl(),
    puntuacion: new FormControl(),

  })

  constructor(
  
    private activatedRoute: ActivatedRoute,
    private apiServiceService: ApiServiceService,
    private router: Router,
    private location: Location,

  ) {}


  ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      const id_resenia = params['id_resenia'];
      this.id_resenia.set(id_resenia);
  
      const resenia = await this.apiServiceService.getIdResenia(id_resenia);
      console.log(resenia);
      this.id_servicio = resenia.servicio.id
      
  
      // Para editar el formulario

      delete resenia.id
      delete resenia.usuario
      delete resenia.servicio

      this.formulario.setValue(resenia);
    });
  }

  volver() {
    this.location.back();
  }

  
  

  async reseniaEditar() {
    try {
        const response = await this.apiServiceService.editarResenias(this.id_resenia(), this.formulario.value);
        Swal.fire({
            icon: 'success',
            title: 'Reseña editada con éxito',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            setTimeout(() => {
                this.location.back();
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }, 1000);
        });
        console.log(response);
    } catch (error) {
        console.error('Error al editar la reseña:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al editar la reseña. Por favor, inténtalo de nuevo.'
        });
    }
}


}
