import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(@Inject('USERS_SERVICE') private usersService: UsersService) {}

  @Get()
  async findAllUsers() {
    return this.usersService.findAll();
  }

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createOne(createUserDto);
  }
}
