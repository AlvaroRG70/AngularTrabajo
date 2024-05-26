import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable, firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiUrl = 'http://127.0.0.1:8000/api/v1/';
  idPedido = "";

  constructor(private http: HttpClient, private tokenService: TokenService) { }
  getTokenFromSessionStorage(): string {
    return sessionStorage.getItem('token') || '';
  }


  private getHeaders(): HttpHeaders {
    const token = this.getTokenFromSessionStorage();
    console.log(token)
    const token2 = 'tHaAspSJ2JZ5eQdjwd1qCC06776Oxx'
    return new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });
    }


//----------------

  // private getHeaders(): HttpHeaders {
  //   const token = this.tokenService.getToken();
  //   const token2 = 'fX66pbJrNfpEXNvdEw30encqBkVt12'
  //   return new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
  // }

//----------------


  getServicios(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}`+`servicios`, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }


  createServicios(dataSignUp: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}`+`servicios/crear`, dataSignUp, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  getServicio(servicio_id: number) {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}servicios/${servicio_id}`, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  deleteServicio(servicio_id: number){
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}servicios/eliminar/${servicio_id}`, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  getusuario(nombreUsuario: string){
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}usuario/obtener/${nombreUsuario}`, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  createResenias(dataSignUp: any, idUsuario: number, idServicio: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}`+`resenias/create/${idUsuario}/${idServicio}`, dataSignUp, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  deleteResenias(resenia_id: string){
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}resenia/eliminar/${resenia_id}`, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  // editarServicios(dataSignUp: any, idServicio: number): Observable<any> {
  //   const headers = this.getHeaders();
  //   return this.http.post<any>(`${this.apiUrl}`+`servicios/editar/${idServicio}`, dataSignUp, { headers })
  //     .pipe(
  //       catchError(error => {
  //         throw error;
  //       })
  //     );
  // }

  getId(idServicio: string){
    const headers = this.getHeaders();
    return firstValueFrom(
      this.http.get<any>(`${this.apiUrl}servicios/${idServicio}`, { headers })
    )
  }

  getIdResenia(idResenia: string){
    const headers = this.getHeaders();
    return firstValueFrom(
      this.http.get<any>(`${this.apiUrl}resenias/${idResenia}`, { headers })
    )
  }

  editarServicios(idServicio: string, formValues: any) {
    const headers = this.getHeaders();
    return firstValueFrom(
      this.http.put(`${this.apiUrl}`+`servicios/editar/${idServicio}`, formValues, { headers })
    )

  }

  editarResenias(idResenia: string, formValues: any) {
    const headers = this.getHeaders();
    return firstValueFrom(
      this.http.put(`${this.apiUrl}`+`resenia/editar/${idResenia}`, formValues, { headers })
    )
  }


  // aniadirCarrito(idServicio: string){
  //   const headers = this.getHeaders();
  //   return this.http.post<any>(`${this.apiUrl}`+`servicios/aniadir_carrito/${idServicio}`,{}, { headers })
  //     .pipe(
  //       catchError(error => {
  //         throw error;
  //       })
  //     );
  // }

  aniadirCarrito(idServicio: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}`+`servicios/aniadir_carrito/${idServicio}`, {}, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }


  getCarrito(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}`+`servicios/ver_carrito`, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  deleteServicioCarrito(idServicio: string){
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}servicios/eliminar_carrito/${idServicio}`, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }


  postPago(): Observable<any> {
    const idPedido = this.idPedido
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}servicios/pagar/${idPedido}`, {}, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  getPago(){
    const idPedido = this.idPedido
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}obtener/pago/${idPedido}`, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  getPagoBueno(idPedido: string){
    const headers = this.getHeaders();
    return firstValueFrom(
      this.http.get<any>(`${this.apiUrl}obtener/pago/${idPedido}`, { headers })
    )
  } 


  

  enviarCorreo(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`http://127.0.0.1:8000/api/v1/send-email`, data, { headers })
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }




}
