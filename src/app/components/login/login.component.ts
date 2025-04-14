import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../interfaces/usuario.interface';
import { AutServiceService } from '../../services/aut-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formulario: FormGroup;
  errorMensaje: string = '';
  estaCargando: boolean = false;
  mensajeExito: string = '';


  constructor(private fb:FormBuilder, private router:Router , private authService:AutServiceService){

    this.formulario = this.fb.group({

      email:['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(4)]]
    })
  }


  login(){

    const usuario: Usuario = {
      ...this.formulario.value
    }

    if(this.formulario.valid){

      this.estaCargando = true;
      this.errorMensaje = '';


      this.authService.login(usuario).subscribe({

        next: (response) =>{

          this.estaCargando = false;
          this.mensajeExito = 'Login exitoso...'
          console.log('Respuesta del login:',response.message);


          if(response){

            console.log('Login exitoso guardando el token...');

            const token = response.token;


            if(token){

              console.log('Guardando token...');
              localStorage.setItem('token', token);
              console.log('Token guardado correctamente')
            }else{

              console.log('No se encontro el token')
              this.router.navigate(['/login']);

            }

            if(response.data){

              console.log('Guardando datos del usuario...');
              localStorage.setItem('data',JSON.stringify(response.data));
              console.log('Usuario guardado correctamente',JSON.stringify(response.data,null,2));

          
            }

            if(!response){

              console.log('No hay info del usuario');
            }


            console.log('Navegando al dashboard...');

            setTimeout(() =>{

              this.router.navigate(['/dashboard']);
              this.mensajeExito = 'Login exitoso'

            },1500)

          }else{

            console.log('Ocurrio un error al momento de iniciar sesion', response);
            this.errorMensaje = 'Error de login'

          }



        },

        error: (error) =>{
          this.estaCargando = false;
          this.errorMensaje = 'Credenciales invalidas intente de nuevo porfavor'
          console.error('Credenciales invalidas: ',JSON.stringify(error,null,2));

        }

      })


    }else{

      console.log('Formulario Invalido',this.formulario.errors);
      this.errorMensaje = 'Complete todos los campos requeridos'
    }
  }


 
}
