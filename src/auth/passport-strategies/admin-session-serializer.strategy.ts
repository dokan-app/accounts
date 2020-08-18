import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { AuthPayload } from '../auth.dto';
import { AUTH_DOMAIN } from 'src/session/session.types';
@Injectable()
export class AdminSessionSerializer extends PassportSerializer {
  constructor(private readonly adminService: AdminService) {
    super();
  }

  serializeUser(authPayload: AuthPayload, done) {
    done(null, { adminId: authPayload.sub, token: authPayload.token });
  }

  async deserializeUser({ adminId, token }: any, done) {
    const admin = await this.adminService.getById(adminId);

    let user: any = admin;
    user = user._doc;
    done(null, { ...user, token, domain: AUTH_DOMAIN.ADMIN });
  }
}
