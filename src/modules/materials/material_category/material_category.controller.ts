import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { MaterialCategoryService } from './services/material_category.service';
import { ResponseDto } from 'src/common/interfaces/response.dto';


@Controller('materials/material_category')
export class MaterialCategoryController {
  constructor(private readonly materialCategoryService: MaterialCategoryService) { }

  @Get("/getList")
  async getList(@Request() req: Request, @Body() body): Promise<ResponseDto> {
    let response = await this.materialCategoryService.getList(body);

    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: response,
      message: "success"
    };

  }

  @Get("/getAll")
  async get(@Request() req: Request): Promise<ResponseDto> {
    let response = await this.materialCategoryService.getAll();

    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: response,
      message: "success"
    };

  }

  @Get("/getById/:idCategoriaMaterial")
  async getById(@Request() req: Request, @Param('idCategoriaMaterial') idCategoriaMaterial: number,): Promise<ResponseDto> {
    let response = await this.materialCategoryService.getById(idCategoriaMaterial);

    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: response,
      message: "success"
    };

  }

}
