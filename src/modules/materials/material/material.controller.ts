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

  @Get("/getListGroup")
  async getListGroup(@Request() req: Request,
    @Body() body): Promise<ResponseDto> {
    let response = await this.materialService.getListGroup(body);
    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: response,
      message: "success"
    };
  }

  @Get("/getById/:idMaterial")
  async getById(@Request() req: Request,
    @Param('idMaterial') idMaterial: number): Promise<ResponseDto> {
    let response = await this.materialService.getById(idMaterial);
    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: response,
      message: "success"
    };
  }
}
