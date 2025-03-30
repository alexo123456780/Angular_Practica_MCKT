import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/categoria.interface';
import { CategoriaResponse } from '../interfaces/categoria.interface';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaServiceService {


  private apiGlobal = environment.apiUrl;

  constructor(private http: HttpClient) { }



  
  //funcion para ontener todas las categorias
  obtenerCategorias(): Observable<Categoria[]>{

    return this.http.get<CategoriaResponse>(`${this.apiGlobal}/categorias`)
    .pipe(

      map(response =>{

        console.log(`Excelente crack la peticion ha sido exitosa : ${response.message}`);

        return response.data || [];

      })
      
    )
    
  }



  //funcion para crear una categoria


  crearCategoria(categoria:Categoria): Observable<Categoria>{

    return this.http.post<CategoriaResponse>(`${this.apiGlobal}/crearCategoria`,categoria).pipe(

      map(response =>{

        console.log(`Se creo exitosamente la categoria: ${response.message}`);

        return response.data[0];
      })



    )




  }







}
