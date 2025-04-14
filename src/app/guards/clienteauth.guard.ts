import { inject, Inject } from "@angular/core";
import { Router } from "@angular/router";

export const ClienteAuthGuard = () => {

    const router = inject(Router);
    const token = localStorage.getItem('token');

    if(!token){

        console.log('No hay token se require que inicie sesion...');

        router.navigate(['/cliente-login']);

        return false

    
    }

    return true;

}