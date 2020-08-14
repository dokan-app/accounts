import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { AuthPayload } from '../auth.dto';
@Injectable()
export class AdminSessionSerializer extends PassportSerializer {
  constructor(private readonly adminService: AdminService) {
    super();
  }

  serializeUser(authPayload: AuthPayload, done) {
    done(null, authPayload.sub);
  }

  async deserializeUser(adminId: any, done) {
    const admin = await this.adminService.getById(adminId);
    done(null, admin);
  }
}
