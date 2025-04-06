export interface Categoria{
    id:number,
    nombre_categoria:string,
    imagen_categoria:string,

}



export interface CategoriaResponse{

    status: boolean;
    message: string;
    data: Categoria[],
    code:number

}


