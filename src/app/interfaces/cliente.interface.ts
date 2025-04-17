export interface Cliente{

    id:number,
    nombre_cliente:string,
    email:string,
    telefono:string,
    direccion:string,
    password:string,
    perfil_cliente:string,
    created_at:string,
    updated_at?:string

}


export interface ClienteResponse{

    status:boolean,
    message:string,
    data:Cliente,
    token:string,
    code:number

}


export interface ClienteListaResponse{

    status:boolean,
    message:string,
    data: Cliente[],
    token: string
    code: number;


}


export interface ClientePassword{

    password:string
}


