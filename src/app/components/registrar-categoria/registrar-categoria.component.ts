import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CategoriaServiceService } from '../../services/categoria-service.service';
import { Categoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'app-registrar-categoria',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './registrar-categoria.component.html',
  styleUrls: ['./registrar-categoria.component.scss']
})


export class RegistrarCategoriaComponent {

  mensajeExito: string = '';
  mensajeError: string = '';
  categoriaFormulario: FormGroup;


  constructor(private categoriaService:CategoriaServiceService, private router:Router, private fb:FormBuilder){

    this.categoriaFormulario = this.fb.group({

      nombre_categoria: ['',[Validators.required,Validators.maxLength(100)]],
      imagen_categoria: ['',Validators.required]
    })

  }



  crearCategoria(){

    const categoria: Categoria = {
      ...this.categoriaFormulario.value
    }

    if(this.categoriaFormulario.valid){

      this.mensajeError = '';
      this.mensajeExito = '';

      this.categoriaService.crearCategoria(categoria).subscribe({

        next: (response) =>{

          this.mensajeExito = 'Tu categoria ha sido creado exitosamente';

          console.log('Categoria creada exitosamente',JSON.stringify(response.data,null,2));

          setTimeout(() =>{

            this.router.navigate(['/dashboard']);

          },2000)

        },

        error: (error) =>{

          this.mensajeError = 'Error al crear la categoria';

          console.log('respuesta del backend:',JSON.stringify(error,null,2));

        }
      })

    }else{

      this.mensajeError = 'Por favor, completa todos los campos del formulario';


    }

  }

  navegaralHome():void{

    this.router.navigate(['/dashboard']);


  }











 










}
