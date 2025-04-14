import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { UsuarioResponse } from '../interfaces/usuario.interface';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/usuario.interface';



@Injectable({
  providedIn: 'root'
})


export class AutServiceService {

  private apiBase = environment.apiGlobal;

  constructor(private http:HttpClient){}


  //nota: JsonStringify sirve como un json en php osea convierto algo a un formato json
  //nota el uso de null en JsonStringify signifa que el valor no se modifica y el 2 es el formato de espacio que tendra ese json

  login(usuario:Usuario):Observable<UsuarioResponse>{

    return this.http.post<UsuarioResponse>(`${this.apiBase}/login`,usuario).pipe(

      map(response =>{

        console.log('Logeado exitosamente respuesta:',JSON.stringify({

          status: response.status,
          message: response.message,
          code: response.code,
          data: response.data,
          

        },null,2));

        return response;

      },2)
    )

  }


  //funcion registrar usuario


  registarUsuario(usuario:Usuario):Observable<UsuarioResponse>{

    return this.http.post<UsuarioResponse>(`${this.apiBase}/register`,usuario).pipe(

      map(response =>{

        console.log('Usuario registrado correctamente respuesta: ',JSON.stringify({

          status: response.status,
          message: response.message,
          code: response.code,
          data: response.data
        },null,2))

        return response;

      })

    )

  }



  obtenerIdUsuario():number | null{
    try{

    const usuario = localStorage.getItem('data');

    if(!usuario){

      console.log('No se encontro el usuario en el localstorage,Inicia sesion porfavor...');
      return null;

    }

    const usuarioData = JSON.parse(usuario);

    if(usuarioData.id !== null && usuarioData.id !== undefined && typeof usuarioData.id === 'number'){

      console.log('El id del usuario es: ', usuarioData.id);

      return Number(usuarioData.id)

    }


    return null;
    
    }catch(error){

      console.error('Error al obtener el id del usuario: ',error);

      return null;


    }  
  }






  




  






}
