import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';

@Injectable()
export class MaterialDao {

  constructor(
    private connection: Connection

  ) { }

  async getAll() {

    const materials = await this.connection.query(`select * from materiales;`);

    return materials;
  }

  async getList(body: any) {


    let where = '';
    for (const columna in body) {
      let value = null;
      if (columna.includes(`ids_categoria_material`)) {
        value = body[columna];
        if (value.length == 0) continue;
        where += ` and m.id_categoria_material=any(array[${value}]::integer[])`;
      } else {
        value = body[columna];
        where += ` and m.${columna}=${value}`;
      }
    }

    let query = `
    select
      m.id_material,
      m.codigo_material,
      m.nombre_material,
      m.precio,
      m.es_seriado,
      cm.id_categoria_material,
      cm.nombre_categoria nombre_categoria_material
    from materiales m 
    inner join categoria_materiales cm on cm.id_categoria_material=m.id_categoria_material
    where
    1=1
    ${where}
    ;`;
    const orders = await this.connection.query(query, []);

    return orders;
  }

  async getById(idMaterial: number) {

    let query = `
    select
      m.id_material,
      m.codigo_material,
      m.nombre_material,
      m.precio,
      m.es_seriado
    from materiales m 
    where
    1=1
    and id_material=$1
    ;`;
    const materials = await this.connection.query(query, [idMaterial]);

    return materials[0];
  }
}
