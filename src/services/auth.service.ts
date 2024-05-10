import { Injectable, UnauthorizedException, Res } from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { ACCESS_TOKEN } from 'src/types/constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
    @Res() response: Response,
  ): Promise<Response> {
    const user = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, username: user.username };
    const access_token = await this.jwtService.signAsync(payload);
    response.cookie(ACCESS_TOKEN, access_token, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    return response.send({ message: 'success' });
  }
}
