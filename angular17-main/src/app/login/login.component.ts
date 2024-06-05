import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { TokenService } from '../services/token.service';
import { ApiServiceService } from '../services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']  // Corrección aquí
})
export class LoginComponent {

  nombre: string = "";
  password: string = "";
  errorMensaje: string = "";

  constructor(private router: Router,
    private apiService: ApiServiceService,
    private loginService: LoginService,
    private tokenService: TokenService) { }

    loginFormulario() {
      const user = { usuario: this.nombre, pass: this.password };
      this.loginService.loginUsuario(user).subscribe(
          (data) => {
              // Almacena el token en sessionStorage
              sessionStorage.setItem('token', data.access_token);
              // Almacena el nombre de usuario en sessionStorage
              sessionStorage.setItem('nombreUsuario', this.nombre);
              
              Swal.fire({
                  icon: 'success',
                  title: 'Login exitoso',
                  text: 'Bienvenido ' + this.nombre,
                  showConfirmButton: false,
                  timer: 1500
              }).then(() => {
                  this.router.navigate(['/']).then(() => {
                      setTimeout(() => {
                          window.location.reload();
                      }, 500);
                  });
              });
          },
          error => {
              this.errorMensaje = "Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.";
              Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: this.errorMensaje
              });
          }
      );
  }
}
