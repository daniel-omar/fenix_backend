import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { LiquidatedOrderService } from './services/liquidated_order.service';
import { ResponseDto } from 'src/common/interfaces/response.dto';


@Controller('orders/liquidated_order')
export class LiquidatedOrderController {
  constructor(private readonly liquidatedOrderService: LiquidatedOrderService) { }

  @Get("/getDetailsByIdOrder/:id_orden")
  async getDetailsByIdOrder(@Request() req: Request,
    @Param('id_orden') id_orden: number,
    @Body() body: any
  ): Promise<ResponseDto> {
    // console.log(body)
    let response = await this.liquidatedOrderService.getDetailsByIdOrder(id_orden);
    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: response,
      message: "success"
    };
  }

}
