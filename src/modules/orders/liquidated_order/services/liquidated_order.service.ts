import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { LiquidatedOrderDao } from '../dao/liquidated_order.dao';
import { OrderLiquidatedDto } from 'src/common/dtos/order-liquidated.dto';
import { Connection } from 'typeorm';
import { OrderDao } from '../../order/dao/order.dao';
import { Objects } from 'src/common/constants/objects';
import { DateTime } from 'luxon';

@Injectable()
export class LiquidatedOrderService {

  constructor(
    private liquidatedOrderDao: LiquidatedOrderDao,
    private orderDao: OrderDao,
    private connection: Connection
  ) { }

  async liquidateOrder(orderLiquidatedDto: OrderLiquidatedDto): Promise<any> {

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      console.log(orderLiquidatedDto)

      const status_updateOrder = [];
      const status_insertHistorialOrder = [];
      const status_insertDetailsOrder = [];
      const status_insertLiquidationOrder = [];
      const status_insertCustomerOrder = [];

      const responseUpdateOrder = await this.orderDao.updateStatus(
        {
          idOrden: orderLiquidatedDto.orden.id_orden,
          idEstadoOrden: Objects.EstadosOrden.LIQUIDADO,
          fechaHoraActualizacion: DateTime.now().toISO(),
          idUsuarioActualizacion: orderLiquidatedDto.id_usuario
        },
        queryRunner
      );
      status_updateOrder.push(responseUpdateOrder)

      const responseInsertHistorial = await this.orderDao.insertHistorial(
        {
          idOrden: orderLiquidatedDto.orden.id_orden,
          idEstadoOrden: Objects.EstadosOrden.LIQUIDADO,
          fechaHoraActualizacion: DateTime.now().toISO(),
          idUsuarioActualizacion: orderLiquidatedDto.id_usuario
        },
        queryRunner
      );
      status_insertHistorialOrder.push(responseInsertHistorial)

      const responseInsertDetails = await this.orderDao.insertDetails(
        {
          idOrden: orderLiquidatedDto.orden.id_orden,
          materiales: JSON.stringify(orderLiquidatedDto.materiales_orden),
          fechaHoraActualizacion: DateTime.now().toISO(),
          idUsuarioActualizacion: orderLiquidatedDto.id_usuario
        },
        queryRunner
      );
      status_insertDetailsOrder.push(responseInsertDetails)

      const responseInsertLiquidation = await this.liquidatedOrderDao.insertLiquidation(
        {
          idOrden: orderLiquidatedDto.orden.id_orden,
          observacionTecnico: orderLiquidatedDto.observacion_tecnico,
          fechaHoraActualizacion: DateTime.now().toISO()
        },
        queryRunner
      );
      status_insertLiquidationOrder.push(responseInsertLiquidation)

      const { cliente_orden: customer } = orderLiquidatedDto;
      const responseInsertCustomerOrder = await this.orderDao.insertCustomerOrder(
        {
          idOrden: orderLiquidatedDto.orden.id_orden,
          idCliente: orderLiquidatedDto.orden.id_cliente, idTipoDocumento: customer.id_tipo_documento, numeroDocumento: customer.numero_documento,
          nombre: customer.nombre, apellidos: customer.apellidos, numeroTelefono: customer.numeroTelefono, numeroTelefono2: customer.numeroTelefono2, correo: customer.correo, parentesco: customer.parenteso,
          fechaHoraRegistro: DateTime.now().toISO()
        },
        queryRunner
      );
      status_insertCustomerOrder.push(responseInsertCustomerOrder)

      const arrayStatus = [
        ...status_updateOrder,
        ...status_insertHistorialOrder,
        ...status_insertDetailsOrder,
        ...status_insertLiquidationOrder,
        ...status_insertCustomerOrder
      ];

      console.log(arrayStatus)

      if (arrayStatus.some(e => e.errors)) {
        // console.log('arrayStatus filter', arrayStatus.filter(e => e.errors));
        throw new Error(arrayStatus.find(e => e.errors && !(e.errors.includes('current transaction is aborted')))?.errors);
      }

      //throw Error("GG")
      await queryRunner.commitTransaction();
      return true;

    } catch (error) {
      console.log(error.message)
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(`${error.message}`);
    }
    finally {
      await queryRunner.release();
    }
  }



}
