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
          console.log('Respuesta del servidor:', response.message);
          if (response && response.status && response.token) {
            console.log('Login exitoso, guardando token...');
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.data));
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
