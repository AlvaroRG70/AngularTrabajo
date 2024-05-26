import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { FormControl, FormGroup } from '@angular/forms';


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

  async servicioEditar(){
    const response = await this.apiServiceService.editarServicios(this.id_servicio(), this.formulario.value)
    this.router.navigate([`servicio/${this.id_servicio()  }`]);
    console.log(response)
  }


}
