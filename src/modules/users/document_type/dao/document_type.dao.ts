import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Objects } from 'src/common/constants/objects';
import { Connection, QueryRunner } from 'typeorm';

@Injectable()
export class DocumentTypeDao {

  constructor(
    private connection: Connection

  ) { }

  async getList() {

    const documents_types = await this.connection.query(`
      select * from tipos_documentos
      where
      es_activo=$1;`, [Objects.EstatusEstadosOrden.ACTIVO]);

    return documents_types;
  }

}
