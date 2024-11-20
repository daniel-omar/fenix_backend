import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';

import { LoginDto } from '../dto/login.dto';
import { RegisterUserDto } from '../dto/register-user.dto';

@Injectable()
export class AuthDao {

  constructor(
    private connection: Connection

  ) { }

  async login(loginDto: LoginDto): Promise<any> {

    const { correo, clave } = loginDto;

    const user = await this.connection.query(`select * from usuarios where correo=$1 limit 1;`, [correo]);

    return {
      user: user[0]
    };
  }

}
