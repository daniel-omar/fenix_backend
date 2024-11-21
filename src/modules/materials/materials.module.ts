import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MaterialCategoryModule } from './material_category/material_category.module';
import { MaterialModule } from './material/material.module';
import { StockModule } from './stock/stock.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        MaterialCategoryModule,
        MaterialModule,
        StockModule
    ]
})
export class MaterialsModule { }
