import {
  Controller,
  Post,
  Body,
  Req,
  HttpCode,
  HttpStatus,
  UseFilters,
  Get,
  UseGuards,
} from '@nestjs/common';
import {
  AdminRegisterDTO,
  AdminLoginDTO,
  AuthPayload,
  UserRegisterDTO,
  UserLoginDTO,
} from './auth.dto';
import { AuthService } from './auth.service';
import { Admin } from 'src/admin/admin.model';
import { SessionRequest, AUTH_DOMAIN } from 'src/session/session.types';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from './decorators/auth.decorator';
import { User } from 'src/users/users.model';
import { MongoExceptionFilter } from 'src/utils/app-exception.filter';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/admin/register')
  registerAdmin(@Body() body: AdminRegisterDTO): Promise<Admin> {
    return this.authService.registerAdmin(body);
  }

  @Post('/admin/login')
  @HttpCode(HttpStatus.OK)
  loginAdmin(@Body() body: AdminLoginDTO): Promise<AuthPayload> {
    return this.authService.loginAdmin(body);
  }

  @Auth(AUTH_DOMAIN.ADMIN)
  @Post('/admin/logout')
  adminLogout(@Req() req: SessionRequest): any {
    return this.authService.logoutAdmin(req.user);
  }

  @Post('/users/register')
  @UseFilters(MongoExceptionFilter)
  registerUser(@Body() data: UserRegisterDTO): Promise<User> {
    return this.authService.registerUser(data);
  }

  @Post('/users/login')
  loginUser(@Body() data: UserLoginDTO): Promise<AuthPayload> {
    return this.authService.loginUser(data);
  }

  @Auth(AUTH_DOMAIN.USER)
  @Post('/users/logout')
  logoutUser(@Req() req: SessionRequest): any {
    return this.authService.logoutUser(req.user);
  }

  @UseGuards(AuthGuard('facebook'))
  @Get('/facebook')
  loginWithFacebook(): void {
    return;
  }

  @UseGuards(AuthGuard('facebook'))
  @Get('/facebook/callback')
  loginWithFacebookCallback(): void {
    return;
  }
}
