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
      to_char(o.fecha_programacion,'dd/MM/yyyy') fecha_programacion,
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
      to_char(o.fecha_programacion,'dd/MM/yyyy') fecha_programacion,
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

  async updateStatus({ idOrden, idEstadoOrden, fechaHoraActualizacion, idUsuarioActualizacion }, connection?: Connection | QueryRunner) {

    if (!connection) connection = this.connection;

    try {
      let query = `
        update ordenes o
        set
          id_estado_orden=$2,
          fecha_hora_actualizacion=$3,
          id_usuario_actualizacion=$4
        where
        o.id_orden=$1
        RETURNING o.id_orden;`;
      const returnQuery = await connection.query(query, [idOrden, idEstadoOrden, fechaHoraActualizacion, idUsuarioActualizacion]);

      return {
        message: 'updateStatus success',
        data: returnQuery?.length ?? 0,
        errors: null,
      };
    } catch (error) {
      return {
        errors: error.message,
      };
    }
  }

  async insertHistorial({ idOrden, idEstadoOrden, fechaHoraActualizacion, idUsuarioActualizacion }, connection?: Connection | QueryRunner) {
    if (!connection) connection = this.connection;

    try {
      let query = `
      insert into historial_ordenes(id_orden,id_estado_orden,id_usuario_registro,fecha_hora_registro)
      values($1,$2,$3,$4)
      RETURNING id_orden;`;
      const returnQuery = await connection.query(query, [idOrden, idEstadoOrden, idUsuarioActualizacion, fechaHoraActualizacion]);

      return {
        message: 'insertHistorial success',
        data: returnQuery?.length ?? 0,
        errors: null,
      };
    } catch (error) {
      return {
        errors: error.message,
      };
    }
  }

  async insertDetails({ idOrden, materiales, fechaHoraActualizacion, idUsuarioActualizacion }, connection?: Connection | QueryRunner) {
    if (!connection) connection = this.connection;

    try {
      let query = `
       select func_guardar_orden_detalles response from func_guardar_orden_detalles($1,$2,$3,$4)
      `;
      const returnQuery = await connection.query(query, [idOrden, materiales, idUsuarioActualizacion, fechaHoraActualizacion]);

      return {
        message: 'insertDetails success',
        data: 1,
        errors: null,
      };
    } catch (error) {
      return {
        errors: error.message,
      };
    }

  }

  async insertCustomerOrder({ idOrden, idCliente, idTipoDocumento, numeroDocumento, nombre, apellidos, numeroTelefono, numeroTelefono2, correo, parentesco, fechaHoraRegistro }, connection?: Connection | QueryRunner) {
    if (!connection) connection = this.connection;

    try {
      let query = `
      insert into ordenes_clientes(
        id_orden,
        id_cliente,
        id_tipo_documento,
        numero_documento,
        nombre,
        apellidos,
        numero_telefono,
        numero_telefono_2,
        correo,
        parentesco,
        fecha_hora_registro
      )
      values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING id_orden;`;
      const returnQuery = await connection.query(query, [idOrden, idCliente, idTipoDocumento, numeroDocumento, nombre, apellidos, numeroTelefono, numeroTelefono2, correo, parentesco, fechaHoraRegistro]);

      return {
        message: 'insertCustomerOrder success',
        data: returnQuery?.length ?? 0,
        errors: null,
      };
    } catch (error) {
      return {
        errors: error.message,
      };
    }
  }

}
