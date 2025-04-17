import { Component, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ClienteServiceService } from '../../../services/cliente-service.service';

@Component({
  selector: 'app-info-cliente',
  standalone:true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './info-cliente.component.html',
  styleUrl: './info-cliente.component.scss'
})
export class InfoClienteComponent  implements OnInit{

  mensajeError:string = '';
  nombre_cliente: string = '';
  perfil_cliente: string = '';
  correo_electronico: string = '';
  numero_telefonico: string = '';
  direccion: string = '';
  fecha_registro: string = '';
  id_cliente: number | null = null;

  constructor(private clienteService:ClienteServiceService, private router:Router){}

  ngOnInit(): void {

    this.obtenerIdCliente();
    this.obtenerInfoCliente();
    this.obtenerInfoCliente();
    
  }

  obtenerIdCliente():void{

    this.id_cliente = this.clienteService.obtenerIDCliente();
    console.log('Id del cliente:',this.id_cliente);

  }


  obtenerInfoCliente():void{

    if(!this.id_cliente){

      return;
    }

    this.clienteService.verInfoCliente(this.id_cliente).subscribe({

      next: (response) =>{

        console.log('Info del usuario exitosa',JSON.stringify(response.data,null,2));

        if(response.data){

          this.nombre_cliente = response.data.nombre_cliente;
          this.perfil_cliente = response.data.perfil_cliente;
          this.correo_electronico = response.data.email;
          this.numero_telefonico = response.data.telefono;
          this.direccion = response.data.direccion;
          this.fecha_registro = response.data.created_at;

        }
      },


      error: (error) =>{

        this.mensajeError = 'Error al obtener la informacion del usuario'
        console.log('Error al obtener la info del usuario',JSON.stringify(error,null,2));


        setTimeout(() =>{

          this.mensajeError = '';
        },1500)

      }



    })
  }


  rutaDashboardCliente():void{

    this.router.navigate(['/cliente-home'])
  }










}
