import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';

@Injectable()
export class LiquidatedOrderDao {

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

  async insertLiquidation({ idOrden, observacionTecnico, fechaHoraActualizacion }, connection?: Connection | QueryRunner) {
    if (!connection) connection = this.connection;

    try {
      let query = `
      insert into ordenes_liquidadas(id_orden,observacion_tecnico,fecha_hora_liquidacion)
      values($1,$2,$3)
      RETURNING id_orden;`;
      const returnQuery = await connection.query(query, [idOrden, observacionTecnico, fechaHoraActualizacion]);

      return {
        message: 'insertLiquidation success',
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
