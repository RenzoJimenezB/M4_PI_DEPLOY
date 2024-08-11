import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.interface';
import { CreateUserDto } from './createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.usersService.getUsers();
  }

  @HttpCode(200)
  @Get(':id')
  findById(@Param('id') id: string) {
    // console.log(`searching user with id: ${id}...`);
    return this.usersService.getUserById(Number(id));
  }

  @HttpCode(201)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @HttpCode(200)
  @Put(':id')
  updateUser(@Param('id') id: string) {
    return this.usersService.updateUser(Number(id));
  }

  @HttpCode(200)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(Number(id));
  }
}
