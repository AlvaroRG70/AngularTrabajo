import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';

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
    const response = await this.apiServiceService.editarResenias(
      this.id_resenia(),
      this.formulario.value
    );

    setTimeout(() => {
      this.location.back();
      setTimeout(() => {
        location.reload(); // Actualiza la página después de un segundo
      }, 1000);
    }, 1000);
  }


}
