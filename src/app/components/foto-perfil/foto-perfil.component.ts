import { Component, type OnInit } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AutServiceService } from '../../services/aut-service.service';
import { UsuarioServiceService } from '../../services/usuario-service.service';

@Component({
  selector: 'app-foto-perfil',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './foto-perfil.component.html',
  styleUrl: './foto-perfil.component.scss'
})
export class FotoPerfilComponent implements OnInit {

  formularioFotoPerfil: FormGroup;
  estaCargando: boolean = false;
  mensajeError : string = '';
  mensajeExito: string = '';
  usuarioId: number | null = 1;


  constructor(private authService:AutServiceService, private usuarioService:UsuarioServiceService,private fb:FormBuilder,private router:Router){

    this.formularioFotoPerfil = this.fb.group({

      perfil_usuario:['',Validators.required]
    })
  }


  ngOnInit(): void {

    this.obtenerIdUsurio();
    
  }

  obtenerIdUsurio():void{

    this.usuarioId = this.authService.obtenerIdUsuario()
    console.log('Id del usuario numero:',this.usuarioId);

  }

  cambiarFotoPerfil(){

    const perfil_usuario = this.formularioFotoPerfil.get('perfil_usuario')?.value;

    if(!this.usuarioId){
      console.log('El id del usuario no esta disponible por lo tanto es nulo');
      return;
    }


    if(this.formularioFotoPerfil.valid){

      this.estaCargando = true;
      this.mensajeError = '';
      this.mensajeExito = '';

      this.usuarioService.cambiarFotoPerfil(this.usuarioId,{perfil_usuario}).subscribe({

        next: (response) =>{

          this.estaCargando = false;
          this.mensajeExito = 'Tu foto ha sido cambida exitosamente, cierra tu sesion y vuelve a entrar para ver los cambios';
          this.mensajeError = '';

          console.log('Foto cambiada correctamente', JSON.stringify(response.data,null,2));

          setTimeout(() =>{

            console.log('Navegando al dashboard....');

            this.router.navigate(['/dashboard']);


          },1500)

        },

        error: (error) =>{
          this.estaCargando = false;
          this.mensajeError = 'Ocurrio un error al cambiar la foto , intente de nuevo porfavor';
          this.mensajeExito = '';
          console.log('Error al cambiar respuesta del backned',JSON.stringify(error,null,2))
        }
        
      })

    }else{

      this.mensajeError = 'Por favor complete todos los campos';
      this.mensajeExito = '';
    }


  }

  rutaDashboard():void{

    this.router.navigate(['/dashboard'])


  }









}
