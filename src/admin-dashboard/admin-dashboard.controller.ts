import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedAdminGuardGuard } from 'src/auth/guards/authenticated-admin.guard';

@Controller('admin-dashboard')
export class AdminDashboardController {
  // constructor(private readonly appsService: AppsService) {}

  @Get()
  @UseGuards(AuthenticatedAdminGuardGuard)
  @Render('admin/root')
  root(@Req() req: Request): any {
    return { user: req.user, title: 'Admin dashboard' };
  }

  // @Get('/apps/create')
  // @UseGuards(AuthenticatedAdminGuardGuard)
  // @Render('admin/apps/create')
  // appsCreate(@Req() req: Request): any {
  //   return { user: req.user, title: 'Create new app' };
  // }

  // @Post('/apps/create')
  // @UseGuards(AuthenticatedAdminGuardGuard)
  // doAppsCreate(
  //   @Res() res: Response,
  //   @Body() body: { name: string; redirectUrl: string },
  // ): any {
  //   this.appsService.create(body.name, body.redirectUrl);
  //   res.redirect('/admin-dashboard/apps');
  // }
}
