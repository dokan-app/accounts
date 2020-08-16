import { Module } from '@nestjs/common';
import { AppsService } from './apps.service';
import { AppsController } from './apps.controller';
import { App } from './apps.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { AppsViewController } from './app-view.controller';

@Module({
  imports: [TypegooseModule.forFeature([App])],
  providers: [AppsService],
  controllers: [AppsController, AppsViewController],
  exports: [AppsService],
})
export class AppsModule {}
