import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthDao } from './dao/auth.dao';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthJwtService } from './services/auth_jwt.service';
import { UserService } from '../user/services/user.service';
import { UserDao } from '../user/dao/user.dao';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthDao,

    UserService,
    UserDao,

    AuthJwtService,

  ],
  imports: [
    ConfigModule.forRoot(),


    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '6h' }
    })
  ]
})
export class AuthModule { }
