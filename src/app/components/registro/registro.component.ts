import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../interfaces/usuario.interface';
import { AutServiceService } from '../../services/aut-service.service';


@Component({
  selector: 'app-registro',
  standalone:true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})


export class RegistroComponent {

  registroFormulario: FormGroup;
  estaCargando: boolean = false;
  errorMensaje: string = '';
  mensajeExito: string = '';


  constructor(private fb:FormBuilder,private authService:AutServiceService,private router:Router){

    this.registroFormulario = this.fb.group({

      nombre: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(4)]],
      perfil_usuario: ['',[Validators.required,Validators.maxLength(250)]],
    
    })

  }


  registroUsuario(){

    const usuario: Usuario ={
      ...this.registroFormulario.value
    }

    if(this.registroFormulario.valid){

      this.estaCargando = true;
      this.errorMensaje = '';


      this.authService.registarUsuario(usuario).subscribe({

        next: (response) =>{
          
          this.mensajeExito = 'Registro exitoso...'
          this.estaCargando = false;

          if(response){

            console.log('Registro exitoso del usuario:' , JSON.stringify({

              status: response.status,
              message: response.message,
              data:response.data,
              code:response.code

            },null,2));

  
          }else{

            console.log('Registro fallido');
            this.errorMensaje = 'Registro fallido';

          }

          console.log('Navegando ala pagina de inicio de sesion...');

          setTimeout(() =>{

            this.router.navigate(['/login']);

          },1500)

        },

        error: (error) =>{

          this.estaCargando = false;
          this.errorMensaje = 'Ocurrio un error al registrar el usuario';
          console.log('Respuesta del backend:' , error);

        }

      })

    }else{
      console.log('Formulario invalido',this.registroFormulario.errors);
      this.errorMensaje = 'Formulario invalido';
    }










  }










  




  






}
