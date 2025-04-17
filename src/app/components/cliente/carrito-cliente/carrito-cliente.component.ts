import { Component, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CarritoServiceService } from '../../../services/carrito-service.service';
import { Producto } from '../../../interfaces/producto.interface';

@Component({
  selector: 'app-carrito-cliente',
  standalone:true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './carrito-cliente.component.html',
  styleUrls: ['./carrito-cliente.component.scss']
})
export class CarritoClienteComponent implements OnInit {

  mensajeError:string = '';
  mensajeExito: string='';
  productos: Producto[] = [];
  id_cliente: number = 1;
  imagen_usuario: string = '';


  constructor(private CarritoService:CarritoServiceService, private router:Router){}

  ngOnInit(): void {

    this.obtenerIdCliente();
    this.obtenerInfoCarro();
    this.obtenerImagenCliente();
    
    
  }

  obtenerIdCliente():number | null{

    const buscarCliente = localStorage.getItem('cliente');

    if(buscarCliente && buscarCliente !== 'undefined'){

      const cliente = JSON.parse(buscarCliente);

      if(cliente.id &&  typeof cliente.id === 'number'){

        this.id_cliente = cliente.id;
        console.log('Cliente Id:',this.id_cliente);

        return this.id_cliente;

      }
    }

    return null;
  }

  obtenerInfoCarro():void{

    this.CarritoService.verCarrito(this.id_cliente).subscribe({

      next: (response) =>{

      

        console.log('Productos del carro',JSON.stringify(response.data,null,2))

        this.productos =  response.data;



        console.log('Productos del carrito',this.productos)
      
      },

      error:(error) =>{

        this.mensajeError = 'Erro al obtener los productos';
        console.log('Error',JSON.stringify(error,null,2));

        setTimeout(() =>{

          this.mensajeError = '';


        },1500)


      }

    })

  }

  rutaHome():void{
    this.router.navigate(['/cliente-home'])
  }


  obtenerImagenCliente():void{

    const usuariLogeado = localStorage.getItem('cliente');

    if(usuariLogeado && usuariLogeado !== 'undefined'){

      const cliente = JSON.parse(usuariLogeado);

      if(cliente && cliente.perfil_cliente){

        this.imagen_usuario = cliente.perfil_cliente;

      }else{

        console.log('No se obtuvo info del cliente , logeate antes');

      }

    }

  }


  eliminarProductoCarro(id_carrito:number):void{

    this.CarritoService.eliminarCarrito(id_carrito).subscribe({

      next: (response) =>{

        this.mensajeExito = 'Producto eliminado del carrito correctamente';

        console.log('Respuesta',response.message);

        this.obtenerInfoCarro();


        setTimeout(() =>{
          this.mensajeExito = '';
        },1000)


      },

      error: (error) =>{

        this.mensajeError = 'Ocurrio un erro al momento de eliminar el producto del carro';

        console.log('Error',JSON.stringify(error,null,2));

        setTimeout(() =>{
          this.mensajeError = '';

        },1500)


      }



    })




  }



  







}
