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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UUID } from 'crypto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.getUsers();
  }

  @HttpCode(200)
  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: UUID) {
    // console.log(`searching user with id: ${id}...`);
    return this.usersService.getUserById(id);
  }

  @HttpCode(201)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @HttpCode(200)
  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string) {
    return this.usersService.updateUser(Number(id));
  }

  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(Number(id));
  }
}
