import { Strategy } from 'passport-facebook';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class FacebookStategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    config: ConfigService,
    private readonly sessionService: SessionService,
  ) {
    super({
      clientID: config.get('FACEBOOK_APP_ID'),
      clientSecret: config.get('FACEBOOK_APP_SECRET'),
      callbackURL: config.get('APP_URL') + '/auth/facebook/callback',
    });
  }

  async validate(accessToken, refreshToken, profile): Promise<any> {
    console.log(profile);
  }
}
