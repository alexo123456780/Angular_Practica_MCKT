export  interface Usuario{

    id:number;
    nombre:string;
    email:string;
    password:string;
    token:string;
}
export interface UsuarioResponse{

    id:number;
    status:boolean;
    message:string;
    data:Usuario;
    code:number;
    createdAt:string;
    updatedAt:string;
    token:string;
    
}
