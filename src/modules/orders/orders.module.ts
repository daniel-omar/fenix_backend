import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { DetailOrderModule } from './detail_order/detail_order.module';
import { LiquidatedOrderModule } from './liquidated_order/liquidated_order.module';
import { StateOrderModule } from './state_order/state_order.module';
import { CustomerOrderModule } from './customer_order/customer_order.module';
import { TypeEvidenceModule } from './type_evidence/type_evidence.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        OrderModule,
        CustomerOrderModule,
        DetailOrderModule,
        LiquidatedOrderModule,
        StateOrderModule,
        TypeEvidenceModule
    ]
})
export class OrdersModule { }
