import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.getUsers();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: string) {
    // console.log(`searching user with id: ${id}...`);
    return this.usersService.getUserById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string) {
    return this.usersService.updateUser(Number(id));
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(Number(id));
  }
}
