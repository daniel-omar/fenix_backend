import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { DetailOrderDao } from '../dao/detail_order.dao';

@Injectable()
export class DetailOrderService {

  constructor(
    private detailOrderDaod: DetailOrderDao
  ) { }

  async getDetailsByIdOrder(id_orden: number): Promise<any> {

    try {

      const details_order = await this.detailOrderDaod.getDetailsByIdOrder(id_orden);
      const new_details_order = details_order.map(x => {
        return {
          id_orden: x?.id_orden,
          item: x?.item,
          id_material_instalado: x?.id_material_instalado,
          material_instalado: {
            id_material: x?.id_material_instalado,
            nombre_material: x?.nombre_material_instalado,
            precio: x?.precio_material_instalado,
            es_seriado: x?.es_seriado_material_instalado
          },
          serie_instalada: x?.serie_instalada
        }
      })
      return new_details_order;

    } catch (error) {
      console.log(error.message)
      throw new InternalServerErrorException(`${error.message}`);
    }

  }



}
