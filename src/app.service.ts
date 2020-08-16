import { Injectable, Session } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UserRegisterDTO, UserLoginDTO } from './auth/auth.dto';
import { AdminSession } from './shared/types';

@Injectable()
export class AppService {
  constructor(private readonly authService: AuthService) {}

  async userRegister(data: UserRegisterDTO): Promise<any> {
    return this.authService.registerUser(data);
  }

  async registerAdmin(data: UserLoginDTO): Promise<any> {
    return this.authService.loginUser(data);
  }
}
