import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/admin/admin.module';
import { SessionModule } from 'src/session/session.module';
import { AuthController } from './auth.controller';
import { RoleModule } from 'src/role/role.module';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTStrategy } from './passport-strategies/jwt.strategy';
// import { FacebookStategy } from './passport-strategies/facebook.strategy';
import { SessionSerializer } from './passport-strategies/session-serializer.strategy';
import { AuthviewController } from './auth-view.controller';
import { AdminLoginStrategy } from './passport-strategies/admin-login-local.strategy';
import { UserLoginStrategy } from './passport-strategies/user-login-local.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('APP_SECRET'),
      }),
    }),
    AdminModule,
    UsersModule,
    SessionModule,
    RoleModule,
    PassportModule,
  ],
  providers: [
    AuthService,
    JWTStrategy,
    // FacebookStategy,
    SessionSerializer,
    AdminLoginStrategy,
    UserLoginStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthviewController, AuthController],
})
export class AuthModule {}
