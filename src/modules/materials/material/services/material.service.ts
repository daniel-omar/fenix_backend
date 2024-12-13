import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { MaterialDao } from '../dao/material.dao';

@Injectable()
export class MaterialService {

  constructor(
    private materialDao: MaterialDao
  ) { }

  async getAll(): Promise<any> {

    try {

      const materials = await this.materialDao.getAll();
      const new_materials = this.groupByCategory(materials);
      return new_materials;

    } catch (error) {
      console.log(error.message)
      throw new InternalServerErrorException(`${error.message}`);
    }

  }

  async getList(body): Promise<any> {

    try {

      const materials = await this.materialDao.getList(body);
      //const new_materials = this.groupByCategory(materials);
      return materials;

    } catch (error) {
      console.log(error.message)
      throw new InternalServerErrorException(`${error.message}`);
    }

  }

  async getListGroup(body): Promise<any> {

    try {

      const materials = await this.materialDao.getList(body);
      const new_materials = this.groupByCategory(materials);
      return new_materials;

    } catch (error) {
      console.log(error.message)
      throw new InternalServerErrorException(`${error.message}`);
    }

  }

  async groupByCategory(array_material?: any) {

    const agrupadosPorCategoria = array_material.reduce((acc, item_material) => {
      const category_material = acc.find(item => item.id_categoria_material === item_material.id_categoria_material);

      const material = {
        id_material: item_material?.id_material,
        codigo_material: item_material?.codigo_material,
        nombre_material: item_material?.nombre_material,
        precio: item_material?.precio,
        es_seriado: item_material?.es_seriado,
        id_categoria_material: item_material?.id_categoria_material,
      };

      if (category_material) {
        category_material.materiales.push(material);
      } else {
        acc.push({
          id_categoria_material: item_material?.id_categoria_material,
          nombre_categoria_material: item_material?.nombre_categoria_material,
          materiales: [material]
        });
      }

      return acc;
    }, []);

    return agrupadosPorCategoria;

  }

  async getById(idMaterial: number): Promise<any> {
    try {

      const material = await this.materialDao.getById(idMaterial);
      //const new_materials = this.groupByCategory(materials);
      return material;

    } catch (error) {
      console.log(error.message)
      throw new InternalServerErrorException(`${error.message}`);
    }

  }
}
