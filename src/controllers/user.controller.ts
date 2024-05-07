import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { CreateUserPayload, User } from 'src/types/types';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async createUser(@Body() body: CreateUserPayload): Promise<User> {
    const { userId, password, division } = body;
    return await this.userService.createUser({ userId, password, division });
  }
}
