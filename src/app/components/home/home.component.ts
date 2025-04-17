import { Component , type OnInit} from "@angular/core"
import { Router } from "@angular/router"
import { RouterModule } from "@angular/router"
import { CommonModule } from "@angular/common"
import { ProductosServiceService } from "../../services/productos-service.service"
import { Producto } from "../../interfaces/producto.interface"
import { Categoria } from "../../interfaces/categoria.interface"
import { CategoriaServiceService } from "../../services/categoria-service.service"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})

export class HomeComponent implements OnInit {

  nombre_usuario: string = '';
  perfil_usuario:string = '';
  imagen_categoria:string = '';
  busqueda: string = '';
  productos: Producto[] = [];
  categorias : Categoria[] = [];
  productoFiltrado: Producto[] = [];
  mensajeError: string = '';
  categoriaSeleccionada: number | null  = null;
  ordenActual: string = 'nombre_asc';

  constructor(private productoService:ProductosServiceService, private categoriaService:CategoriaServiceService, private router:Router ){}

  ngOnInit(): void {

    this.obtenerProductos();
    this.cargarCategorias();
    this.obtenerInfoUsuario();
    
  }

  

  obtenerProductos():void{

    this.productoService.obtenerProductos().subscribe({

      next: (response) =>{

        if(response){

          console.log('Productos obtenidos correctamente',JSON.stringify(response.data,null,2));

          this.productos = response.data

          //nota: el operador spread [...algo] se usa para hacer una copia del array original y evitar hacer cambios en la original.
          this.productoFiltrado = [...this.productos];

          console.log('Productos:', this.productos)

        }else{

          console.log('Error al obtener los productos',JSON.stringify(response,null,2));
        }


      },

      error: (error) =>{

        this.mensajeError = 'Error al obtener los productos';
        console.log('Error al obtener los productos', JSON.stringify(error,null,2));

      }
    })
  }

  cargarCategorias():void{

    this.categoriaService.obtenerCategorias().subscribe({

      next: (response) =>{

        if(response && response.data){

          console.log('Categorias obtenidas correctamente', JSON.stringify(response.data,null,2));
          this.categorias = response.data;
          this.imagen_categoria = response.data[0].imagen_categoria
          console.log('Categorias: ',this.categorias);

        }

        if(response.data.length === 0){

          console.log('No hay categorias aun en la base de datos');

        }

        if(!response){

          console.log('Ocurrio un error en el service de categorias');
        }

      },

      error: (error) =>{

        this.mensajeError = 'Error al obtener las categorias';
        console.log('Ocurrio un error en la solicitud', JSON.stringify(error,null,2));

      }
    })


  }


  obtenerInfoUsuario():void{

    const usuario = localStorage.getItem('data');

    if(usuario && usuario !== 'undefined'){

      const datosUsuario = JSON.parse(usuario);

      if(datosUsuario){

        console.log('Nombre del Usuario',datosUsuario.nombre);
        console.log('Perfil_Usuario: ',datosUsuario.perfil_usuario);

        this.nombre_usuario = datosUsuario.nombre;
        this.perfil_usuario = datosUsuario.perfil_usuario;


      }
    }else{

      console.log('No hay informacion del usuario, has login..');
      this.router.navigate(['/login']);
    }
  }


  buscarProductos(event:Event):void{

    const inputBusqueda = event.target as HTMLInputElement;

    this.busqueda = inputBusqueda.value;

    this.aplicarFiltros();

  }

  filtrarPorCategoria(categoriaId:any):void{

    this.categoriaSeleccionada = categoriaId;

    this.aplicarFiltros();

  }

  ordenarProductos(event:any):void{

    this.ordenActual = event.target.value;
    this.aplicarFiltros();

  }





  aplicarFiltros():void{

    let productosFinalesFiltrados = [...this.productos];

    //filtro de busquede


    if(this.busqueda){

      productosFinalesFiltrados = productosFinalesFiltrados.filter((producto) =>
      producto.nombre_producto.toLowerCase().includes(this.busqueda.toLowerCase())||
      producto.descripcion.toLowerCase().includes(this.busqueda.toLowerCase())
    
      )
    }

    if(this.categoriaSeleccionada){

      productosFinalesFiltrados = productosFinalesFiltrados.filter((producto) => producto.categoria_id === this.categoriaSeleccionada)

    }

    switch(this.ordenActual){

      case 'precio_asc':
      productosFinalesFiltrados.sort((a,b) => a.precio_producto - b.precio_producto);
      break;
      
      case 'precio_desc':
      productosFinalesFiltrados.sort((a,b) => b.precio_producto - a.precio_producto);
      break;
      
      case 'nombre_asc':
      productosFinalesFiltrados.sort((a,b) => a.nombre_producto.localeCompare(b.nombre_producto));
      break;
      
      case 'nombre_desc':
      productosFinalesFiltrados.sort((a,b) => b.nombre_producto.localeCompare(a.nombre_producto));  
      break;

      default:
      console.log('Ordenamiento por defecto');
      break;  

    }

    this.productoFiltrado = productosFinalesFiltrados;

  }


  limpiarFiltros():void{

    this.busqueda = '';
    this.categoriaSeleccionada = null;
    this.ordenActual = 'nombre_asc';
    this.productoFiltrado = [...this.productos];

  }


  verDetallesProducto(producto_id:number){

    if(producto_id){
      console.log('Navegando ala descripcion del producto...')
      this.router.navigate(['detalles-producto',producto_id])
    }else{

      console.log('No se encontro el id del producto');
    }

  }

  navegarARegistrarProducto(): void {
    console.log('Navegando a registrar producto...');
    this.router.navigate(['/registrar-producto']);
  }

  navegarARegistrarCategoria(): void {
    console.log('Navegando a registrar categoría...');
    this.router.navigate(['/registrar-categoria']);
  }


  cerrarSesion():void{

    localStorage.removeItem('data');
    localStorage.removeItem('token');

    console.log('Sesion cerrada correctamente');


    setTimeout(() =>{

      this.router.navigate(['/login']);


    })


  }


  obtenerNombreCategoria(index:number , producto:Producto):string{

    if(producto.categoria_id && producto.categoria?.nombre_categoria){

      return producto.categoria.nombre_categoria;

    }


    if(producto.categoria_id && this.categorias && this.categorias.length > 0){

      const categoria = this.categorias.find((categoria) => categoria.id === producto.categoria_id);


      if(categoria){


        return categoria.nombre_categoria;
      }


    }
    return 'Categoria no disponible'
  }



  rutaPassword():void{

    this.router.navigate(['/recuperar-password'])

  }

  rutaCategoria():void{

    this.router.navigate(['/registar-categoria'])


  }

  rutaProducto():void{

    this.router.navigate(['/registrar-producto'])

  }


  rutaPerfilUsuarioC():void{

    this.router.navigate(['/cambiar-perfil'])
  }

 
  

  










 
}

