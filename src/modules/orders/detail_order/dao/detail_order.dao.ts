import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';

@Injectable()
export class DetailOrderDao {

  constructor(
    private connection: Connection

  ) { }

  async getDetailsByIdOrder(id_orden: number) {

    let query = `
    select 
      od.id_orden,
      od.item,
      od.id_material_instalado,
      mi.nombre_material nombre_material_instalado,
      mi.precio precio_material_instalado,
      mi.es_seriado es_seriado_material_instalado,
      od.serie_instalada
    from ordenes_detalles od
    inner join materiales mi on mi.id_material=od.id_material_instalado
    where
    od.id_orden=$1
    ;`;
    const details_order = await this.connection.query(query, [id_orden]);

    return details_order;
  }

}
