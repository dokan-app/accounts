import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTPayload } from 'src/session/session.types';
import { SessionService } from 'src/session/session.service';
import { AppRequest } from 'src/shared/types';
import { Request } from 'express';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly sessionService: SessionService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('token'),
        ExtractJwt.fromBodyField('token'),
        (req: Request) => req?.cookies?.token,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('APP_SECRET'),
    });
  }

  async validate(payload: JWTPayload): Promise<any> {
    const { sub, domain } = payload;

    const session = await this.sessionService.getSession(sub, domain);

    if (!session) {
      throw new HttpException(
        'Invalid or deleted token. Login to get new token',
        HttpStatus.FORBIDDEN,
      );
    }
    return session;
  }
}
