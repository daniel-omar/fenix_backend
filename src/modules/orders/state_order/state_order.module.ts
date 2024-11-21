import { Module } from '@nestjs/common';
import { StateOrderService } from './services/state_order.service';
import { StateOrderDao } from './dao/state_order.dao';
import { StateOrderController } from './state_order.controller';

@Module({
  controllers: [StateOrderController],
  providers: [
    StateOrderService,
    StateOrderDao],
  imports: []
})
export class StateOrderModule { }
