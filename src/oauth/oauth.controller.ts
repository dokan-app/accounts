import {
  Controller,
  Get,
  Query,
  Req,
  Res,
  Post,
  Body,
  BadRequestException,
  BadGatewayException,
  UnauthorizedException,
} from '@nestjs/common';

import { AppRequest } from 'src/shared/types';
import { Response, Request } from 'express';
import { AppsService } from 'src/apps/apps.service';
import { OAuthQueryparams, OAuthResourceRequestBody } from './oauth.dto';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'nestjs-redis';
import { UnAuthorizedExceptionFilter } from 'src/shared/filters/UnAuthorizedExceptionFilter';
import { UsersService } from 'src/users/users.service';

@Controller('api/oauth')
export class OauthController {
  constructor(
    private readonly appService: AppsService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly userService: UsersService,
  ) {}

  @Get('authorize')
  async oauth(
    @Query() query: OAuthQueryparams,
    @Req() req: AppRequest,
    @Res() res: Response,
  ) {
    const app = await this.appService.getByClientIdAndRedirectUrl(query);

    //1.  User is not logged in
    if (!req.isAuthenticated()) {
      const oAuthRedirectQueries = `clientId=${query.clientId}&redirectUrl=${query.redirectUrl}`;
      req.session.oAuthRedirectQueries = oAuthRedirectQueries;
      res.redirect(`/auth/user/login?${oAuthRedirectQueries}`);
    }

    //2. user is logged in

    //2.1 Create a oAuth token
    const code = await this.appService.storeApplicationInCache(
      app.clientId,
      app.name,
      req.user._id,
    );

    // 3. Redirect to client app with oAuth App
    res.redirect(`${query.redirectUrl}?oauth_code=${code}`);
  }

  @Post('access_token')
  async accessInfo(
    @Body() data: OAuthResourceRequestBody,
    @Req() req: AppRequest,
  ) {
    const { clientId, oauth_code } = data;
    const token = req.headers.authorization.replace('Bearer ', '');

    try {
      const decoded = await this.jwtService.verifyAsync(token);

      if (clientId !== decoded.clientid)
        throw new BadGatewayException(
          `Invalid client secret for client id ${clientId}`,
        );

      // everything verified then...
      const redis = this.redisService.getClient('dokan-accounts');

      const oAuthAppCache = await redis.hget('oAuthCodes', oauth_code);
      if (!oAuthAppCache) throw new BadGatewayException(`Invalid oauth_code`);

      const userId = oAuthAppCache.split('|')[0];
      const appName = oAuthAppCache.split('|')[1];

      const userLoggedInAppCache = await redis.smembers(`user-id-${userId}`);

      if (!userLoggedInAppCache.includes(appName))
        throw new BadGatewayException(`UnAuthorize`);
      const payload = await this.userService.getById(userId, '-__v -password');

      // Remove oauth_code from oAuthAppCache
      await redis.hdel('oAuthCodes', oauth_code);

      return {
        provider: 'accounts.dokan.app',
        version: 'v0.0.1',
        appName,
        data: payload,
      };
    } catch (error) {
      throw new BadGatewayException('UnAuthorized');
    }
  }
}
