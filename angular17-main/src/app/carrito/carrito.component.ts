import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent {

  pedido: any
  servicios: any[] = [];
  totalCarrito: number = 0;
  usuario: any;
  email: any;
  loading: boolean = true;





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
      this.loading = false;

    });
  }


  eliminarDelCarrito(id: string): void {
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
        this.ApiServiceService.deleteServicioCarrito(id).subscribe(
          response => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado del carrito correctamente',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.router.navigate(['carrito']);
              window.location.reload();
            });
          },
          error => {
            console.error('Error al eliminar el producto:', error);
            // Manejar el error de eliminación del carrito
          }
        );
      }
    });
  }

  async pagarPedido(idPedido: string): Promise<void> {
    const usuario = this.obtenerUsername();
    await this.obtenerUsuarioAsync(usuario);
    this.ApiServiceService.idPedido = idPedido;
    this.ApiServiceService.postPago().subscribe(
      response => {
        alert('Carrito pagado correctamente');
        this.enviarCorreo(idPedido)  // Enviar correo después de pagar
        this.router.navigate([`pago/${idPedido}`]);
      },
      error => {
        console.error('Error al pagar el carrito:', error);
        alert('Carrito vacío');
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


  enviarCorreo(idPedido: string): void {
    const dataEmail = {
        to_email: this.email,
        order_id: idPedido    
    };
    this.ApiServiceService.enviarCorreoPagado(dataEmail).subscribe(
      emailResponse => {
        console.log('Correo enviado con éxito:', emailResponse);
        Swal.fire({
          icon: "success",
          title: "Su pago ha sido completado con éxito",
          showConfirmButton: false,
          timer: 1500
        });
      },
      emailError => {
        console.error('Error al enviar el correo:', emailError);
      }
    );
}

  obtenerUsuarioAsync(Usuario: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.route.params.subscribe(params => {
        this.ApiServiceService.getusuario(Usuario).subscribe((data: any) => {
          console.log(data);
          this.usuario = data;
          this.email = data.email;
          resolve();
        }, error => {
          console.error('Error al obtener el usuario:', error);
          reject();
        });
      });
    });
  }

  obtenerUsername() {
    return sessionStorage.getItem('nombreUsuario') || '';
  }
  


 



}
