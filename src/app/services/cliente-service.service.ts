import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ClienteResponse } from '../interfaces/cliente.interface';
import { Cliente } from '../interfaces/cliente.interface';


@Injectable({
  providedIn: 'root'
})

export class ClienteServiceService {

  private apiBase = environment.apiGlobal;

  constructor(private http:HttpClient){}

  //login de cliente

  loginCliente(cliente:Cliente):Observable<ClienteResponse>{

    return this.http.post<ClienteResponse>(`${this.apiBase}/loginCliente`,cliente).pipe(

      map(response =>{

        console.log('Inicio de sesion exitoso, respuesta:' , JSON.stringify({

          status:response.status,
          message: response.message,
          code: response.code,
          data:response.data
        },null,2))

        return response;

      })

    )
  }


  //registro de cliente

  registroCliente(cliente:Cliente):Observable<ClienteResponse>{

    return this.http.post<ClienteResponse>(`${this.apiBase}/registrarCliente`,cliente).pipe(

      map(response =>{

        console.log('Registro exitoso del cliente, respuesta: ',JSON.stringify({

          status:response.status,
          message:response.message,
          code:response.code,
          data:response.data

        },null,2))


        return response;


      })
    )

  }














}
