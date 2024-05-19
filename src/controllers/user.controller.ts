import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { CreateUserDto, UpdateUserDto } from 'src/types/dto';
import { IResponse, User } from 'src/types/types';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto): Promise<IResponse<User>> {
    return await this.userService.create(createUserDto);
  }

  @Get(':username')
  async findOne(@Param('username') username: string): Promise<User> {
    return this.userService.findOne(username);
  }

  @Put(':username')
  async update(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(username, updateUserDto);
  }

  @Delete(':username')
  async delete(@Param('username') username: string): Promise<User> {
    return this.userService.deleteUser(username);
  }
}
