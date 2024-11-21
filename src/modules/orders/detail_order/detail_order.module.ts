import { Module } from '@nestjs/common';
import { DetailOrderService } from './services/detail_order.service';
import { DetailOrderDao } from './dao/detail_order.dao';
import { DetailOrderController } from './detail_order.controller';

@Module({
  controllers: [DetailOrderController],
  providers: [
    DetailOrderService,
    DetailOrderDao
  ],
  imports: []
})
export class DetailOrderModule { }
