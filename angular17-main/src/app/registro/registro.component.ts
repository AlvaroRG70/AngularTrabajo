import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DjangoService } from '../services/django-service.service';
import { ApiServiceService } from '../services/api-service.service';
import { TokenService } from '../services/token.service';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  username: string = "";
  email: string = "";
  contrasenia1: string = "";
  contrasenia2: string = "";
  rol: string = "";
  usuarioExistente: boolean = false;

  constructor(
    private router: Router,  
    private registroService: DjangoService,
    private apiService: ApiServiceService,
    private tokenService: TokenService,
    private loginService: LoginService
  ) {}

  registroFormulario() {
    const dataSignUp = {
      username: this.username,
      email: this.email,
      password1: this.contrasenia1,
      password2: this.contrasenia2,
      rol: 2,
    };
    
    this.registroService.registrar(dataSignUp).subscribe(
      response => {
        console.log('Registro exitoso:', response);
        const user = { usuario: this.username, pass: this.contrasenia1 };

        this.loginService.loginUsuario(user).subscribe(
          data => {
            console.log('Login exitoso:', data);
            sessionStorage.setItem('token', data.access_token);
            sessionStorage.setItem('nombreUsuario', this.username);
            
            setTimeout(() => {
              const dataEmail = { to_email: this.email };
              this.apiService.enviarCorreo(dataEmail).subscribe(
                emailResponse => {
                  console.log('Correo enviado con éxito:', emailResponse);
                  Swal.fire({
                    icon: "success",
                    title: "Su registro ha sido completado con éxito",
                    showConfirmButton: false,
                    timer: 1500
                  }).then(() => {
                    this.router.navigate(['/home']).then(() => {
                      setTimeout(() => {
                        window.location.reload();
                      }, 500);
                    });
                  });
                },
                emailError => {
                  console.error('Error al enviar el correo:', emailError);
                }
              );
            }, 100);
          },
          loginError => {
            console.error('Error al iniciar sesión después del registro:', loginError);
            console.log('Detalles del error de inicio de sesión:', loginError.error);
          }
        );
      },
      error => {
        console.error('Error en el registro:', error);
        this.usuarioExistente = true;
      }
    );
  }
}