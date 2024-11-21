import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { StockService } from './services/stock.service';


@Controller('materials/stock')
export class StockController {
  constructor(private readonly stockService: StockService) { }

  @Get("/getListByAlmacen/:codigo_almacen")
  async get(@Request() req: Request, @Param('codigo_almacen') codigo_almacen: string): Promise<any> {
    let response = await this.stockService.getListByAlmacen(codigo_almacen);
    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: response,
      message: "success"
    };
  }

}
