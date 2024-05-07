import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { LoginUserDto } from 'src/types/types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginUserDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
