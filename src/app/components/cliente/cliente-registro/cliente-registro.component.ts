import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Cliente } from '../../../interfaces/cliente.interface';
import { ClienteServiceService } from '../../../services/cliente-service.service';



@Component({
  selector: 'app-cliente-registro',
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  standalone:true,
  templateUrl: './cliente-registro.component.html',
  styleUrls: ['./cliente-registro.component.scss']
})


export class ClienteRegistroComponent {

  estaCargando: boolean = false;
  errorMensaje: string = '';
  mensajeExito: string = '';
  formularioRegistro:FormGroup;
  passwordVisible:boolean = false;

  constructor(private fb:FormBuilder, private clienteService:ClienteServiceService,private router:Router){

    this.formularioRegistro = this.fb.group({
      nombre_cliente: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      telefono:['',[Validators.required,Validators.maxLength(10)]],
      direccion:['',Validators.required],
      perfil_cliente: ['',Validators.required]

    })
  }

  //funcion de visibilidad de password
  mostrarPassword():void{
    this.passwordVisible = !this.passwordVisible;

  }


  //funcion de registro del cliente
  registrarCliente(){

    try{

      const cliente:Cliente = {
        ...this.formularioRegistro.value

      }

      if(this.formularioRegistro.valid){

        this.estaCargando = true;
        this.errorMensaje = '';

        this.clienteService.registroCliente(cliente).subscribe({

          next: (response) =>{

            this.estaCargando = false;

            if(response){
              this.mensajeExito = 'Registro exitoso';
              console.log('Registro exitoso, respuesta del backen:' ,JSON.stringify({

                status:response.status,
                message: response.message,
                data:response.data,
                code: response.code,

              },null,2))

            }else{

              this.errorMensaje = 'Error en el registro del usuario',
              console.log('Ocurrio un error al registrar el usuario',response);

            }

            console.log('Redirigiendo al login....');

            setTimeout(() =>{

              this.mensajeExito = 'Registro exitoso'
              this.router.navigate(['/cliente-login'])


            },1500)

          },
          error: (error) =>{

            this.estaCargando = false;
            this.errorMensaje = 'Error al registrar el cliente';
            console.log('Error al registrar el cliente',JSON.stringify(error,null,2));

          }



        })

      }else{

        this.errorMensaje = 'Por favor, complete todos los campos requeridos';
        console.log('Complete todo porfavor',this.formularioRegistro.errors);

      }



    }catch(e){

      console.log('Error en el registro del cliente',e);

    }


  }












  

}
