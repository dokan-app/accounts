import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { SessionModule } from './session/session.module';
import { AuthModule } from './auth/auth.module';

import { TypegooseModule } from 'nestjs-typegoose';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AdminLoginStrategy } from './auth/passport-strategies/admin-login-local.strategy';
import { AdminSessionSerializer } from './auth/passport-strategies/admin-session-serializer.strategy';
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
    AdminModule,
    SessionModule,
    AuthModule,
    RoleModule,
    UsersModule,
    AdminDashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService, AdminLoginStrategy, AdminSessionSerializer],
})
export class AppModule {}
