import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { UsuarioListaResponse } from '../interfaces/usuario.interface';
import { UsuarioResponse } from '../interfaces/usuario.interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UsuarioPassword } from '../interfaces/usuario.interface';
import { PerfilUsuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})

export class UsuarioServiceService {

  private apiBase = environment.apiGlobal;

  constructor(private http:HttpClient) { }


  obtenerTodosUsuarios():Observable<UsuarioListaResponse>{

    return this.http.get<UsuarioListaResponse>(`${this.apiBase}/usuarios`).pipe(

      map(response =>{

        console.log('Peticion exitosa, respuesta del backend: ',JSON.stringify({

          status: response.status,
          message: response.message,
          code: response.code,
          data: response.data
        },null,2))

        return response;
      })
    )
  }

  cambiarPassword(id:number, password:UsuarioPassword):Observable<UsuarioResponse>{

    return this.http.put<UsuarioResponse>(`${this.apiBase}/password/${id}`,password).pipe(

      map(response =>{

        console.log('Peticion exitosa, respuesta del backend:',JSON.stringify({

          status: response.status,
          message:response.message,
          data: response.data,
          code: response.code
        },null,2))

        return response;

      })
    )
  }

  cambiarFotoPerfil(id:number,foto:PerfilUsuario):Observable<UsuarioResponse>{

    return this.http.put<UsuarioResponse>(`${this.apiBase}/cambiarFoto/${id}`,foto).pipe(

      map(response =>{

        console.log('Perfil de usuario cambiado correctamente, respuesta del backend',JSON.stringify({

          status:response.status,
          message: response.message,
          data: response.data,
          code: response.code

        },null,2))


        return response;
      }) 
    )

  }



  




}
