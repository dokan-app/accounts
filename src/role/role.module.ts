import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Role } from './role.model';
import { SessionModule } from 'src/session/session.module';

@Module({
  imports: [TypegooseModule.forFeature([Role]), SessionModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
