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
import { UserDashbaordModule } from './user-dashbaord/user-dashbaord.module';

import { RedisModule } from 'nestjs-redis';
import { Redis } from 'ioredis';
import { OauthModule } from './oauth/oauth.module';

const config: ConfigService = new ConfigService();

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({ isGlobal: true }),
    {
      ...JwtModule.register({ secret: config.get('APP_SECRET') }),
      global: true,
    },
    RedisModule.register({
      onClientReady: async (client: Redis) => {
        client.on('error', err => {
          console.log(err);
        });
        client.on('connect', () => {
          console.log('Redis server connected');
        });
      },
      name: 'dokan-accounts',
      // password: '4ZfYRWznWKFA4HChY9kPeeI7J0OT1Ub4',
      // url: 'redis-13171.c8.us-east-1-3.ec2.cloud.redislabs.com',
      // port: 13171,
    }),
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
    UserDashbaordModule,
    OauthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
