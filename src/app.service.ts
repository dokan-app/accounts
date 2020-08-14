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

  async userLogin(data: UserLoginDTO): Promise<any> {
    return this.authService.loginUser(data);
  }

  async registerAdmin(data: UserLoginDTO): Promise<any> {
    return this.authService.loginUser(data);
  }

  async loginAdmin(
    data: UserLoginDTO,
    @Session() session: AdminSession,
  ): Promise<any> {
    try {
      const res = await this.authService.loginAdmin(data);
      session.adminId = res.sub;
      return;
    } catch (error) {
      return 'Invalid Credentials';
    }
  }
}
