import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedAdminGuard } from 'src/auth/guards/authenticated-admin.guard';

@UseGuards(AuthenticatedAdminGuard)
@Controller('admin-dashboard')
export class AdminDashboardController {
  // constructor(private readonly appsService: AppsService) {}

  @Get()
  @Render('admin/root')
  root(@Req() req: Request): any {
    return { user: req.user, title: 'Admin dashboard' };
  }
}
