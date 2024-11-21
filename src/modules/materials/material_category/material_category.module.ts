import { Module } from '@nestjs/common';
import { MaterialCategoryService } from './services/material_category.service';
import { MaterialCategoryDao } from './dao/material_category.dao';
import { MaterialCategoryController } from './material_category.controller';

@Module({
  controllers: [MaterialCategoryController],
  providers: [
    MaterialCategoryService,
    MaterialCategoryDao],
  imports: []
})
export class MaterialCategoryModule { }
