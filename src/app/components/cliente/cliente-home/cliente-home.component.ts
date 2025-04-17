import { Component, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProductosServiceService } from '../../../services/productos-service.service';
import { Producto } from '../../../interfaces/producto.interface';
import { CategoriaServiceService } from '../../../services/categoria-service.service';
import { Categoria } from '../../../interfaces/categoria.interface';
import { CarritoServiceService } from '../../../services/carrito-service.service';
import { Carrito, CarritoAgregar } from '../../../interfaces/carrito';
import { ClienteServiceService } from '../../../services/cliente-service.service';


@Component({
  selector: 'app-cliente-home',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.scss']
})


export class ClienteHomeComponent implements OnInit {


  productos: Producto[] = [];
  categorias: Categoria[] = [];
  nombre_cliente: string = '';
  foto_perfil: string = '';
  productosFiltrados: Producto[] = [];
  categoriaSeleccionada: number | null = null;
  errorMensaje: string = '';
  busqueda: string = '';
  ordenSeleccionado: string = 'nombre_asc';
  nombre_categoria: string = '';
  mensajeExito : string = '';
  id_cliente: number | null = 1;
  estaCargando: boolean = false;

  constructor(private productoService:ProductosServiceService, private categoriaService:CategoriaServiceService, private router:Router,
    private carritoService:CarritoServiceService, private clienteService: ClienteServiceService

  ){}

  ngOnInit(): void {

    this.obtenerProductos();
    this.obtenerCategorias();
    this.obtenerInfoCliente();
    this.BuscarIdCliente();

  }

  obtenerProductos():void{

    try{

      this.productoService.obtenerProductos().subscribe({

        next: (response) =>{

          if(response.data.length < 0){

            this.errorMensaje = 'Aun no hay productos disponibles';
            console.log('No hay productos disponoibles en este momento');

          }


          if(response && response.data){

            console.log('Productos obtenidos correctamente:',JSON.stringify(response.data,null,2));

            this.productos = response.data;

            this.productosFiltrados = [...this.productos];

            console.log('Copia de los productos:',this.productosFiltrados)

          }

        },

        error: (error) =>{

          this.errorMensaje = 'Ocurrio un error al traer los productos';
          console.log('Error al obtener los productos:',error);
        }

      })

    }catch(error){

      console.log('Error al traer los productos',error)
    }

  }

  obtenerCategorias():void{

    try{

      this.categoriaService.obtenerCategorias().subscribe({

        next: (response) => {

          if(response.data.length === 0){

            this.errorMensaje = 'No hay categorias disponibles aun';
            console.log('Aun no hay categorias en las base de datos');

          }

          if(response && response.data){

           console.log('Categorias obtenidas correctamente:',JSON.stringify(response.data,null,2));

           this.categorias = response.data;

          }

  
        },

        error: (error) =>{

          this.errorMensaje = 'Ocurrio un error al obtener las categorias';
          console.log('Error en el backend:',JSON.stringify(error,null,2));

        }
      })

    }catch(error){

      console.log('Error en la peticion de categorias',error);

    }

  }

  metodoBusqueda(event:any):void{

    this.busqueda = event.target.value;
    this.metodoFiltrado();

  }


  metodoFiltarCategorias(CategoriaId:any):void{

    this.categoriaSeleccionada = CategoriaId;
    this.metodoFiltrado();


  }


  metodoOrdenamiento(event:any):void{

    this.ordenSeleccionado = event.target.value;
    this.metodoFiltrado();

  }

