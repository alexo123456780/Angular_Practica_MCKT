export interface Producto {
    id: number;
    nombre_producto: string;
    precio_producto: number;
    descripcion: string;
    imagen_producto: string;
    usuario_id: number;
    categoria_id?: number;
    categoria?: {
        id: number;
        nombre_categoria: string;
    };
}


export interface ProductosResponse {

    status:boolean;
    message:string;
    code:number;
    data: Producto[];
}

