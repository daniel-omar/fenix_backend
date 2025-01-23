import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';

@Injectable()
export class MaterialCategoryDao {

  constructor(
    private connection: Connection

  ) { }

  async getList(body: any) {

    let where = '';
    for (const columna in body) {
      let value = null;
      if (columna.includes(`ids_categoria_material`)) {
        value = body[columna];
        if (value.length == 0) continue;
        where += ` and cm.id_categoria_material=any(array[${value}]::integer[])`;
      } else {
        value = body[columna];
        where += ` and cm.${columna}=${value}`;
      }
    }

    const material_categorys = await this.connection.query(`select * from categoria_materiales cm
      where
      1=1
      ${where}
      ;`);

    return material_categorys;
  }

  async getAll() {

    const material_categorys = await this.connection.query(`select * from categoria_materiales;`);

    return material_categorys;
  }

  async getById(id_categoria_material: number) {

    const material_categorys = await this.connection.query(`select * from categoria_materiales where id_categoria_material=$1;`, [id_categoria_material]);

    return material_categorys[0];
  }

}
