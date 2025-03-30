import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AutServiceService } from '../../services/aut-service.service';
import { Router, RouterLink } from '@angular/router';
import { Producto, ProductosResponse } from '../../interfaces/producto.interface';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../interfaces/categoria.interface';
import { CategoriaServiceService } from '../../services/categoria-service.service';
import { ProductosServiceService } from '../../services/productos-service.service';



@Component({
  selector: 'app-registrar-producto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.scss']
})
export class RegistrarProductoComponent implements OnInit {
  productoForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private productoService: ProductosServiceService,
    private authService: AutServiceService,
    private router: Router,
    private categoriaService: CategoriaServiceService
  ) {
    this.productoForm = this.fb.group({
      nombre_producto: ['', [Validators.required, Validators.minLength(3)]],
      precio_producto: ['', [Validators.required, Validators.min(0)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      imagen_producto: ['', [Validators.required]],
      categoria_id: ['', [Validators.required]]
    });
  }
  
  ngOnInit(): void {
    this.cargarCategorias();
  }
  
  cargarCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe({
      next: (categorias: Categoria[]) => {
        this.categorias = categorias;
      },
      error: (error: any) => {
        console.error('Error al cargar categorías:', error);
        this.errorMessage = 'Error al cargar las categorías';
      }
    });
  }

  agregarProducto(): void {
    if (this.productoForm.valid) {
      const token = localStorage.getItem('token');
      if (!token || token === 'undefined') {
        this.errorMessage = 'Debe iniciar sesión para crear un producto';
        console.error('Error: No hay token de autenticación');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
        return;
      }
      
      const usuarioId = this.authService.getUserId();
      
      if (usuarioId === null) {
        try {
          const userStr = localStorage.getItem('user');
          if (userStr && userStr !== 'undefined') {
            localStorage.setItem('user', userStr);
            console.log('Intentando recuperar la sesión del usuario');
            const retryUsuarioId = this.authService.getUserId();
            if (retryUsuarioId === null) {
              throw new Error('No se pudo recuperar el ID del usuario');
            }
          } else {
            throw new Error('No hay información del usuario en localStorage');
          }
        } catch (error) {
          console.error('Error al recuperar la sesión:', error);
          this.errorMessage = 'Debe iniciar sesión para crear un producto';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
          return;
        }
      }
      
      const producto: Producto = {
        ...this.productoForm.value,
        id: 0,
        usuario_id: usuarioId || 0, // Usar 0 como fallback si aún es null
        categoria_id: parseInt(this.productoForm.value.categoria_id)
      };
      
      // Verificación adicional antes de enviar
      if (!producto.usuario_id) {
        console.warn('Advertencia: Se está enviando un producto con usuario_id = 0');
      }

      this.productoService.agregaProductos(producto).subscribe({
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
