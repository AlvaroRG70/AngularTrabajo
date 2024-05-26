import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DjangoService {

  private apiUrl = 'http://127.0.0.1:8000/api/v1/registrar/usuario';
//private apiUrl = 'https://alvaroclase.pythonanywhere.com/api/v1/registrar/usuario';
  constructor(private http: HttpClient) { }

  registrar(dataSignUp: any): Observable<any>{ 
    return this.http.post<any>(this.apiUrl, dataSignUp)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  


}
