/*import { Component , type OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from '../../../interfaces/producto.interface';
import { Categoria } from '../../../interfaces/categoria.interface';
import { ProductosServiceService } from '../../../services/productos-service.service';
import { CategoriaServiceService } from '../../../services/categoria-service.service';

@Component({
  selector: 'app-cliente-home',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.scss']
})
export class ClienteHomeComponent {

  productos: Producto[] = [];
  categorias: Categoria[] = [];
  productosFiltrados: Producto[] = [];
  categoriaSeleccionada: number | null = null;
  busquedaporTermino: string = '';
  ordenamiento: string = '';
  paginaActual: number = 1;
  nombre_cliente: string = '';
  perfil_cliente: string = '';
  imagen_categoria: string = '';

  constructor(private productoService: ProductosServiceService, private categoriaService:CategoriaServiceService, private router: Router){}


  ngOnInit():void{

    this.cargarProductos();
    this.cargarCategorias();
    this.obtenerNombreCliente();

  }



  cargarProductos():void{
    this.productoService.obtenerProductos().subscribe({

      next: (productos:Producto[]) =>{

        this.productos = productos;

        this.productosFiltrados = productos;

        console.log('Productos cargados:' ,productos)

        this.aplicarFiltros();
      },

      error: (error) =>{

        console.log('Ocurrio un error al cargar los productos:',error);

      }
    })
  }


  cargarCategorias():void{

    this.categoriaService.obtenerCategorias().subscribe({

      next: (categorias:Categoria[]) =>{

        this.categorias = categorias;
        this.imagen_categoria = categorias[0].imagen_categoria;

      },

      error: (error) =>{

        console.log('Error al cargar las categorias:' ,error);

      }

    })
  }


  buscarProductos(event:Event):void{

    const inputElemento = event.target as HTMLInputElement;

    this.busquedaporTermino = inputElemento.value;


    this.aplicarFiltros();


  }


  ordenarProductos(event:Event):void{


    const  selectedElement = event.target as HTMLSelectElement;

    this.ordenamiento = selectedElement.value;

    this.aplicarFiltros();
  }



  aplicarFiltros():void{

    let productosFiltrados = [...this.productos];

    if(this.busquedaporTermino){

      productosFiltrados = productosFiltrados.filter((producto) =>{

        return producto.nombre_producto.toLowerCase().includes(this.busquedaporTermino.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(this.busquedaporTermino.toLowerCase());

      })
    }


    if(this.categoriaSeleccionada !== null){

      productosFiltrados = productosFiltrados.filter((producto) =>{

        if(producto.categoria && producto.categoria_id === this.categoriaSeleccionada){
          return true;

        }
        if(producto.categoria_id === this.categoriaSeleccionada){
          return true;

        }

        return false;
      })
    }


    switch(this.ordenamiento){

      case  'precio-asc':

      productosFiltrados.sort((a,b) => a.precio_producto - b.precio_producto)
      break;


      case 'precio-desc':

      productosFiltrados.sort((a,b) => b.precio_producto - a.precio_producto)
      break;


      case 'recientes':

      productosFiltrados.reverse();
      break;



      default:
      console.log('No hay algo de orden de eso xdxdxdxd');
      break;  

    }


    this.productosFiltrados =  productosFiltrados;

  }


  filtrarporCategoria(categoriaId:number | null):void{

    this.categoriaSeleccionada = categoriaId;

    this.aplicarFiltros();


    console.log('Categoria seleccionada: ',this.categoriaSeleccionada);
  }


  verDetalles(producto:Producto):void{

    console.log('Detalles del producto:', JSON.stringify(producto,null,2));

  }




  obtenerNombreCategoria(indice:number, producto:Producto):string{

    if(producto.categoria && producto.categoria.nombre_categoria){

      return producto.categoria.nombre_categoria;
    }

    if(producto.categoria_id && this.categorias && this.categorias.length > 0){

      const categoria = this.categorias.find((categoria) => categoria.id  === producto.categoria_id);

      if(categoria){

        return categoria.nombre_categoria;

      }
    }


    if(this.categorias && this.categorias.length > 0){

      const categoriaIndice = indice % this.categorias.length;

      return this.categorias[categoriaIndice].nombre_categoria;

    }


    return 'Categoria no disponible';

  }



  //metodo para cerrar sesion


  cerrarSesion():void{

    console.log('Cerrando sesion...');

    localStorage.removeItem('token');
    localStorage.removeItem('data');

    this.router.navigate(['/cliente-login'])
  }




  obtenerNombreCliente():void{

    const clienteData = localStorage.getItem('data');

    if(clienteData && clienteData !== 'undefined'){

      const cliente = JSON.parse(clienteData);

      if(cliente && cliente.nombre_cliente && cliente.perfil_cliente){

        console.log('Bienvenido',cliente.nombre_cliente);
        this.nombre_cliente = cliente.nombre_cliente;
        this.perfil_cliente = cliente.perfil_cliente;
      
      }


    }

  }

}

*/