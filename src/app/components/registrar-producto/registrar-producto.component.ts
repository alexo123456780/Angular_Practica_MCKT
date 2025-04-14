import { Component, type OnInit } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductosServiceService } from '../../services/productos-service.service';
import { Producto } from '../../interfaces/producto.interface';
import { AutServiceService } from '../../services/aut-service.service';
import { CategoriaServiceService } from '../../services/categoria-service.service';
import { Categoria } from '../../interfaces/categoria.interface';


@Component({
  selector: 'app-registrar-producto',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.scss']
})

export class RegistrarProductoComponent implements OnInit {

  errorMensaje: string  = '';
  mensajeExito: string = '';
  estaCargando: boolean = false;
  productoFormulario: FormGroup;
  usuario_Id : number | null = 1;
  categorias: Categoria[] = []


  constructor(private productoService:ProductosServiceService, private router: Router, private fb:FormBuilder,private authService:AutServiceService,private categoriaService:CategoriaServiceService){

    this.productoFormulario = this.fb.group({

      nombre_producto: ['',[Validators.required,Validators.minLength(4)]],
      precio_producto: ['',[Validators.required]],
      descripcion: ['',[Validators.required,Validators.minLength(4)]],
      imagen_producto: ['',Validators.required],
      cantidad_productos: ['',[Validators.required,Validators.pattern(/^[0-9]+$/)]],
      categoria_id: ['',Validators.required]

    })
  
  }


  //hago la llamada alas funciones en ngonitin para usar las funcioes y ejecutar su valor nuevo

  ngOnInit(): void {

    this.obtenerCategorias();
    this.obtenerIdUsuario();
    
  }

  obtenerIdUsuario():void{

    this.usuario_Id = this.authService.obtenerIdUsuario();
    console.log('Id obtenido correctamente',this.usuario_Id);

  }


  obtenerCategorias():void{

    this.categoriaService.obtenerCategorias().subscribe({

      next: (response) =>{

        console.log('Categorias obtenidas correctamente',JSON.stringify(response.data,null,2));
        this.categorias = response.data;

      },
      error: (error) =>{
        console.log('Error al obtener las categorias',JSON.stringify(error,null,2));
      }

    })
  }



  venderProducto(){

    const producto : Producto ={...this.productoFormulario.value, usuario_id: this.usuario_Id};


    if(this.productoFormulario.valid){

      this.estaCargando = true;
      this.errorMensaje = '';
      this.mensajeExito = '';

      this.productoService.publicarProducto(producto).subscribe({

        next: (response) =>{

          this.estaCargando = false;
          this.mensajeExito = 'Producto creado exitosamente';

          console.log('Producto creado  dato nuevo: ',JSON.stringify(response.data,null,2));

          setTimeout(() =>{

            this.router.navigate(['/dashboard']);
          },2000)
        },

        error: (error) =>{

          this.estaCargando = false;
          this.errorMensaje = 'Error al crear el producto';

          console.log('Respuesta del backend: ',JSON.stringify(error,null,2));

        }


      })
    }else{

      this.errorMensaje = 'Por favor, completa todos los campos correctamente';

    }

  }

  rutaDashboard():void{

    this.router.navigate(['/dashboard']);


  }












 
}