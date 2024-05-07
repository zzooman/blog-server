import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { CreateUserDto, User } from 'src/types/types';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get(':username')
  async findOne(@Param('username') username: string): Promise<User> {
    return this.userService.findOne(username);
  }

  @Put(':username')
  async update(
    @Param('username') username: string,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.update(username, updateUserDto);
  }

  @Delete(':username')
  async delete(@Param('username') username: string): Promise<User> {
    return this.userService.deleteUser(username);
  }
}
