import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SessionModule as NestSessionModule } from 'nestjs-session';

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
import { LocalStrategy } from './auth/passport-strategies/local.strategy';
import { Redis } from 'ioredis';
const config: ConfigService = new ConfigService();

@Module({
  imports: [
    PassportModule,
    RedisModule.register({
      onClientReady: async (client: Redis) => {
        client.on('error', err => {
          console.log(err);
        });
        client.on('connect', () => {
          console.log('Redis server connected');
        });
      },
      name: 'dokan-app',
      // password: '4ZfYRWznWKFA4HChY9kPeeI7J0OT1Ub4',
      // url: 'redis-13171.c8.us-east-1-3.ec2.cloud.redislabs.com',
      // port: 13171,
    }),
    NestSessionModule.forRoot({
      session: { secret: 'skhfskfhsd', resave: false },
    }),

    ConfigModule.forRoot({ isGlobal: true }),
    {
      ...JwtModule.register({ secret: config.get('JWT_SECRET') }),
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
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy],
})
export class AppModule {}
