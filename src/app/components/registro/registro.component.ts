import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { AutServiceService } from '../../services/aut-service.service';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-registro',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})



export class RegistroComponent {


  registroForm: FormGroup;
  errorMessage: string = '';


  constructor(private fb:FormBuilder, private authService:AutServiceService, private router:Router){
    this.registroForm = this.fb.group({
      nombre: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


  onsubmit(){

    if(this.registroForm.valid){

      const {nombre,email,password} = this.registroForm.value;

      this.authService.registro(nombre,email,password).subscribe({

        next:(response) =>{

          console.log(`la respuesta es: ${response.message}`);


          if(response && response.data && response.status && response.message){

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
            console.log('Intentando navegar al Login...');
            this.router.navigate(['/login'])
              .then(() => console.log('Navegación exitosa al dashboard'))
              .catch(err => console.error('Error en la navegación:', err));

          }else{

            console.log(`Respuesta del servidor: ${response}`);

            this.errorMessage = 'Error en el servidor';





          }





        }





      }











      )

      






    }



    
    
  }






  






}
