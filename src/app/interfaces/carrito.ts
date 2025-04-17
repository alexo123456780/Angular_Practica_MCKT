//nota: el ? en una propiedad de la interfaz singifa que esta es opcional y aun se puede seguir usando mas adelante sin problemas.

import { Producto, ProductoListaResponse } from "./producto.interface"

export interface Carrito{

    id:number,
    cliente_id:number,
    producto_id:number,
    cantidad_productos:number,
    created_at: Date,
    updated_at: Date,


}


export interface CarritoResponse{

    status:boolean,
    message:string,
    data:Carrito;
    code:number

}

export interface ListaCarritoResponse{

    status: boolean,
    message:string,
    data: Producto[],
    code: number
}


export interface CarritoAgregar{
    cliente_id:number,
    producto_id:number,


}

