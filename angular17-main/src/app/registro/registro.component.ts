import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DjangoService } from '../services/django-service.service';
import { ApiServiceService } from '../services/api-service.service';
import { TokenService } from '../services/token.service';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  registrationForm!: FormGroup;
  usuarioExistente: boolean = false;

  constructor(
    private router: Router,
    private registroService: DjangoService,
    private apiService: ApiServiceService,
    private tokenService: TokenService,
    private loginService: LoginService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required], [this.usernameValidator()]],
      email: ['', [Validators.required, Validators.email], [this.emailValidator()]],
      password1: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl) {
    const password1 = control.get('password1')?.value;
    const password2 = control.get('password2')?.value;
    return password1 === password2 ? null : { mismatch: true };
  }

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return of(null);
      }
      return control.valueChanges.pipe(
        debounceTime(300),
        switchMap(value => this.registroService.checkUsername(value)),
        map(result => result.exists ? { usernameTaken: true } : null)
      );
    };
  }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return of(null);
      }
      return control.valueChanges.pipe(
        debounceTime(300),
        switchMap(value => this.registroService.checkEmail(value)),
        map(result => result.exists ? { emailTaken: true } : null)
      );
    };
  }

  registroFormulario() {
    if (this.registrationForm.invalid) {
      return;
    }

    const dataSignUp = {
      username: this.registrationForm.value.username,
      email: this.registrationForm.value.email,
      password1: this.registrationForm.value.password1,
      password2: this.registrationForm.value.password2,
      rol: 2,
    };

    this.registroService.registrar(dataSignUp).subscribe(
      response => {
        console.log('Registro exitoso:', response);
        const user = { usuario: this.registrationForm.value.username, pass: this.registrationForm.value.password1 };

        this.loginService.loginUsuario(user).subscribe(
          data => {
            console.log('Login exitoso:', data);
            sessionStorage.setItem('token', data.access_token);
            sessionStorage.setItem('nombreUsuario', this.registrationForm.value.username);

            setTimeout(() => {
              const dataEmail = { to_email: this.registrationForm.value.email };
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
