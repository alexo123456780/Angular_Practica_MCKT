import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProductoResponse } from '../interfaces/producto.interface';
import { Producto } from '../interfaces/producto.interface';
import { ProductoListaResponse } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosServiceService {

  private apiBase = environment.apiGlobal;

  constructor(private http:HttpClient){}


  obtenerProductos():Observable<ProductoListaResponse>{

    return this.http.get<ProductoListaResponse>(`${this.apiBase}/productos`).pipe(

      map(response =>{

        console.log('Se obtuvieron correctamente los productos respuesta: ',JSON.stringify({

          status: response.status,
          message: response.message,
          data: response.data,
          code: response.code

        },null,2))

        return response;
      })

    )
  }


  //nota uso la interfaz de producto recuerda que solo es una plantilla de valores luego tendre que asiganarle un valor propio en una variable del componente que llege a usar
  publicarProducto(producto:Producto):Observable<ProductoResponse>{

    return this.http.post<ProductoResponse>(`${this.apiBase}/crearProducto`,producto).pipe(

      map(response =>{

        console.log('Se creo el producto correctamente, respuesta: ',JSON.stringify({

          status: response.status,
          message: response.message,
          data:response.data,
          code:response.code

        }))

        return response;
      })
    )    
  }


  obtenerProductoId(id:number):Observable<ProductoResponse>{

    return this.http.get<ProductoResponse>(`${this.apiBase}/productos/${id}`).pipe(

      map(response =>{

        console.log('Se obtuvo el producto correctamente, respuesta: ',JSON.stringify({

          status: response.status,
          message:response.message,
          data: response.data,
          code: response.code

        }))

        return response;
      })
    )

  }

  obtenerInfoProducto(id_producto:number):Observable<ProductoResponse>{

    return this.http.get<ProductoResponse>(`${this.apiBase}/ver-info/${id_producto}`).pipe(

      map(response =>{

        console.log('Producto obtenido correctamente',JSON.stringify({

          status:response.status,
          message:response.message,
          data:response.data,
          code:response.code
        },null,2))


        return response;

      })

    )
  }

  






}
