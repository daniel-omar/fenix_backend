import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

import { CreateUserDto, LoginDto, RegisterUserDto } from './dto/index';

import { LoginResponse } from './interfaces/login-response.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService

  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {

    try {

      const { password, ...userData } = createUserDto;

      //1-Encriptar password
      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      });

      //2-Guardar el usuario
      await newUser.save();


      //3-Generar el JWT
      const { password: _, ...user } = newUser.toJSON();

      return user;

    } catch (error) {
      console.log(error.message)
      if (error.code == 11000) {
        throw new BadRequestException(`${createUserDto.email} already exists!`)
      }
      throw new InternalServerErrorException(`error.message`);
    }

  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {

    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException("not valid credetencial-email");
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException("not valid credetencial-password");
    }

    const { password: _, ...rest } = user.toJSON();

    return {
      user: rest,
      token: this.getJwtToken({ id: user.id })
    };
  }

  getJwtToken(payload: JwtPayload) {

    const token = this.jwtService.sign(payload);
    return token;

  }

  async register(registerUserDto: RegisterUserDto): Promise<LoginResponse> {

    const user = await this.create(registerUserDto);

    console.log(user)
    return {
      user,
      token: this.getJwtToken({ id: user._id })
    };

  }
}
