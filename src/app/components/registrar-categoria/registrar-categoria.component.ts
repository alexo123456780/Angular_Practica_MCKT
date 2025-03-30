import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaServiceService } from '../../services/categoria-service.service';
import { Categoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'app-registrar-categoria',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterModule],
  templateUrl: './registrar-categoria.component.html',
  styleUrls: ['./registrar-categoria.component.scss']
})
export class RegistrarCategoriaComponent {



  estaCargado = false;
  formularioCategoria: FormGroup;
  errorMessage: string = '';
  mensajeExito: string = '';

  constructor(private fb:FormBuilder , private categoriaService:CategoriaServiceService, private router:Router){
    this.formularioCategoria = this.fb.group({

      nombre_categoria: ['',[Validators.required,Validators.minLength(5)]]

    })

  }




  registrarCategoria(){

    if(this.formularioCategoria.valid){

      this.estaCargado = true;
      this.errorMessage = '';

      const categoriaNueva: Categoria = {

        id :0,
        nombre_categoria: this.formularioCategoria.value.nombre_categoria
        

      }

      this.categoriaService.crearCategoria(categoriaNueva).subscribe({

        next:(response =>{

          this.estaCargado = false;
          this.mensajeExito = 'Se creo exitosamente la categoria';

          console.log(`Se creo exitosamente la categoria: ${response}`);

          setTimeout(() =>{

            this.router.navigate(['/dashboard']);

          },1500)


        }),

        error:(error =>{

          this.estaCargado = false;
          this.errorMessage = 'Ocurrio un eororor'

          console.log(`Error al crear la categoria: ${error}`);



        })
      
      })

    }

  }


  navegarDashboard(){

    this.router.navigate(['/dashboard']);
    
  }











}
