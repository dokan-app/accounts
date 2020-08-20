import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Res,
  Render,
  Req,
  Query,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AdminLoginGuard } from './guards/admin-login.guard';
import { Response } from 'express';
import { CreateAdminDTO } from 'src/admin/admin.dto';
import { AppRequest } from 'src/shared/types';
import { CreateUserDTO } from 'src/users/user.dto';
import { UserLoginGuard } from './guards/user-login.guard';

@Controller('auth')
export class AuthviewController {
  constructor(private readonly authService: AuthService) {}

  @Post('logout')
  logout(@Req() req: AppRequest, @Res() res: Response) {
    req.logout();
    res.clearCookie('token');
    req.flash('successMsg', 'You have been logged out');
    res.redirect('/');
  }

  @Get('admin/login')
  @Render('auth/admin/login')
  adminLogin(): any {
    return { title: 'Admin login' };
  }

  @Get('admin/register')
  @Render('auth/admin/register')
  adminRegister(): any {
    return { title: 'Admin Registration' };
  }

  @UseGuards(AdminLoginGuard)
  @Post('admin/login')
  doAdminLogin(@Req() req: AppRequest, @Res() res: Response): any {
    res.cookie('token', req.user.token, {
      maxAge: 1000 * 1 * 60 * 60 * 24 * 365,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    return res.redirect('/admin-dashboard');
  }

  @Post('admin/register')
  doAdminRegister(
    @Res() res: Response,
    @Req() req: AppRequest,
    @Body() body: CreateAdminDTO,
  ): any {
    try {
      this.authService.registerAdmin(body);
    } catch (error) {
      console.log('heyyy');
    }
    return res.redirect('/admin/auth/login');
  }

  @Get('user/login')
  @Render('auth/user/login')
  userLogin(): any {
    return { title: 'User login' };
  }

  @Post('user/login')
  @UseGuards(UserLoginGuard)
  doUserUserLogin(@Res() res: Response, @Req() req: AppRequest): any {
    req.flash('successMsg', 'Successfully logged in');
    res.cookie('token', req.user.token, {
      maxAge: 1000 * 1 * 60 * 60 * 24 * 365,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    const query = req.session.oAuthRedirectQueries;
    if (query) {
      req.session.oAuthRedirectQueries = '';
      res.redirect(`/api/oauth/authorize?${query}`);
    }

    res.redirect('/user-dashboard');
  }

  @Get('user/register')
  @Render('auth/user/register')
  userRegister(): any {
    return { title: 'User Register' };
  }

  @Post('user/register')
  doUserRegistration(
    @Body() data: CreateUserDTO,
    @Res() res: Response,
    @Req() req: AppRequest,
  ): any {
    this.authService.registerUser(data);
    req.flash('successMsg', 'Successfully registered');
    res.redirect('/');
  }
}
