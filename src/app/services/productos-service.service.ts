import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { ProductosResponse } from '../interfaces/producto.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductosServiceService {


  private apiGlobal = environment.apiUrl;
  
  constructor(private http: HttpClient) { }


  obtenerProductos(): Observable<Producto[]>{

    return this.http.get<ProductosResponse>(`${this.apiGlobal}/productos`).pipe(

      map((response=>{

        console.log(`Exito en la peticion de los productos : ${response.message}`);
        return response.data || [];

      }))

    )

  }


  agregaProductos(producto:Producto): Observable<Producto[]>{

    return this.http.post<ProductosResponse>(`${this.apiGlobal}/crearProducto`,producto).pipe(

      map((response)=>{

        console.log(`Exito en la peticion de agregar un producto: ${response.message}`);
        return response.data || [];

      })
    )



  }


  obtenerProducto(id: number): Observable<Producto> {
    return this.http.get<{data: Producto}>(`${this.apiGlobal}/productos/${id}`)
      .pipe(
        map(response => response.data)
      );
  }







}
