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
            id_tipo_documento: x?.id_tipo_documento,
            numero_documento: x?.numero_documento,
            correo: x?.correo,
            nombre_cliente: x?.nombre_cliente,
            apellido_paterno: x?.apellido_paterno,
            apellido_materno: x?.apellido_materno,
            numero_telefono: x?.numero_telefono,
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

  async getOrderById(id_orden: number): Promise<any> {

    try {

      const order = await this.orderDao.getOrderById(id_orden);
      if (!order) {
        return null;
      }
      const new_order = {
        id_orden: order?.id_orden,
        numero_orden: order?.numero_orden,
        direccion: order?.direccion,
        fecha_programacion: order?.fecha_programacion,
        id_estado_orden: order?.id_estado_orden,
        id_cliente: order?.id_cliente,
        id_actividad: order?.id_actividad,
        cliente: {
          id_cliente: order?.id_cliente,
          id_tipo_documento: order?.id_tipo_documento,
          numero_documento: order?.numero_documento,
          correo: order?.correo,
          nombre_cliente: order?.nombre_cliente,
          apellido_paterno: order?.apellido_paterno,
          apellido_materno: order?.apellido_materno,
          numero_telefono: order?.numero_telefono,
        },
        estado_orden: {
          id_estado_orden: order?.id_estado_orden,
          nombre_estado_orden: order?.nombre_estado_orden
        },
        actividad: {
          id_actividad: order?.id_actividad,
          nombre_actividad: order?.nombre_actividad,
          categoria_actividad: {
            id_categoria_actividad: order?.id_categoria_actividad,
            nombre_categoria_actividad: order?.nombre_categoria_actividad,
          }
        }
      };
      return new_order;

    } catch (error) {
      console.log(error.message)
      throw new InternalServerErrorException(`${error.message}`);
    }

  }

}
