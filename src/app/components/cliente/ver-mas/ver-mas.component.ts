import { Component, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductosServiceService } from '../../../services/productos-service.service';
import { Producto } from '../../../interfaces/producto.interface';


@Component({
  selector: 'app-ver-mas',
  standalone:true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './ver-mas.component.html',
  styleUrls: ['./ver-mas.component.scss']
})


export class VerMasComponent implements OnInit {

  mensajeExito: string = '';
  mensajeError: string = '';
  producto: Producto | null = null;
  id_producto: number | null = null;

  constructor(private productoService:ProductosServiceService, private router:Router, private route: ActivatedRoute){}

  ngOnInit(): void {

    this.obtenerIdProducto();
    this.obtenerInfoProductoFinal();

  }

  obtenerIdProducto():void{

    this.id_producto = Number(this.route.snapshot.paramMap.get('id'));

    console.log('Id del producto es:',this.id_producto);

  }

  obtenerInfoProductoFinal():void{

    if(!this.id_producto){
      return;
    }

    this.productoService.obtenerInfoProducto(this.id_producto).subscribe({

      next: (response) =>{

        this.mensajeExito = 'Info del producto obtenida correctamente';
        console.log('Respuesta del backend exitosa',JSON.stringify(response.data,null,2));

        this.producto = response.data;

        console.log('Producto:',this.producto);

      },

      error: (error) =>{

        this.mensajeError = 'Error al obtener la informacion del producto';
        console.log('Error al obtener la informacion del producto',JSON.stringify(error,null,2));


      }




    })







  }











}