  metodoFiltrado():void{

    let productosFiltradosFinales = [...this.productos];

    if(this.busqueda){

      productosFiltradosFinales = productosFiltradosFinales.filter((producto) => producto.nombre_producto.toLowerCase().includes(this.busqueda.toLowerCase())||
      producto.descripcion.toLowerCase().includes(this.busqueda.toLowerCase())
    
    )
    }


    if(this.categoriaSeleccionada){

      productosFiltradosFinales = productosFiltradosFinales.filter((producto) => producto.categoria_id === this.categoriaSeleccionada)

    }

    if(this.ordenSeleccionado){

      switch(this.ordenSeleccionado){

        case 'nombre_asc':
        productosFiltradosFinales.sort((a,b) => a.nombre_producto.localeCompare(b.nombre_producto));  
        break;

        case 'nombre_des':
        productosFiltradosFinales.sort((a,b) => b.nombre_producto.localeCompare(a.nombre_producto));  
        break;

        case 'precio_asc':
        productosFiltradosFinales.sort((a,b) => a.precio_producto - b.precio_producto );
        break;
        
        case 'precio_des':
        productosFiltradosFinales.sort((a,b) => b.precio_producto - a.precio_producto); 
        break;

        default:
        this.errorMensaje = 'Ocurrio un error al filtrar los productos';
        console.log('Error de filtrados de productos')  

      }


    }


    this.productosFiltrados = productosFiltradosFinales;

  }



  obtenerNombreCategoria(index:number, producto:Producto ):string{

    if(producto.categoria_id && producto.categoria?.nombre_categoria){

      this.nombre_categoria = producto.categoria.nombre_categoria;

    
    }


    if(producto.categoria_id && this.categorias && this.categorias.length > 0){

      const categoria = this.categorias.find((categoria) => categoria.id === producto.categoria_id);

      if(categoria){

        this.nombre_categoria = categoria.nombre_categoria;
        

      }

    }


    return this.nombre_categoria;


  
  }


  cerrarSesion():void{


    this.mensajeExito = 'Sesion cerrada correctamente';
    this.mensajeExito = '';

    localStorage.removeItem('cliente');
    localStorage.removeItem('cliente_token');

    console.log('Sesion cerrada automaticamente');

    setTimeout(() =>{

      this.router.navigate(['cliente-login'])


    })

  }


  obtenerInfoCliente():void{

    const Cliente = localStorage.getItem('cliente');

    if(Cliente && Cliente !== 'undefined'){

      const datosCliente = JSON.parse(Cliente);

      if(datosCliente){

        console.log('Informacion del cliente:',JSON.stringify(datosCliente,null,2));

        this.nombre_cliente = datosCliente.nombre_cliente;
        this.foto_perfil = datosCliente.perfil_cliente;
      }
    }
  }

  BuscarIdCliente():number | null{

    const cliente = localStorage.getItem('cliente');

    if(cliente && cliente !== 'undefined'){

      const informacionCliente = JSON.parse(cliente);

      if(informacionCliente && informacionCliente.id && typeof informacionCliente.id === 'number'){

        this.id_cliente = informacionCliente.id;

        console.log('Id del cliente:',this.id_cliente);

        return this.id_cliente;

      }

    }
    return null;

  }




  agregarProductoCarro(producto_id?: number):void{

    this.estaCargando = true;
    this.errorMensaje = ''


    if(!this.id_cliente){

      return;
    }

    const datos = {

      cliente_id: this.id_cliente,
      producto_id: producto_id || this.productosFiltrados[0].id

    }

    const carrito: CarritoAgregar = {...datos}


    this.carritoService.agregarproductoCarrito(carrito).subscribe({

      next: (response) =>{

        this.estaCargando = false;
        this.mensajeExito = 'Producto agregado exitosamente al carrito'


        setTimeout(() =>{
          this.mensajeExito = '';


        },1500)
        

        if(response){

          console.log('Producto agregado exitosamente datos',JSON.stringify(response.data,null,2));

        }


      },
      error: (error) =>{
        this.estaCargando = false;
        this.errorMensaje = 'Este producto ya se encuentra en el carrito';

        setTimeout(() =>{

          this.errorMensaje = '';


        },1500)
        console.log('Erro al agregar el producto al carrito',error)

      }



    })
  }


  rutaInfoCliente():void{

    this.router.navigate(['/info-cliente']);

  }

  rutaPasswors():void{

    this.router.navigate(['/cambiar-passwordC'])
  }


  obtenerIdProducto(id_producto:number):void{

    if(id_producto){

      this.router.navigate(['/ver-mas',id_producto])
    }

  }

  rutaCarrito():void{

    this.router.navigate(['/carrito-cliente']);
  }

























}


