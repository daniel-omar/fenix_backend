import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './services/user.service';

import { CreateUserDto } from './dto/index';
import { User } from '../entities/user.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { LoginResponse } from '../auth/interfaces/login-response.interface';
import { ResponseDto } from 'src/common/interfaces/response.dto';

@Controller('users/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard)
  @Get("/create")
  async create(@Request() req: Request, @Body() requestTokenDto: CreateUserDto): Promise<ResponseDto> {

    let response = await this.userService.create(requestTokenDto);
    return {
      status: Number(process.env.STATUS_SERVICES_OK),
      data: response,
      message: "success"
    };
  }

}
