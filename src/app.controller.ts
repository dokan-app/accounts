import {
  Controller,
  Get,
  Param,
  Render,
  Post,
  Req,
  UseGuards,
  Query,
  Session,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RedisService } from 'nestjs-redis';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { AppRequest } from './shared/types';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redis: RedisService,
  ) {}

  @Get()
  @Render('index')
  root(): any {
    return { title: 'Home' };
  }

  @Get('/get')
  redisget(): any {
    const client = this.redis.getClient('dokan-app');
    return client.get('name');
  }

  @Get('/me')
  @UseGuards(IsAuthenticatedGuard)
  me(@Req() req: Request): any {
    return req;
  }

  @Get('/set')
  redisset(@Query('name') name: string): any {
    const client = this.redis.getClient('dokan-app');
    return client.set('name', name);
  }

  @Get('/auth/login')
  @Render('auth/login')
  loginPage(): any {
    return { title: 'Login' };
  }

  @Get('/auth/register')
  @Render('auth/register')
  registerPage(): any {
    return { title: 'Register' };
  }

  @Post('/auth/login')
  @UseGuards(AuthGuard('local'))
  doLogin(
    @Req() req: AppRequest,
    @Res() res: Response,
    @Session() session: { user: string },
  ): any {
    session.user = req.user.sub;
    res.redirect('/me');
  }

  @Post('/auth/register')
  doRegister(@Req() req: Request): any {
    return this.appService.userRegister(req.body);
  }
}
