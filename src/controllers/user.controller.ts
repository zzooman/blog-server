import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { CreateUserPayload } from 'src/types/types';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  createUser(@Body() body: CreateUserPayload): string {
    const { email, division } = body;
    return 'User created';
  }

  @Get('/login')
  loginUser(@Param() param: any): string {
    const { email } = param;
    return 'User logged in';
  }

  @Delete('/delete')
  deleteUser(@Param() param: any): string {
    const { id } = param;
    return 'User deleted';
  }
}
