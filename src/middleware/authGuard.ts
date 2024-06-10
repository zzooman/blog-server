import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/services/auth.service';
import { ACCESS_TOKEN, jwtConstants } from 'src/types/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies[ACCESS_TOKEN];
    if (!token) {
      throw new UnauthorizedException('토큰이 없습니다.');
    }
    if (AuthService.isTokenBlacklisted(token)) {
      throw new UnauthorizedException('토큰이 블랙리스트에 있습니다.');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
      return true;
    } catch {
      throw new UnauthorizedException('토큰 검증에 실패했습니다.');
    }
  }
}
