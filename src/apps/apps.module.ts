import { Module } from '@nestjs/common';
import { AppsService } from './apps.service';
import { AppsController } from './apps.controller';

@Module({
  providers: [AppsService],
  controllers: [AppsController]
})
export class AppsModule {}
