import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [TypegooseModule.forFeature([User]), RoleModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
