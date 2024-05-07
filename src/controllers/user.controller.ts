import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { CreateUserPayload, LoginUserParams, User } from 'src/types/types';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async createUser(@Body() body: CreateUserPayload): Promise<User> {
    const { userId, password, division } = body;
    return await this.userService.createUser({ userId, password, division });
  }

  @Get('/login')
  async login(@Param() param: LoginUserParams): Promise<User> {
    const { userId, password } = param;
    return await this.userService.login({ userId, password });
  }
}
