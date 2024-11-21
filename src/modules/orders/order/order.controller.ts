import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { ResponseDto } from 'src/common/interfaces/response.dto';


@Controller('orders/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get("/getOrdersByTecnico/:id_tecnico")
  async getOrdersByTecnico(@Request() req: Request,
    @Param('id_tecnico') id_tecnico: number,
    @Body() body: any
  ): Promise<ResponseDto> {
    // console.log(body)
    let response = await this.orderService.getOrdersByTecnico(id_tecnico, body);
    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: response,
      message: "success"
    };
  }

}
