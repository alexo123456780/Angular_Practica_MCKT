import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Usuario,UsuarioResponse } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})


export class AutServiceService {

  private apiGlobal = 'http://127.0.0.1:8000/api';


  constructor(private http : HttpClient) { }



  login(email: string, password: string): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${this.apiGlobal}/login`, { email, password });
  }

  registro(nombre:string ,email:string , password:string): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${this.apiGlobal}/register`, {nombre,email,password});
  }


  getUserId(): number| null{

    const user = localStorage.getItem('user');

    if(user){

      const userData = JSON.parse(user);
      return userData.id;


    }
    return null;


  }

  







}
