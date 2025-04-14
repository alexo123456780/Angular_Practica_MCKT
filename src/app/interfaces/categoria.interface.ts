export interface Categoria{

    id:number,
    nombre_categoria:string,
    imagen_categoria:string,
    created_at: Date,
    updated_at: Date,

}


export interface CategoriaResponse{

    status:boolean,
    message:string,
    data: Categoria,
    code:number
}


export interface CategoriaListaResponse{

    status:boolean,
    message:string,
    data: Categoria[],
    code:number


}