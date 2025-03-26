import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Producto, ProductosResponse } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private apiGlobal = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }


  obtenerProductos(): Observable<Producto[]> {

    
    return this.http.get<ProductosResponse>(`${this.apiGlobal}/productos`)
      .pipe(
        map(response => response.data || [])
      );
  }


agregarProducto(producto:Producto):Observable<Producto>{

  return  this.http.post<Producto>(`${this.apiGlobal}/productos`,producto)
}


  obtenerProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiGlobal}/productos/${id}`);
  }
  
}
