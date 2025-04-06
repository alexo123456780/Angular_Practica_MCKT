import { Component } from '@angular/core';
import { FormBuilder,Validators,FormGroup,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClienteServiceService } from '../../../services/cliente-service.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-cliente-login',
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  standalone:true,
  templateUrl: './cliente-login.component.html',
  styleUrls: ['./cliente-login.component.scss']
})
export class ClienteLoginComponent {


  loginFormulario : FormGroup;
  errorMessage: string = '';
  estaCargando : boolean = false;
  mensajeExito: string = "";


  constructor(private fb:FormBuilder , private clienteService: ClienteServiceService, private router:Router){

    this.loginFormulario = this.fb.group({

      email: ['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })

  }


  onSubmit(){


    if(this.loginFormulario.valid){

      this.estaCargando = true;

      this.errorMessage = "";


      const {email,password} = this.loginFormulario.value;


      this.clienteService.login(email,password).subscribe({

        next: (response) =>{

          this.estaCargando = false;


          console.log(`Respuessta del servidor: ${response}`);


          if(response && response.status){

            console.log("Inicio de sesion correcto");


            const token = response.token || (response.data && response.data.token);

            console.log("Guardando el token en el localStorage");


            if(token){

              localStorage.setItem('token',token);


            }else{

              console.log('No se hayo token para el cliente');

            }


            if(response.data ){


              localStorage.setItem('user',JSON.stringify(response.data));

              console.log(`Guardando el cliente : ${response.data}`);

            }else{


                localStorage.setItem('user', JSON.stringify(response));

                console.log(`Guardando el cliente: ${response}`);


                if(!response){

                  console.log("No se encontro el cliente");
                  this.errorMessage = "No se encontro el cliente";
                }


            }


            console.log('Redirigiendo al menu de los clientes');



            setTimeout(() =>{

              console.log('Redirigiendo al menu de los clientes');

              this.router.navigate(['/cliente-home']);

            },1500);

          }else{

            console.log(`Inicio malo ${response.status}`);

            this.errorMessage = response.message || 'Que paso crack ocurrio un error de login'

          
          }


      
        },

        error: (error) =>{

          this.estaCargando = false;

          console.error('Error en el inicio de sesion',error);

          this.errorMessage = 'Ocurrio un error en el inicio de sesion';

        }


      })
















    }else{

      console.log("Formulario invalido");

      this.errorMessage = "Formulario invalido";



    }




  }












}
