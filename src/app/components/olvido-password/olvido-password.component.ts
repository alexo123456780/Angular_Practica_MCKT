import { Component ,type OnInit} from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioServiceService } from '../../services/usuario-service.service';
import { AutServiceService } from '../../services/aut-service.service';

@Component({
  selector: 'app-olvido-password',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './olvido-password.component.html',
  styleUrls: ['./olvido-password.component.scss']
})

export class OlvidoPasswordComponent implements OnInit {

  mensajeExito: string = '';
  mensajeError: string = '';
  estaCargando: boolean = false;
  formularioPasword: FormGroup;
  id_Usuario: number | null  = null

  constructor(private authService:AutServiceService, private usuarioService:UsuarioServiceService,private fb:FormBuilder, private router:Router){

    this.formularioPasword = this.fb.group({

      password: ['',[Validators.required, Validators.minLength(4)]],
      confirmarPassword: ['',[Validators.required,Validators.minLength(4)]]
    })

  }


  ngOnInit(): void {

    this.obtenerIdUsuario();
    
  }



  validarPassword():boolean{

    const password = this.formularioPasword.get('password')?.value;
    const confirmPassword = this.formularioPasword.get('confirmarPassword')?.value;

    if(password !== confirmPassword){

      this.mensajeError = 'Las contrasenas no coinciden,verifique de nuevo porfavor'
      return false;
      

    }

    return true;
    
    
  }


  obtenerIdUsuario():void{

    this.id_Usuario = this.authService.obtenerIdUsuario();

  }

  cambiarPassword(){



    if(!this.id_Usuario){

      this.mensajeError = 'El id del usuario no existe o no ha iniciado sesion..';
      return;

    }

   
    if(this.formularioPasword.valid ){

      const password = this.formularioPasword.get('password')?.value;
    
      this.estaCargando = true;
      this.mensajeError = '';

      if(!this.validarPassword()){
        this.estaCargando = false;
        return;
      }


  
      this.usuarioService.cambiarPassword(this.id_Usuario,{password}).subscribe({

        next: (response) =>{

          this.estaCargando = false;

          if(response){

            this.mensajeExito = 'El password se cambio correctamente';
            console.log('Password cambiado correctamente',JSON.stringify(response.data,null,2));

            setTimeout(() =>{

              console.log('Redirigiendo al menu principal...')
              this.router.navigate(['/dashboard'])

            },1500)
          }

        },

        error: (error) =>{

          this.estaCargando = false;
          this.mensajeError = 'Ocurrio un error inesperado intente de nuevo porfavor verifique su informacion antes';

          console.log('Error del servidor',JSON.stringify(error,null,2))

        }

      })

    }else{

      this.mensajeError = 'Completa el formulario de password'


    }
  }



}
