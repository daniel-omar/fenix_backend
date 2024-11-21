import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderDao } from './dao/order.dao';
import { OrderController } from './order.controller';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderDao],
  imports: []
})
export class OrderModule { }
