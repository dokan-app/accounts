import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AdminLoginStrategy extends PassportStrategy(
  Strategy,
  'admin-login',
) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'identifier' });
  }

  async validate(identifier: string, password: string): Promise<any> {
    const authPayload = await this.authService.loginAdmin({
      identifier,
      password,
    });

    return authPayload;
  }
}
