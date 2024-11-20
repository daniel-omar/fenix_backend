import { Module } from '@nestjs/common';
import { AuthModule } from './modules/users/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';

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
      logging: true,
      synchronize: false,
    }),

    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    // console.log(process.env)
  }
}
