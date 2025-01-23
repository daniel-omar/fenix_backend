import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { LiquidatedOrderService } from './services/liquidated_order.service';
import { ResponseDto } from 'src/common/interfaces/response.dto';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { User } from 'src/modules/users/entities/user.entity';


@Controller('orders/liquidated_order')
export class LiquidatedOrderController {
  constructor(private readonly liquidatedOrderService: LiquidatedOrderService) { }

  @UseInterceptors(
    //FileInterceptor('evidencias')
    //AnyFilesInterceptor()
    FilesInterceptor('evidencias')
  )
  @Post("/liquidateOrder")
  async liquidateOrder(
    @Request() req: Request,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: any
  ): Promise<ResponseDto> {
    const user: User = req["user"];
    body = JSON.parse(body.data);
    body = {
      ...body,
      id_usuario: user.id_usuario
    }
    let response = await this.liquidatedOrderService.liquidateOrder(body);
    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: response,
      message: "success"
    };
  }

}
