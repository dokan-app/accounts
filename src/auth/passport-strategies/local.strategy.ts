import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly redis: RedisService,
  ) {
    super({ usernameField: 'identifier' });
  }

  async validate(identifier: string, password: string): Promise<any> {
    console.log({ identifier, password });

    const authPayload = await this.authService.loginUser({
      identifier,
      password,
    });

    const client = this.redis.getClient('dokan-app');

    if (!authPayload) {
      throw new UnauthorizedException();
    }

    client.set(authPayload.sub, authPayload.token);

    return authPayload;
  }
}
