import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';

@Injectable()
export class TypeEvidenceDao {

  constructor(
    private connection: Connection

  ) { }

  async getAll() {

    const tipos_evidencias = await this.connection.query(`select * from tipos_evidencias;`);

    return tipos_evidencias;
  }

  async getById(idTipoEvidencia: number) {

    const tipos_evidencias = await this.connection.query(`select * from tipos_evidencias where id_tipo_evidencia=$1;`, [idTipoEvidencia]);

    return tipos_evidencias[0];
  }

}
