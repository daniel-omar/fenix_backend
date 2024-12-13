import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';

@Injectable()
export class OrderDao {

  constructor(
    private connection: Connection

  ) { }

  async getOrdersByTecnico(id_tecnico: number, body: any) {

    let where = '';
    for (const columna in body) {
      let value = null;
      if (columna.includes(`id_estado_orden`)) {
        value = body[columna];
        where += ` and o.id_estado_orden=(${value})`;
      }
    }

    let query = `
    select 
      o.id_orden,
      o.numero_orden,
      o.direccion,
      o.fecha_programacion,
      c.id_cliente,
      c.nombre nombre_cliente,
      c.id_tipo_documento id_tipo_documento,
      c.numero_documento numero_documento,
      c.apellido_paterno,
      c.apellido_materno,
      c.numero_telefono numero_telefono,
      c.correo correo,
      eo.id_estado_orden,
      eo.nombre_estado nombre_estado_orden,
      a.id_actividad,
      a.nombre_actividad ,
      ca.id_categoria_actividad,
      ca.nombre_categoria nombre_categoria_actividad
    from ordenes o
    left join clientes c on c.id_cliente=o.id_cliente
    left join estados_orden eo on eo.id_estado_orden=o.id_estado_orden
    left join actividades a on a.id_actividad=o.id_actividad
    left join categoria_actividades ca on ca.id_categoria_actividad=a.id_categoria_actividad
    where
    o.id_tecnico=$1
    ${where}
    ;`;
    const orders = await this.connection.query(query, [id_tecnico]);

    return orders;
  }

  async getOrderById(id_orden: number) {

    let where = '';
    let query = `
    select 
      o.id_orden,
      o.numero_orden,
      o.direccion,
      o.fecha_programacion,
       c.id_cliente,
      c.nombre nombre_cliente,
      c.id_tipo_documento id_tipo_documento,
      c.numero_documento numero_documento,
      c.apellido_paterno,
      c.apellido_materno,
      c.numero_telefono numero_telefono,
      c.correo correo,
      eo.id_estado_orden,
      eo.nombre_estado nombre_estado_orden,
      a.id_actividad,
      a.nombre_actividad ,
      ca.id_categoria_actividad,
      ca.nombre_categoria nombre_categoria_actividad
    from ordenes o
    left join clientes c on c.id_cliente=o.id_cliente
    left join estados_orden eo on eo.id_estado_orden=o.id_estado_orden
    left join actividades a on a.id_actividad=o.id_actividad
    left join categoria_actividades ca on ca.id_categoria_actividad=a.id_categoria_actividad
    where
    o.id_orden=$1
    ${where}
    ;`;
    const order = await this.connection.query(query, [id_orden]);

    return order[0];
  }
}
