import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Usuario,UsuarioResponse } from '../interfaces/usuario.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class AutServiceService {

  private apiGlobal = environment.apiUrl;


  constructor(private http : HttpClient) { }



  login(email: string, password: string): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${this.apiGlobal}/login`, { email, password }).pipe(

      map(response => {

        console.log(`Exito en la peticion de login: ${response.message}`);
        return response


      })


    )
  }

  registro(nombre:string ,email:string , password:string): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${this.apiGlobal}/register`, {nombre,email,password}).pipe(

      map(response =>{

        console.log(`Exito en la peticion de registro: ${response.message}`);
        return response
      })



    )
  }


  getUserId(): number| null{
    try {
      const user = localStorage.getItem('user');
      
      if(!user || user === 'undefined') {
        console.log('No hay usuario almacenado en localStorage debes de iniciar sesion antes de crear productos');
        return null;
      }
      
      const userData = JSON.parse(user);


      if (!userData) {
        console.log('No se pudo parsear el objeto de usuario');
        return null;
      }
      
      if (userData.id !== undefined && userData.id !== null && !isNaN(Number(userData.id))) {
        return Number(userData.id);
      }
      
      if (userData.data && userData.data.id !== undefined && userData.data.id !== null) {
        return Number(userData.data.id);
      }
      
      const token = localStorage.getItem('token');
      if (token && token !== 'undefined') {
        console.log('Hay un token válido, pero no se encontró ID de usuario. Intente iniciar sesión nuevamente.');
      }
      
      console.log('El objeto de usuario no contiene un ID válido:', userData);
      return null;
    } catch(e) {
      console.error(`Error al obtener el ID del usuario: ${e}`);
      this.recuperarSesion();
      return null;
    }
  }
  
  private recuperarSesion(): void {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined') {
      console.log('Hay un token válido, pero la información del usuario es incorrecta');
      
      const userStr = localStorage.getItem('user');
      if (userStr && userStr !== 'undefined') {
        try {
          const userData = JSON.parse(userStr);
          
          if (userData.data && typeof userData.data === 'object') {
            localStorage.setItem('user', JSON.stringify(userData.data));
            console.log('Información de usuario reparada y guardada correctamente');
          }
        } catch (e) {
          console.error('Error al intentar reparar la información del usuario:', e);
        }
      }
    }
  }
}
