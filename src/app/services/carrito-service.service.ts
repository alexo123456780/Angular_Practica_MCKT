import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Carrito } from '../interfaces/carrito';
import { CarritoResponse } from '../interfaces/carrito';

@Injectable({
  providedIn: 'root'
})

export class CarritoServiceService {

  private apiBase = environment.apiGlobal;

  constructor(private http:HttpClient) {}


  agregaralCarrito(carrito:Carrito):Observable<CarritoResponse>{

    return this.http.post<CarritoResponse>(`${this.apiBase}/addCar`,carrito).pipe(

      map(response =>{

        console.log('Articulo agregado con exito al carrito, respuesta' , JSON.stringify({

          status: response.status,
          message: response.message,
          data: response.data,
          code: response.code
        }))


        return response
      })
    )
  }


  eliminarCarrito(id:number):Observable<CarritoResponse>{

    return this.http.delete<CarritoResponse>(`${this.apiBase}/eliminarCarrito/${id}`).pipe(

      map(response =>{

        console.log('Info del carrito eliminado exitosamente, respuesta: ',JSON.stringify({

          status:response.status,
          message:response.message,
          code:response.code

        }))


        return response;
      })
    )
  }








}
