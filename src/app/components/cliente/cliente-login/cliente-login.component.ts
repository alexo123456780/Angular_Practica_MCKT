import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Cliente } from '../../../interfaces/cliente.interface';
import { ClienteServiceService } from '../../../services/cliente-service.service';

@Component({
  selector: 'app-cliente-login',
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  standalone:true,
  templateUrl: './cliente-login.component.html',
  styleUrls: ['./cliente-login.component.scss']
})

export class ClienteLoginComponent { 
  
  formulario: FormGroup;
  errorMensaje: string = '';
  mensajeExito: string = '';
  estaCargando: boolean = false;

  constructor(private clienteService:ClienteServiceService, private fb:FormBuilder, private router:Router){

    this.formulario = this.fb.group({

      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]

    })
  }

  login(){

    //defino los datos del cliente basado en algunos tipos definidos de mi interfaz(email,password)
    const cliente: Cliente = {
      ...this.formulario.value
    }


    if(this.formulario.valid){

      this.estaCargando = true

      this.clienteService.loginCliente(cliente).subscribe({

        next: (response) =>{

          this.estaCargando = false
          this.errorMensaje = '';


          if(response){

            console.log('Login exitoso:',response.message);

            const token = response.token;

            if(token){

              localStorage.setItem('token',token);
              console.log('Token guardado correctamente');


            }else{

              console.log('No se encontro un token disponible..');
            }


            if(response.data){

              console.log('Guardando datos del usuario...');

              localStorage.setItem('data',JSON.stringify(response.data))

              console.log('Datos del cliente guardado correctamente',JSON.stringify(response.data,null,2))

            }else{

              console.log('No se encontro un cliente');

            }

            if(!response){

              console.log('No se encontro informacion del cliente');

            }


            console.log('Navegando al portal de clientes....');

            /*setTimeout(() =>{

              this.router.navigate(['/cliente-home']);
              this.mensajeExito = 'Login exitoso'
            },1500)*/
          }else{

            console.log('Error al iniciar sesion',response);
            this.errorMensaje = 'Error de inicio de sesion'
          }

        },

        error: (error) =>{

          this.estaCargando = false;
          console.log('Credenciales Invalidas', JSON.stringify(error,null,2));
          this.errorMensaje = 'Credenciales Invalidas intente de nuevo porfavor...'

        }
      })





    }else{

      console.log('No deje espacios sin llenar del formulario',this.formulario.errors);
      this.errorMensaje = 'Rellene todos los campos del formulario';

    }
  }












}
