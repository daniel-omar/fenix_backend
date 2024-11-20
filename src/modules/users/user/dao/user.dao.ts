import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserDao {

  constructor(
    private connection: Connection

  ) { }

  async create({ correo, nombre, apellido_paterno, apellido_materno, clave, id_perfil, id_tipo_documento, numero_documento, numero_telefono }: CreateUserDto): Promise<any> {

    const user = await this.connection.query(`insert into usuario(correo, nombre, apellido_paterno, apellido_materno, clave,id_perfil,id_tipo_documento,numero_documento, numero_telefono)
      values($1,$2,$3,$4,$5,$6,$7,$8,$9)
      returning 
        id_usuario,
        nombre,
        apellido_paterno,
        apellido_materno,
        correo,
        id_tipo_documento,
        numero_documento`, [correo, nombre, apellido_paterno, apellido_materno, clave, id_perfil, id_tipo_documento, numero_documento, numero_telefono]);

    return {
      user: user[0]
    };

  }

  async findById(id_usuario: number) {

    const user = await this.connection.query(`select * from usuarios where id_usuario=$1 limit 1;`, [id_usuario]);

    return {
      user: user[0]
    };
  }

  // async register({ correo, nombre, apellido_paterno, apellido_materno, clave }: RegisterUserDto): Promise<any> {

  //   const user = await this.connection.query(`insert into usuario(correo, nombre, apellido_paterno, apellido_materno, clave)
  //     values($1,$2,$3,$4,$5,$6)
  //     returning 
  //       id_usuario,
  //       correo,
  //       numero_documento`, [correo, nombre, apellido_paterno, apellido_materno, clave]);

  //   return {
  //     user
  //   };

  // }
}
