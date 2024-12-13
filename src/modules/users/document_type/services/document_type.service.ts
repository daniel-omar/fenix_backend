import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { DocumentTypeDao } from '../dao/document_type.dao';

@Injectable()
export class DocumentTypeService {

  constructor(
    private documentTypeDao: DocumentTypeDao
  ) { }

  async getList(): Promise<any> {

    try {

      const documents_types = await this.documentTypeDao.getList();
      return documents_types;

    } catch (error) {
      console.log(error.message)
      throw new InternalServerErrorException(`${error.message}`);
    }

  }


}
