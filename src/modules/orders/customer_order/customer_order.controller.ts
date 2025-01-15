import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { CustomerOrderService } from './services/customer_order.service';
import { ResponseDto } from 'src/common/interfaces/response.dto';


@Controller('orders/customer_order')
export class CustomerOrderController {
  constructor(private readonly customerOrderService: CustomerOrderService) { }

  @Get("/getCustomerByIdOrder/:id_orden")
  async getCustomerByIdOrder(@Request() req: Request,
    @Param('id_orden') id_orden: number,
    @Body() body: any
  ): Promise<ResponseDto> {
    // console.log(body)
    let response = await this.customerOrderService.getCustomerByIdOrder(id_orden);
    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: response,
      message: "success"
    };
  }

  @Get("/getCustomerRelationships")
  async getCustomerRelationships(): Promise<ResponseDto> {
    // console.log(body)
    let response = await this.customerOrderService.getCustomerRelationships();
    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: response,
      message: "success"
    };
  }

}
