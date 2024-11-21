import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';

@Injectable()
export class StockDao {

  constructor(
    private connection: Connection

  ) { }

  async getListByAlmacen(codigo_almacen: string) {

    let query = `select 
      s.id_material,
      s.cantidad,
      m.codigo_material,
      m.nombre_material,
      m.precio,
      cm.id_categoria_material,
	    cm.nombre_categoria nombre_categoria_material,
      m.es_seriado
    from stocks s
    inner join materiales m on m.id_material=s.id_material
    left join categoria_materiales cm on cm.id_categoria_material=m.id_categoria_material
    inner join almacenes a on a.id_almacen=s.id_almacen
    where
    a.codigo_almacen=$1`;
    const stock_materials = await this.connection.query(query, [codigo_almacen]);

    return stock_materials;
  }

}
