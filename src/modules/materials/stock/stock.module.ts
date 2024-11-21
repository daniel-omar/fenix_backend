import { Module } from '@nestjs/common';
import { StockService } from './services/stock.service';
import { StockDao } from './dao/stock.dao';
import { StockController } from './stock.controller';

@Module({
  controllers: [StockController],
  providers: [
    StockService,
    StockDao],
  imports: []
})
export class StockModule { }
