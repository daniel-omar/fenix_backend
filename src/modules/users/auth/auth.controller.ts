import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './services/auth.service';

import { LoginDto, RegisterUserDto } from './dto/index';
import { AuthGuard } from './guards/auth.guard';
import { LoginResponse } from './interfaces/login-response.interface';
import { User } from '../entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post("/login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("/register")
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.login(registerUserDto);
  }

  @UseGuards(AuthGuard)
  @Get("/checkToken")
  checkToken(@Request() req: Request, @Body() requestTokenDto): LoginResponse {
    console.log(req)
    const user: User = req["user"];
    const token = req["token"];

    return {
      user,
      token: token
    }
  }

}
