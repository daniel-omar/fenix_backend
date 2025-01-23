export interface OrderLiquidatedDto {
    orden: Orden;
    cliente_orden: CustomerOrder;
    materiales_orden: MaterialOrder[];
    observacion_tecnico: string;
    id_usuario: number;
}

export interface CustomerOrder {
    id_orden: number;
    id_tipo_documento: number;
    numero_documento: string;
    nombre: string;
    apellidos: string;
    numeroTelefono: string;
    numeroTelefono2: string;
    correo: string;
    parenteso: string;
}

export interface MaterialOrder {
    id_material: number;
    serie: null | string;
    cantidad: number;
}

export interface Orden {
    id_orden: number;
    numero_orden: string;
    direccion: string;
    fecha_programacion: string;
    id_estado_orden: number;
    id_cliente: number;
    id_actividad: number;
}

