import { Module } from '@nestjs/common';
import { LiquidatedOrderService } from './services/liquidated_order.service';
import { LiquidatedOrderDao } from './dao/liquidated_order.dao';
import { LiquidatedOrderController } from './liquidated_order.controller';

@Module({
  controllers: [LiquidatedOrderController],
  providers: [
    LiquidatedOrderService,
    LiquidatedOrderDao
  ],
  imports: []
})
export class LiquidatedOrderModule { }
