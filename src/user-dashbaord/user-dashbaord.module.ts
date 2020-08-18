import { Module } from '@nestjs/common';
import { UserDashbaordService } from './user-dashbaord.service';
import { UserDashbaordController } from './user-dashbaord.controller';

@Module({
  providers: [UserDashbaordService],
  controllers: [UserDashbaordController]
})
export class UserDashbaordModule {}
