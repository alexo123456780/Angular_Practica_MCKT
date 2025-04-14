export interface Cliente{

    id:number,
    nombre_cliente:string,
    email:string,
    telefono:string,
    direccion:string,
    password:string,
    perfil_cliente:string,
    created_at: Date,
    updated_at: Date,

}


export interface ClienteResponse{

    status:boolean,
    message:string,
    data:Cliente | Cliente[],
    token:string,
    code:number

}