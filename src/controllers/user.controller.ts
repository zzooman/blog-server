import { Body, Controller, Get, Post, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { Article } from '@prisma/client';
import { AuthGuard } from 'src/middleware/authGuard';
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
  async findOne(@Param('username') username: string): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findOne(username);
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      division: user.division,
    };
  }

  @UseGuards(AuthGuard)
  @Get('/mydata')
  async mydata(): Promise<{ user: User; articles: Article[] }> {
    return await this.userService.mydata();
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
