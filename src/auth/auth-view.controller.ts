import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Res,
  Render,
  Req,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AdminLoginGuard } from './guards/admin-login.guard';
import { Response } from 'express';
import { CreateAdminDTO } from 'src/admin/admin.dto';
import { AppRequest } from 'src/shared/types';

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
    console.log('admin/login', req.user.token);
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
}
