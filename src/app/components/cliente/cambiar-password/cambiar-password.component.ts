import { Component, type OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ClienteServiceService } from '../../../services/cliente-service.service';
import { ClientePassword } from '../../../interfaces/cliente.interface';


@Component({
  selector: 'app-cambiar-password',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.scss']
})



export class CambiarPasswordComponent implements OnInit {

estaCargando: boolean = false;
mensajeExito: string = '';
mensajeError: string = '';
mostrarPassword: boolean = false;
formularioPassword: FormGroup;
id_cliente: number | null = null

constructor(private clienteService:ClienteServiceService, private fb: FormBuilder, private router:Router){

  this.formularioPassword = this.fb.group({

    password: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    confirmarPassword: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
  })
}



ngOnInit(): void {

  this.obtenerIdCliente();


}

mosrarPassword():void{

  this.mostrarPassword = !this.mosrarPassword;
}

obtenerIdCliente():number | null{

  const id = this.clienteService.obtenerIDCliente()

  if(typeof id === 'number'){

    this.id_cliente = id;

    console.log('El id del cliente es:',this.id_cliente);

    return this.id_cliente;

  }

  if(!this.id_cliente){

    return null;
  }

  return null;
}


validarPassword():boolean{

  const password1 = this.formularioPassword.get('password')?.value;
  const password2 = this.formularioPassword.get('confirmarPassword')?.value;

  if(password1 !== password2){

    this.mensajeError = 'No coinciden los password intente de nuevo porfavor'

    setTimeout(() =>{

      this.mensajeError = '';

    
    },1500)


    return false
    
  }

  return true;

}

enviarPassword():void{

  if(this.formularioPassword.valid){

    this.estaCargando = true;
    this.mensajeError = ''

    if(!this.validarPassword()){

      this.estaCargando = false;
      return

    }

    if(!this.id_cliente){
      return
    }

    const passwordInput = this.formularioPassword.get('password')?.value;

    const password : ClientePassword = {password:passwordInput}

    this.clienteService.cambiarPassword(this.id_cliente,password).subscribe({

      next: (response) =>{
        this.estaCargando = false;
        this.mensajeExito = 'El password se cambio correctamente';

        console.log('Password cambiado con exito:',JSON.stringify(response.data,null,2));

        setTimeout(() =>{

          this.router.navigate(['/cliente-home'])

        },1500)
        
      },

      error: (error) =>{

        this.estaCargando = false;
        this.mensajeError = 'Ocurrio un error cambiar el password';
        console.log('Detalles del error:',JSON.stringify(error,null,2));

        setTimeout(() =>{

          this.mensajeError = '';


        },1500)

      }

    })

  }
}


rutaHome():void{

  this.router.navigate(['cliente-home']);

}























}
