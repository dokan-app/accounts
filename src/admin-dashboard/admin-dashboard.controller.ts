import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedAdminGuardGuard } from 'src/auth/guards/authenticated-admin.guard';

@Controller('admin-dashboard')
export class AdminDashboardController {
  @Get()
  @UseGuards(AuthenticatedAdminGuardGuard)
  @Render('admin/root')
  root(@Req() req: Request): any {
    return { user: req.user, title: 'Admin dashboard' };
  }

  @Get('/apps')
  @UseGuards(AuthenticatedAdminGuardGuard)
  @Render('admin/apps/index')
  appsIndex(@Req() req: Request): any {
    return { user: req.user, title: 'Admin dashboard' };
  }
}
