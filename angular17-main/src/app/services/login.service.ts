import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token_url = 'http://127.0.0.1:8000/oauth2/token/';

  constructor(private http: HttpClient) { }

  loginUsuario(datosLogin: any): Observable<any> {
    const datosObtenerToken = new HttpParams()
    .set('grant_type', 'password')
    .set('username', datosLogin['usuario'])
    .set('password', datosLogin['pass'])
    .set('client_id', 'appmarketing')
    .set('client_secret', 'mi_clave_secreta');

    const cabecera = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    return this.http.post<any>(this.token_url,datosObtenerToken.toString(),{headers:cabecera})
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }


}