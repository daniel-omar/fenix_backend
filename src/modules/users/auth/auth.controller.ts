import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpException, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './services/auth.service';

import { LoginDto, RegisterUserDto } from './dto/index';
import { AuthGuard } from './guards/auth.guard';
import { LoginResponse } from './interfaces/login-response.interface';
import { User } from '../entities/user.entity';
import { Authorization } from "src/decorators/authorization.decorator";
import { ResponseDto } from 'src/common/interfaces/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Authorization(false)
  @Post("/login")
  async login(@Request() req: Request, @Body() loginDto: LoginDto): Promise<ResponseDto> {
    const resp = await this.authService.login(loginDto)
    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: resp,
      message: "success"
    };
  }

  @Post("/register")
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.login(registerUserDto);
  }

  @Get("/checkToken")
  checkToken(@Request() req: Request, @Body() requestTokenDto): ResponseDto {

    const user: User = req["user"];
    const token = req["token"];

    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: {
        user,
        token: token
      },
      message: "success"
    }
  }

}
