import { Module } from '@nestjs/common';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { AppsModule } from 'src/apps/apps.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [AppsModule, UsersModule],
  controllers: [OauthController],
  providers: [OauthService],
})
export class OauthModule {}
