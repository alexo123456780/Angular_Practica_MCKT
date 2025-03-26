import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AutServiceService } from '../../services/aut-service.service';
import { Router } from '@angular/router';
import { Producto, ProductosResponse } from '../../interfaces/producto.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-registrar-producto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.scss']
})
export class RegistrarProductoComponent {
  productoForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AutServiceService,
    private router: Router
  ) {
    this.productoForm = this.fb.group({
      nombre_producto: ['', [Validators.required, Validators.minLength(3)]],
      precio_producto: ['', [Validators.required, Validators.min(0)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      imagen_producto: ['', [Validators.required]]
    });
  }

  agregarProducto(): void {
    if (this.productoForm.valid) {
      const usuarioId = this.authService.getUserId();
      const producto: Producto = {
        ...this.productoForm.value,
        id: 0,
        usuario_id: usuarioId !== null ? usuarioId : 0,
        data: {} as ProductosResponse
      };

      this.apiService.agregarProducto(producto).subscribe({
        next: (response) => {
          this.successMessage = 'Producto creado exitosamente';
          console.log('Producto creado:', response);
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500);
        },
        error: (error) => {
          this.errorMessage = 'Error al crear el producto: ' + 
            (error.error?.message || 'Por favor, intente nuevamente');
          console.error('Error al crear producto:', error);
        }
      });
    } else {
      this.errorMessage = 'Por favor, complete todos los campos correctamente';
      Object.keys(this.productoForm.controls).forEach(key => {
        const control = this.productoForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
