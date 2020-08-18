import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { AuthPayload } from '../auth.dto';
import { AUTH_DOMAIN } from 'src/session/session.types';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UsersService,
  ) {
    super();
  }

  serializeUser(authPayload: AuthPayload, done) {
    done(null, {
      sub: authPayload.sub,
      token: authPayload.token,
      domain: authPayload.domain,
    });
  }

  async deserializeUser({ sub, token, domain }: any, done) {
    let user: any;

    if (domain === AUTH_DOMAIN.USER) {
      user = await this.userService.getById(sub);
    }

    if (domain === AUTH_DOMAIN.ADMIN) {
      user = await this.adminService.getById(sub);
    }

    done(null, { ...user._doc, token, domain });
  }
}
