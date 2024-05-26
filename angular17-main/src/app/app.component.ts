import { Component } from '@angular/core';
import { PeliculasService } from './services/peliculas.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from './services/token.service';
import { ApiServiceService } from './services/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
}) 
export class AppComponent {
  title = 'angular17';
  peliculaId: string = '';
  NombreUsuario:string = '';
  eltoken:string = '';


  nombreUser: string="";
  usuario: any
  constructor(private router: Router,private PeliculasService: PeliculasService, private tokenService: TokenService, private ApiServiceService: ApiServiceService, private route: ActivatedRoute) { }


  buscar() {
    this.PeliculasService.setTerminoBusqueda(this.peliculaId);
    this.router.navigate(['/buscador']);
  }


  //-------------------
  ngOnInit(): void {
    this.getNombreUsuarioFromSessionStorage();
    this.getTokenFromSessionStorage();

    this.nombreUser = sessionStorage.getItem('nombreUsuario') || '';
    this.obtenerUsuario(this.nombreUser)
  }

  getTokenFromSessionStorage(): void {
    this.eltoken = sessionStorage.getItem('token') || '';
  }

  getNombreUsuarioFromSessionStorage(): void {
    this.NombreUsuario = sessionStorage.getItem('nombreUsuario') || '';
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this.NombreUsuario = '';
    this.eltoken = '';
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  tieneToken(): boolean {
    return !!sessionStorage.getItem('token');
  }

  obtenerUsuario(Usuario: string){

    this.route.params.subscribe(params => {
      this.ApiServiceService.getusuario(Usuario).subscribe((data: any) => {
        console.log(data)
        return this.usuario = data;
      });
    });
  }

  


//-------------------------
  // ngDoCheck(): void {
  //   this.getUserLogged();
  // }

  // tieneToken() {
  //   return this.tokenService.getToken();
  // }

  // logout() {
  //   this.tokenService.logout();
  // }

  // getUserLogged() {
  //   if (this.tokenService.getToken()){
  //     this.tokenService.getUserLogged().subscribe((user) => {
  //       this.NombreUsuario = user.username
  //     });
  //   }
  // }
}
