import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { TypeEvidenceDao } from '../dao/type_evidence.dao';

@Injectable()
export class TypeEvidenceService {

  constructor(
    private typeEvidenceDao: TypeEvidenceDao
  ) { }

  async getAll(): Promise<any> {

    try {

      const tipos_evidencias = await this.typeEvidenceDao.getAll();
      return tipos_evidencias;

    } catch (error) {
      console.log(error.message)
      throw new InternalServerErrorException(`${error.message}`);
    }

  }

  async getById(idTipoEvidencia: number): Promise<any> {

    try {

      const tipo_evidencia = await this.typeEvidenceDao.getById(idTipoEvidencia);
      return tipo_evidencia;

    } catch (error) {
      console.log(error.message)
      throw new InternalServerErrorException(`${error.message}`);
    }

  }

}
