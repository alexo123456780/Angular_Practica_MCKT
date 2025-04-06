export interface Cliente{

    id:number,
    nombre_cliente:string,
    email:string,
    telefono:string,
    direccion:string,
    password:string,
    perfil_cliente:string
    token:string

}




export interface ClienteResponse{

    status: boolean;
    message: string;
    data: Cliente,
    code:number
    token:string

}