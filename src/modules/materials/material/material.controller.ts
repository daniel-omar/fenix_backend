import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { MaterialService } from './services/material.service';
import { ResponseDto } from 'src/common/interfaces/response.dto';


@Controller('materials/material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) { }

  @Get("/getAll")
  async getAll(@Request() req: Request): Promise<ResponseDto> {
    let response = await this.materialService.getAll();
    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: response,
      message: "success"
    };
  }

  @Get("/getList")
  async getList(@Request() req: Request,
    @Body() body): Promise<ResponseDto> {
    let response = await this.materialService.getList(body);
    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: response,
      message: "success"
    };
  }


}
