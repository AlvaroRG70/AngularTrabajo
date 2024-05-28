import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrl: './lista-pedidos.component.scss'
})
export class ListaPedidosComponent {

  pedidos: any;
  detalles: any
  loading: boolean = true;



  constructor(private http: HttpClient, private ApiServiceService: ApiServiceService, private route: ActivatedRoute, private router: Router) { } 
  
  ngOnInit(): void {
    this.listaPedidos();
  }

  listaPedidos(): void {
    this.ApiServiceService.getPedidosUsuarios().subscribe((data: any) => {
      
      this.pedidos = data;
      this.detalles = data.pedido
      this.loading = false
      
    });
  }

}
