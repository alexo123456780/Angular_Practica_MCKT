export interface Usuario{
    id:number,
    nombre:string,
    email:string,
    password:string,
    perfil_usuario:string,
    created_at: Date,
    updated_at: Date,
}



//nota: el operador | se usa para decir que un atributo o propiedad puede ser de 2 o mas tipos
export interface UsuarioResponse{

    status:boolean,
    message:string,
    data: Usuario
    code:number,
    token:string,

}


export interface UsuarioListaResponse{

    status: boolean,
    message: string,
    data: Usuario[],
    code: number,
    token:string

}


export interface UsuarioPassword{

    password:string,
}

export interface PerfilUsuario{
    perfil_usuario: string
}