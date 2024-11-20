import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthDao } from './dao/auth.dao';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthJwtService } from './services/auth_jwt.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthDao,

    AuthJwtService
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