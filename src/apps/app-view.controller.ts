// import {
//   Controller,
//   Get,
//   Render,
//   UseGuards,
//   Post,
//   Body,
//   Res,
//   Param,
//   Req,
// } from '@nestjs/common';
// import { AuthenticatedAdminGuardGuard } from 'src/auth/guards/authenticated-admin.guard';
// import { AppsService } from './apps.service';
// import { CreateAppDTO, UpdateAppDTO } from './apps.dto';
// import { Response } from 'express';
// import { AppRequest } from 'src/shared/types';

// @UseGuards(AuthenticatedAdminGuardGuard)
// @Controller('apps')
// export class AppsViewController {
//   constructor(private readonly appsService: AppsService) {}

//   // @Get()
//   // @Render('admin/apps/index')
//   // async index() {
//   //   const apps = await this.appsService.list();
//   //   return { apps, title: 'Registered Apps' };
//   // }

//   // @Get('create')
//   // @Render('admin/apps/create')
//   // create() {
//   //   return { title: 'Register app' };
//   // }

//   // @Get('edit/:_id')
//   // @Render('admin/apps/edit')
//   // async edit(@Param('_id') appId: string) {
//   //   const app = await this.appsService.getById(appId);
//   //   return { app, title: 'Update app' };
//   // }

//   // @Post('update/:_id')
//   // async update(
//   //   @Param('_id') appId: string,
//   //   @Res() res: Response,
//   //   @Req() req: AppRequest,
//   //   @Body() data: UpdateAppDTO,
//   // ) {
//   //   await this.appsService.update(appId, data);
//   //   req.flash('successMsg', 'App updated');
//   //   res.redirect('/apps');
//   // }

//   // @Post('store')
//   // store(@Body() data: CreateAppDTO, @Res() res: Response) {
//   //   this.appsService.create(data);
//   //   res.redirect('/apps');
//   // }

//   // @Post('destroy/:_id')
//   // destroy(@Param('_id') appId: string, @Res() res: Response) {
//   //   this.appsService.deleteApp(appId);
//   //   res.redirect('/apps');
//   // }
// }
