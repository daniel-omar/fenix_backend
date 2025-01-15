import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { CustomerOrderDao } from '../dao/customer_order.dao';
import { Objects } from 'src/common/constants/objects';

@Injectable()
export class CustomerOrderService {

  constructor(
    private customerOrderDao: CustomerOrderDao
  ) { }

  async getCustomerByIdOrder(id_orden: number): Promise<any> {

    try {

      const customer_order = await this.customerOrderDao.getCustomerByIdOrder(id_orden);
      const new_customer_order = customer_order.map(x => {
        return {
          id_orden: x?.id_orden,
          customer: {
            id_cliente: x?.id_cliente,
            tipo_documento: {
              id_tipo_documento: x?.id_tipo_documento,
              nombre_tipo_documento: x?.nombre_tipo_documento
            },
            numero_documento: x?.numero_documento,
            nombre: x?.nombre,
            apellido_paterno: x?.apellido_paterno,
            apellido_materno: x?.apellido_materno,
            numero_telefono: x?.numero_telefono,
            correo: x?.correo
          }
        }
      })
      return new_customer_order;

    } catch (error) {
      console.log(error.message)
      throw new InternalServerErrorException(`${error.message}`);
    }

  }

  async getCustomerRelationships(): Promise<any> {

    try {

      var customerRelationships = Object.keys(Objects.ParentescoCliente).map(function (relationshipIndex) {
        let relationship = Objects.ParentescoCliente[relationshipIndex];
        // do something with person
        return relationship;
      });

      return customerRelationships;

    } catch (error) {
      console.log(error.message)
      throw new InternalServerErrorException(`${error.message}`);
    }

  }

}
