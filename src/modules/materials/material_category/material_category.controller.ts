import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { MaterialCategoryService } from './services/material_category.service';


@Controller('materials/material_category')
export class MaterialCategoryController {
  constructor(private readonly materialCategoryService: MaterialCategoryService) { }

  @Get("/getAll")
  async get(@Request() req: Request): Promise<any> {
    let response = await this.materialCategoryService.getAll();

    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: response,
      message: "success"
    };

  }

}
