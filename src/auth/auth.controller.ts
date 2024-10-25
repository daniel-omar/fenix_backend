import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto, LoginDto, RegisterUserDto } from './dto/index';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto)
    return this.authService.create(createUserDto);
  }

  @Post("/login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("/register")
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.login(registerUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id); 
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: any) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
