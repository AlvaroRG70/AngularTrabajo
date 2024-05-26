import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject, forkJoin } from 'rxjs';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas'

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.scss'
})
export class PagoComponent {


  pago: any;
  id_pedido: string = ""
  total: number = 0

  detallesCarrito: any[] = [];

  constructor(private http: HttpClient, private ApiServiceService: ApiServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.obtenerPago()
    }

  obtenerPago() {
    
    this.ApiServiceService.getPago().subscribe((data: any) => {
      console.log(data)
      this.pago = data;
      this.total = parseFloat(data.pedido.total)
      console.log(this.total)
      this.obtenerDetallesServicios(data.pedido.detalles_carrito);

    });
  }

  obtenerDetallesServicios(detallesCarrito: any[]): void {
    const servicioObservables = detallesCarrito.map(detalle => 
      this.ApiServiceService.getServicio(detalle.servicio)
    );

    forkJoin(servicioObservables).subscribe((servicios: any[]) => {
      this.detallesCarrito = detallesCarrito.map((detalle, index) => {
        return {
          ...detalle,
          servicio: servicios[index]
        };
      });
      console.log(this.detallesCarrito);
    }, (error: any) => {
      console.error('Error al obtener los detalles de los servicios:', error);
    });
  }

  generatePDF() {
    const elementToPrint: any = document.getElementById('factura');

    html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      pdf.setProperties({
        title: 'Factura',
        subject: 'Algo de prueba',
        author: 'Rodri'
      });

      pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('mifactura.pdf');
    });
  }
  

}
