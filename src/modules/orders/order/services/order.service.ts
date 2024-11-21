import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { OrderDao } from '../dao/order.dao';

@Injectable()
export class OrderService {

  constructor(
    private orderDao: OrderDao
  ) { }

  async getOrdersByTecnico(id_tecnico: number, body: any): Promise<any> {

    try {

      const orders = await this.orderDao.getOrdersByTecnico(id_tecnico, body);
      const new_orders = orders.map(x => {
        return {
          id_orden: x?.id_orden,
          numero_orden: x?.numero_orden,
          direccion: x?.direccion,
          fecha_programacion: x?.fecha_programacion,
          id_estado_orden: x?.id_estado_orden,
          id_cliente: x?.id_cliente,
          id_actividad: x?.id_actividad,
          cliente: {
            id_cliente: x?.id_cliente,
            nombre_cliente: x?.nombre_cliente,
            apellido_paterno: x?.apellido_paterno,
            apellido_materno: x?.apellido_materno
          },
          estado_orden: {
            id_estado_orden: x?.id_estado_orden,
            nombre_estado_orden: x?.nombre_estado_orden
          },
          actividad: {
            id_actividad: x?.id_actividad,
            nombre_actividad: x?.nombre_actividad,
            categoria_actividad: {
              id_categoria_actividad: x?.id_categoria_actividad,
              nombre_categoria_actividad: x?.nombre_categoria_actividad,
            }
          }
        }
      })
      return new_orders;

    } catch (error) {
      console.log(error.message)
      throw new InternalServerErrorException(`${error.message}`);
    }

  }



}
