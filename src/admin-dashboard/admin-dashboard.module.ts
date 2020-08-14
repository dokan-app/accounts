import { Module } from '@nestjs/common';
import { AdminDashboardService } from './admin-dashboard.service';
import { AdminDashboardController } from './admin-dashboard.controller';

@Module({
  providers: [AdminDashboardService],
  controllers: [AdminDashboardController]
})
export class AdminDashboardModule {}
