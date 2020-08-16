import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypegooseModule } from 'nestjs-typegoose';
import { PassportModule } from '@nestjs/passport';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { SessionModule } from './session/session.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { AppsModule } from './apps/apps.module';

const config: ConfigService = new ConfigService();

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({ isGlobal: true }),
    {
      ...JwtModule.register({ secret: config.get('APP_SECRET') }),
      global: true,
    },
    TypegooseModule.forRoot(config.get('DATABASE_URL'), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AppsModule,
    AdminModule,
    SessionModule,
    AuthModule,
    RoleModule,
    UsersModule,
    AdminDashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
