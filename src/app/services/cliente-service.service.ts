import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { ClientePassword, ClienteResponse } from '../interfaces/cliente.interface';
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


  obtenerIDCliente():number | null{

    try{

      const cliente = localStorage.getItem('cliente');

      let id = 0;

      if(!cliente){

        return  null;

      }


      const clienteJson = JSON.parse(cliente);

      if(clienteJson && clienteJson.id && clienteJson.id !== null  && clienteJson.id !== undefined && typeof clienteJson.id === 'number'){

        id = clienteJson.id;

        return id;

      }

      return null;




    }catch(error){


      console.error('Erro al obtener el Id del cliente',error)
      return null;

    }
  }

  verInfoCliente(id:number):Observable<ClienteResponse>{


    return this.http.get<ClienteResponse>(`${this.apiBase}/verInfo/${id}`).pipe(

      map(response =>{

        console.log('Respuesta de la api: ',JSON.stringify({

          status:response.status,
          message:response.message,
          data:response.data,
          code:response.code

        },null,2))


        return response;


      })



    )
  }


  cambiarPassword(id:number,password:ClientePassword):Observable<ClienteResponse>{

    return this.http.put<ClienteResponse>(`${this.apiBase}/cambioPassword/${id}`,password).pipe(

      map(response =>{

        console.log('Peticion exitosa datos del backend: ',JSON.stringify({

          status: response.status,
          message:response.message,
          data:response.data,
          code:response.code
        },null,2))


        return response;
      })

    )
  }















}
