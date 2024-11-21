import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/users/auth/guards/auth.guard';
import { UserService } from './modules/users/user/services/user.service';
import { UserDao } from './modules/users/user/dao/user.dao';
import { AuthJwtService } from './modules/users/auth/services/auth_jwt.service';
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';
import { HttpModule } from '@nestjs/axios';
import { MaterialsModule } from './modules/materials/materials.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT) || 5432,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      // logging: true,
      synchronize: false,
    }),

    HttpModule,
    UsersModule,
    MaterialsModule,
    OrdersModule

  ],
  controllers: [],
  providers: [
    UserService,
    UserDao,
    AuthJwtService,

    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {
  constructor() {
    // console.log(process.env)
  }
}
