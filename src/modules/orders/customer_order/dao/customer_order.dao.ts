import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';

@Injectable()
export class CustomerOrderDao {

  constructor(
    private connection: Connection

  ) { }

  async getCustomerByIdOrder(id_orden: number) {

    let query = `
    select 
      o.id_orden,
      c.id_cliente,
      c.id_tipo_documento,
      td.nombre_tipo_documento,
      c.numero_documento,
      c.nombre,
      c.apellido_paterno,
      c.apellido_materno,
      c.numero_telefono,
      c.correo
    from ordenes o
    inner join clientes c on c.id_cliente=o.id_cliente
    inner join tipos_documentos td on td.id_tipo_documento=c.id_tipo_documento
    where
    o.id_orden=$1
    ;`;
    const customer_order = await this.connection.query(query, [id_orden]);

    return customer_order;
  }

}
