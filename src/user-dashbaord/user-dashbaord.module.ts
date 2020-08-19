import { Module } from '@nestjs/common';
import { UserDashbaordService } from './user-dashbaord.service';
import { UserDashbaordController } from './user-dashbaord.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [UserDashbaordService],
  controllers: [UserDashbaordController],
})
export class UserDashbaordModule {}
