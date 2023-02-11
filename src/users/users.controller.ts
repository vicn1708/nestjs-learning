import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get('findAll')
  async getUsers(@Res() res: Response) {
    return await this.usersService.findAll().then((list) => res.json(list));
  }
}
