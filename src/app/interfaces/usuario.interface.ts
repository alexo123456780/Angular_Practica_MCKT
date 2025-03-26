export  interface Usuario{

    id:number;
    nombre:string;
    email:string;
    password:string;
    token:string;
}



export interface UsuarioResponse{

    status:boolean;
    message:string;
    data:Usuario;
    code:number;
    createdAt:string;
    updatedAt:string;
    token:string;
    
}
