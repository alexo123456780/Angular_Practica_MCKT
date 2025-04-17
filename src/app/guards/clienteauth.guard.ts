import { inject, Inject } from "@angular/core";
import { Router } from "@angular/router";

export const ClienteAuthGuard = () => {

    const router = inject(Router);
    const token = localStorage.getItem('cliente_token');
    const dataCliente = localStorage.getItem('cliente');

    if(!token || !dataCliente){

        console.log('No hay informacion del cliente logeate antes de entrar a dashboard...');

        router.navigate(['/cliente-login']);

        return false
    }
    


    

    
    return true;

}