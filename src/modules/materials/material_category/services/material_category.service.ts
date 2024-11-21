import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { MaterialCategoryDao } from '../dao/material_category.dao';

@Injectable()
export class MaterialCategoryService {

  constructor(
    private materialCategoryDao: MaterialCategoryDao
  ) { }

  async getAll(): Promise<any> {

    try {

      const materials_category = await this.materialCategoryDao.getAll();
      return materials_category;

    } catch (error) {
      console.log(error.message)
      throw new InternalServerErrorException(`${error.message}`);
    }

  }


}
