import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AutServiceService } from '../../services/aut-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AutServiceService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          if (response && response.status) {
            console.log('Login exitoso, guardando token...');
            const token = response.token || (response.data && response.data.token);
            if (token) {
              localStorage.setItem('token', token);
            } else {
              console.warn('No se encontró token en la respuesta');
            }
            
            // Guardar el usuario correctamente
            if (response.data) {
              // Si la respuesta tiene una propiedad data, guardarla
              localStorage.setItem('user', JSON.stringify(response.data));
              console.log('Usuario guardado correctamente:', response.data);
            } else {
              // En caso de que la estructura sea diferente, guardar la respuesta completa
              localStorage.setItem('user', JSON.stringify(response));
              console.log('Usuario guardado correctamente:', response);
              // Verificar si hay información del usuario
              if (!response) {
                console.error('No se recibió información del usuario en la respuesta');
              }
            }
            
            console.log('Intentando navegar al dashboard...');
            this.router.navigate(['/dashboard'])
              .then(() => console.log('Navegación exitosa al dashboard'))
              .catch(err => console.error('Error en la navegación:', err));
          } else {
            console.error('Respuesta inválida del servidor:', response);
            this.errorMessage = response.message || 'Error en la respuesta del servidor';
          }
        },
        error: (error) => {
          console.error('Error detallado de login:', error);
          this.errorMessage = error.error?.message || 'Error al iniciar sesión. Por favor, intente nuevamente.';
        }
      });
    } else {
      console.log('Formulario inválido:', this.loginForm.errors);
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
    }
  }
}
