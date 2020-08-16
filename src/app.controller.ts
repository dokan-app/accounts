import {
  Controller,
  Get,
  Render,
  Post,
  Req,
  UseGuards,
  Session,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AppRequest } from './shared/types';
import { AdminLoginGuard } from './auth/guards/admin-login.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root(): any {
    return { title: 'Home' };
  }

  @Get('/auth/login')
  @Render('auth/login')
  loginPage(): any {
    return { title: 'Login' };
  }

  @Get('/auth/admin/register')
  @Render('auth/admin/register')
  adminRegister(): any {
    return { title: 'Register Admin' };
  }

  @Get('/auth/admin/login')
  @Render('auth/admin/login')
  adminLogin(): any {
    return { title: 'Admin Login' };
  }

  @Get('/auth/register')
  @Render('auth/register')
  registerPage(): any {
    return { title: 'Register' };
  }

  @Get('/auth/logout')
  logout(@Req() req: AppRequest, @Res() res: Response): any {
    req.logout();
    res.redirect('/');
  }

  @Post('/auth/register')
  doRegister(@Req() req: Request): any {
    return this.appService.userRegister(req.body);
  }

  @UseGuards(AdminLoginGuard)
  @Post('/auth/admin/login')
  doAdminLogin(@Res() res: Response): any {
    return res.redirect('/admin-dashboard');
  }

  @Post('/auth/admin/register')
  doAdminRegister(@Req() req: Request): any {
    return this.appService.registerAdmin(req.body);
  }
}
