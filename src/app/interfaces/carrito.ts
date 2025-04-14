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
    data: Carrito | Carrito[],
    code:number

}