export interface Venta{
    id:number,
    vendedor_id:number,
    cliente_id:number,
    precio_final:DetalleVenta[],
    created_at:Date,
    updated_at:Date,

}

export interface VentaResponse{

    status: boolean,
    message:string,
    data: Venta,
    code: number
}

export interface VentaListaResponse{

    status:boolean,
    message:string,
    data: Venta[],
    code:number

}


export interface DetalleVenta{

    producto_id: number,
    cantidad: number,
    precio_unitario:number

}




