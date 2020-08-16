import { Module } from '@nestjs/common';
import { AdminDashboardService } from './admin-dashboard.service';
import { AdminDashboardController } from './admin-dashboard.controller';

import { AppsModule } from 'src/apps/apps.module';

@Module({
  providers: [AdminDashboardService],
  controllers: [AdminDashboardController],
  imports: [AppsModule],
})
export class AdminDashboardModule {}
