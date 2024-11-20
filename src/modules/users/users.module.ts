import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        AuthModule,
        UsersModule
    ]
})
export class UsersModule { }
