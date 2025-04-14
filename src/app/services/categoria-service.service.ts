import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { CategoriaResponse } from '../interfaces/categoria.interface';
import { CategoriaListaResponse } from '../interfaces/categoria.interface';
import { Categoria } from '../interfaces/categoria.interface';


@Injectable({
  providedIn: 'root'
})
export class CategoriaServiceService {

  private apiBase = environment.apiGlobal;

  constructor(private http:HttpClient){}

  //funcion para obtener todas las categorias


  obtenerCategorias():Observable<CategoriaListaResponse>{

    return this.http.get<CategoriaListaResponse>(`${this.apiBase}/categorias`).pipe(

      map(response =>{

        console.log('Categorias obtenidas correctamente: respuesta: ',JSON.stringify({

          status: response.status,
          message: response.message,
          code: response.code,
          data: response.data
        },null,2))

        return response;


      })
    )
  }


  crearCategoria(categoria:Categoria):Observable<CategoriaResponse>{

    return this.http.post<CategoriaResponse>(`${this.apiBase}/crearCategoria`,categoria).pipe(

      map(response =>{

        console.log('Se creo la categoria correctamente, respuesta: ',JSON.stringify({

          status:response.status,
          message: response.message,
          data: response.data,
          code: response.code

        }))

        return response;
      })
    )

  }


  obtenerCategoriaId(id:number):Observable<CategoriaResponse>{

    return this.http.get<CategoriaResponse>(`${this.apiBase}/categorias/${id}`).pipe(

      map(response =>{

        console.log('Se obtuvo la categoria correctamente,respuesta: ',JSON.stringify({

          status:response.status,
          message: response.message,
          data: response.data,
          code: response.code
        }))


        return response;


      })

    )



  }













}
