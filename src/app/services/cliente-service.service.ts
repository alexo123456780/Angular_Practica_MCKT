import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';
import { ClienteResponse } from '../interfaces/cliente.interface';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {


  private apiGlobal = environment.apiUrl;

  constructor(private http:HttpClient) { }


  login(email:string , password:string):Observable<ClienteResponse>{


    return this.http.post<ClienteResponse>(`${this.apiGlobal}/loginCliente`,{email,password}).pipe(

      map((response:ClienteResponse) =>{


        console.log(`Login exitoso Camarada:  ${response.message}`);

        return response;


      
      })

    )

  }



  //registro de cliente

  registroCliente(nombre_cliente:string,email:string,telefono:string,direccion:string,password:string,perfil_cliente:string):Observable<ClienteResponse>{

    return this.http.post<ClienteResponse>(`${this.apiGlobal}/clientes`,{nombre_cliente,email,telefono,direccion,password,perfil_cliente}).pipe(

      map((response:ClienteResponse) =>{


        console.log(`Se registro el cliente Correctamente: ${response.message}`);

        return response;



      })





    )





  }


  








}
