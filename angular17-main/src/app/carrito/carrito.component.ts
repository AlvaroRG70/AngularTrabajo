import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent {

  pedido: any
  servicios: any[] = [];
  totalCarrito: number = 0;



  constructor(private http: HttpClient, private ApiServiceService: ApiServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
 
    this.carritoCompra()
    }

  carritoCompra(): void {
    this.ApiServiceService.getCarrito().subscribe((data: any) => {
      console.log(data)
      this.pedido = data
      this.servicios = data.detalles_carrito;
      this.totalCarrito = data.total_carrito;
      console.log(this.servicios)
    });
  }


  eliminarDelCarrito(id: string): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmacion) {
      this.ApiServiceService.deleteServicioCarrito(id).subscribe(
        response => {
          this.router.navigate(['carrito'])
          alert('Servicio eliminado del carrito correctamente');
          window.location.reload();
        },
        error => {
          console.error('Error al eliminar el producto:', error);
        }
      );
    }
  }

  pagarPedido(idPedido: string): void {
    this.ApiServiceService.idPedido = idPedido
    this.ApiServiceService.postPago().subscribe(
      response => {
        alert('Carrito pagado correctamente');
        this.router.navigate([`pago/${idPedido}`]);
      },
      error => {
        console.error('Error al pagar el carrito:', error);
        alert('Carrito vacío')
        // Manejar el error de eliminación
      }
    );
  }


 



}
