import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.scss']
})
export class ListaServiciosComponent implements OnInit {
  servicios: any[] = [];
  filteredServicios: any[] = [];
  loading: boolean = true;
  searchTerm: string = '';
  sortOrder: string = 'default';

  constructor(private http: HttpClient, private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.listaServicios();
  }

  listaServicios(): void {
    this.apiService.getServicios().subscribe((data: any) => {
      this.servicios = data;
      this.filteredServicios = data;
      this.loading = false;
    });
  }

  filterAndSortServicios(): void {
    let tempServicios = this.servicios;

    // Filtrar por término de búsqueda
    if (this.searchTerm) {
      tempServicios = tempServicios.filter(servicio =>
        servicio.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Ordenar por precio o nombre
    if (this.sortOrder === 'asc') {
      tempServicios.sort((a, b) => a.precio - b.precio);
    } else if (this.sortOrder === 'desc') {
      tempServicios.sort((a, b) => b.precio - a.precio);
    } else if (this.sortOrder === 'az') {
      tempServicios.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (this.sortOrder === 'za') {
      tempServicios.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }

    this.filteredServicios = tempServicios;
  }
}
  