import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/services/user.service';
import { UserDao } from './user/dao/user.dao';
import { UserModule } from './user/user.module';
import { DocumentTypeModule } from './document_type/document_type.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        AuthModule,
        UserModule,
        DocumentTypeModule
    ],
    exports: [

    ]
})
export class UsersModule { }
