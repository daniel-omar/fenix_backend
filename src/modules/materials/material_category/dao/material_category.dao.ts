import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';

@Injectable()
export class MaterialCategoryDao {

  constructor(
    private connection: Connection

  ) { }

  async getAll() {

    const material_categorys = await this.connection.query(`select * from categoria_materiales;`);

    return material_categorys;
  }

}
