import { Module } from '@nestjs/common';
import { MaterialService } from './services/material.service';
import { MaterialDao } from './dao/material.dao';
import { MaterialController } from './material.controller';

@Module({
  controllers: [MaterialController],
  providers: [
    MaterialService,
    MaterialDao],
  imports: []
})
export class MaterialModule { }
