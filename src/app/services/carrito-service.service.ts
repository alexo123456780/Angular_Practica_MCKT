import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Carrito, CarritoAgregar } from '../interfaces/carrito';
import { CarritoResponse } from '../interfaces/carrito';
import { ListaCarritoResponse } from '../interfaces/carrito';

@Injectable({
  providedIn: 'root'
})

export class CarritoServiceService {

  private apiBase = environment.apiGlobal;

  constructor(private http:HttpClient) {}

  agregarproductoCarrito(carrito:CarritoAgregar):Observable<CarritoResponse>{

    return this.http.post<CarritoResponse>(`${this.apiBase}/addCar`,carrito).pipe(

      map(response =>{

        console.log('Peticion de carrito exitosa, respuesta del backend:',JSON.stringify({

          status: response.status,
          message: response.message,
          data:response.data,
          code: response.code
        },null,2))


        return response;

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

  verCarrito(id_cliente:number):Observable<ListaCarritoResponse>{

    return this.http.get<ListaCarritoResponse>(`${this.apiBase}/productosCarro/${id_cliente}`).pipe(

      map(response =>{

        console.log('Respuesta del bakend exitosa:',JSON.stringify({
          
          status: response.status,
          message: response.message,
          data:response.data,
          code: response.code
        },null,2))

        return response;

      })
    )
  }


  
}
