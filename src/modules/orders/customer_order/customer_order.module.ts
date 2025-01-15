import { Module } from '@nestjs/common';
import { CustomerOrderService } from './services/customer_order.service';
import { CustomerOrderDao } from './dao/customer_order.dao';
import { CustomerOrderController } from './customer_order.controller';

@Module({
  controllers: [CustomerOrderController],
  providers: [
    CustomerOrderService,
    CustomerOrderDao
  ],
  imports: []
})
export class CustomerOrderModule { }
