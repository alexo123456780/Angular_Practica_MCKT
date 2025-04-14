import { Inject, inject } from '@angular/core';
import { Router } from '@angular/router';

export const usuarioGuard = () =>{

  const router = inject(Router);
  const token = localStorage.getItem('token');


  if(!token){

    console.log('Se requiere que inicie sesion antes');
    router.navigate(['/login']);

    return false;


  }

  return true;






}


