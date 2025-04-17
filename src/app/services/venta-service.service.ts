import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { VentaResponse } from '../interfaces/venta';
import { Venta } from '../interfaces/venta';

@Injectable({
  providedIn: 'root'
})

export class VentaServiceService {

  private apiBase = environment.apiGlobal;

  constructor(private http:HttpClient) {}



  generarVenta(venta:Venta):Observable<VentaResponse>{

    return this.http.post<VentaResponse>(`${this.apiBase}/realizarVenta`,venta).pipe(

      map(response =>{

        console.log('Venta creada exitosamente respuesta del backend:',JSON.stringify({

          status:response.status,
          message: response.message,
          data:response.data,
          code:response.code

        },null,2))

        return response;
      })

    )
  }



  


}
