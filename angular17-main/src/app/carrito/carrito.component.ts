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
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AQ59a7WQftmR4OEJLEPvR9MBhwmYrYSZEbaM_ymDwrzWEHeAmxIxJTdwPqEfspfe3p1SK6y1wBLrUZxt';
    script.onload = () => this.renderPayPalButton();
    document.head.appendChild(script);
    }

  carritoCompra(): void {
    this.ApiServiceService.getCarrito().subscribe((data: any) => {
      console.log(data)
      this.pedido = data
      this.servicios = data.detalles_carrito;
      this.totalCarrito = data.total_carrito.toFixed(2);
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


  renderPayPalButton(): void {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.totalCarrito // Monto de la compra
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert('Pago completado por ' + details.payer.name.given_name);
          this.pagarPedido(this.pedido.id);
        });
      },
      onError: (err: any) => {
        console.error('Error durante el proceso de pago:', err);
      }
    }).render('#paypal-button-container');
  }
  


 



}
