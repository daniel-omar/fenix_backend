import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { StockDao } from '../dao/stock.dao';

@Injectable()
export class StockService {

  constructor(
    private stockDao: StockDao
  ) { }

  async getListByAlmacen(codigo_almacen: string): Promise<any> {

    try {

      const stocks = await this.stockDao.getListByAlmacen(codigo_almacen);
      const group_stock = this.groupByCategory(stocks);

      return group_stock;

    } catch (error) {
      console.log(error.message)
      throw new InternalServerErrorException(`${error.message}`);
    }

  }

  async groupByCategory(array_stock?: any) {

    const agrupadosPorCategoria = array_stock.reduce((acc, stock) => {
      const category_material = acc.find(item => item.id_categoria_material === stock.id_categoria_material);

      const material = {
        id_material: stock?.id_material,
        cantidad: stock?.cantidad,
        material: {
          id_material: stock?.id_material,
          codigo_material: stock?.codigo_material,
          nombre_material: stock?.nombre_material,
          precio: stock?.precio,
          es_seriado: stock?.es_seriado
        }
      };

      if (category_material) {
        category_material.materiales.push(material);
      } else {
        acc.push({
          id_categoria_material: stock?.id_categoria_material,
          nombre_categoria_material: stock?.nombre_categoria_material,
          materiales: [material]
        });
      }

      return acc;
    }, []);

    return agrupadosPorCategoria;

  }

}
