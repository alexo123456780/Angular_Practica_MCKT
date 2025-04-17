import { Categoria } from "./categoria.interface"
import { Carrito } from "./carrito"

export interface Producto{
    id:number,
    nombre_producto:string,
    precio_producto:number,
    descripcion:string,
    usuario_id:number,
    imagen_producto:string,
    categoria_id?:number,
    cantidad_productos:number,
    categoria?:Categoria,
    created_at: Date,
    updated_at: Date,
    pivot: Carrito

}

export interface ProductoResponse{

    status:boolean,
    message:string,
    data: Producto,
    code:number

}

export interface ProductoListaResponse{

    status:boolean,
    message:string,
    data:Producto[],
    code:number

}