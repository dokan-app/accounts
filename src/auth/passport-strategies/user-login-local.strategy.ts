import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class UserLoginStrategy extends PassportStrategy(
  Strategy,
  'user-login',
) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'identifier' });
  }

  async validate(identifier: string, password: string): Promise<any> {
    try {
      const authPayload = await this.authService.loginUser({
        identifier,
        password,
      });
      return authPayload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
