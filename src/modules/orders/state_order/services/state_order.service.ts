import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { StateOrderDao } from '../dao/state_order.dao';

@Injectable()
export class StateOrderService {

  constructor(
    private stateOrderDao: StateOrderDao
  ) { }

  async getList(): Promise<any> {

    try {

      const states_order = await this.stateOrderDao.getList();
      return states_order;

    } catch (error) {
      console.log(error.message)
      throw new InternalServerErrorException(`${error.message}`);
    }

  }


}
