import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DjangoService } from '../services/django-service.service';
import { ApiServiceService } from '../services/api-service.service';
import { TokenService } from '../services/token.service';
import { LoginService } from '../services/login.service';

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
        // Registro exitoso
        const user = {usuario: this.username, pass: this.contrasenia1};

        this.loginService.loginUsuario(user).subscribe(
          data => {
            // Almacena el token en sessionStorage
            sessionStorage.setItem('token', data.access_token);
            // Almacena el nombre de usuario en sessionStorage
            sessionStorage.setItem('nombreUsuario', this.username);
            
            setTimeout(() => {
              const dataEmail = {
                to_email: this.email
                };
              this.apiService.enviarCorreo(dataEmail).subscribe(
                emailResponse => {
                  console.log('Correo enviado con éxito:', emailResponse);
                },
                emailError => {
                  console.error('Error al enviar el correo:', emailError);
                }
                ); 
                ;
            }, 100);
            this.router.navigate(['/home'])
            },
            
          loginError => {
            // Error en el inicio de sesión
            console.error('Error al iniciar sesión después del registro:', loginError);
          }
        );
        

 
      },
      error => {
        // Error en el registro
        console.error('Error en el registro:', error);
        this.usuarioExistente = true;
      }
    );
  }
}

