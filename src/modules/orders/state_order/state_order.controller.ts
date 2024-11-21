import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { StateOrderService } from './services/state_order.service';


@Controller('orders/state_order')
export class StateOrderController {
  constructor(private readonly stateOrderService: StateOrderService) { }

  @Get("/getList")
  async getList(@Request() req: Request): Promise<any> {
    let response = await this.stateOrderService.getList();

    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: response,
      message: "success"
    };

  }

}
