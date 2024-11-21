import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Objects } from 'src/common/constants/objects';
import { Connection, QueryRunner } from 'typeorm';

@Injectable()
export class StateOrderDao {

  constructor(
    private connection: Connection

  ) { }

  async getList() {

    const states_order = await this.connection.query(`
      select * from estados_orden
      where
      es_activo=$1;`, [Objects.EstatusEstadosOrden.ACTIVO]);

    return states_order;
  }

}
