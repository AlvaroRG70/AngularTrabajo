import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';  
import { WatchlistComponent } from './watchlist/watchlist.component';  
import { LoginComponent } from './login/login.component';

import { FilmComponent } from './film/film.component'; 
import { BuscadorComponent } from './buscador/buscador.component'; 
import {RegistroComponent } from './registro/registro.component';
import {WatchlistRealComponent } from './watchlist-real/watchlist-real.component';

import { CrearServicioComponent } from './crear-servicio/crear-servicio.component';
import { ListaServiciosComponent } from './lista-servicios/lista-servicios.component';
import { ServicioComponent } from './servicio/servicio.component';
import { EditarReseniaComponent } from './editar-resenia/editar-resenia.component';
import { EditarServicioComponent } from './editar-servicio/editar-servicio.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PagoComponent } from './pago/pago.component';
import { ListaComentariosUsuarioComponent } from './lista-comentarios-usuario/lista-comentarios-usuario.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { PedidoPagadoRevisarComponent } from './pedido-pagado-revisar/pedido-pagado-revisar.component';







const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'film/:id', component: FilmComponent },
  { path: 'buscador', component: BuscadorComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },

  { path: 'w-real', component: WatchlistRealComponent },

  { path: 'crear/servicios', component: CrearServicioComponent },
  { path: 'lista/servicios', component: ListaServiciosComponent },
  { path: 'servicio/:id', component: ServicioComponent },
  { path: 'editar/resenia/:id_resenia', component: EditarReseniaComponent },
  { path: 'editar/servicio/:id_servicio', component: EditarServicioComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'pago/:id_pedido', component: PagoComponent },
  { path: 'comentarios/usuario', component: ListaComentariosUsuarioComponent },
  { path: 'pedidos/usuario', component: ListaPedidosComponent },
  { path: 'pago/revisar/:id_pedido', component: PedidoPagadoRevisarComponent },











];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
