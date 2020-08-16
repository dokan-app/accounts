import { Controller, Get, Render, UseGuards, Post, Body } from '@nestjs/common';
import { AuthenticatedAdminGuardGuard } from 'src/auth/guards/authenticated-admin.guard';
import { AppsService } from './apps.service';
import { CreateAppDTO } from './apps.dto';

@UseGuards(AuthenticatedAdminGuardGuard)
@Controller('apps')
export class AppsViewController {
  constructor(private readonly appsService: AppsService) {}

  @Get()
  @Render('admin/apps/index')
  async index() {
    const apps = await this.appsService.list();
    return { apps };
  }

  @Get('/create')
  @Render('admin/apps/create')
  create() {
    return;
  }

  @Post('/store')
  store(@Body() data: CreateAppDTO) {
    return data;
  }
}
