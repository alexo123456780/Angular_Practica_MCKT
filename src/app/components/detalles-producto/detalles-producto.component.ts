import { Component , type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductosServiceService } from '../../services/productos-service.service';
import { Producto } from '../../interfaces/producto.interface';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-detalles-producto',
  standalone:true,
  imports: [CommonModule,RouterModule],
  templateUrl: './detalles-producto.component.html',
  styleUrl: './detalles-producto.component.scss'
})


export class DetallesProductoComponent implements OnInit {

  producto: Producto | undefined;


  constructor(private productoService:ProductosServiceService, private router:ActivatedRoute){}


  ngOnInit(): void {

    const producto_id = this.router.snapshot.paramMap.get('id');

    if(producto_id){

      this.obtenerProductoDetalle(+producto_id);

    }


    
  }


  obtenerProductoDetalle(id:number){

    this.productoService.obtenerProductoId(id).subscribe({

      next:(response) =>{

        if(response.data){
          

          console.log('Producto obtenedo correctamente' ,JSON.stringify(response.data,null,2));
          this.producto = response.data
        }

      },

      error: (error) =>{

        console.log('Error al obtener el producto',error);

      }



    })



  }
}
