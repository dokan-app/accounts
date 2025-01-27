import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { SessionService } from 'src/session/session.service';
import { Admin } from 'src/admin/admin.model';
import { Response } from 'express';
import {
  AdminRegisterDTO,
  AdminLoginDTO,
  AuthPayload,
  UserRegisterDTO,
  UserLoginDTO,
} from './auth.dto';
import { AUTH_DOMAIN, JWTPayload } from 'src/session/session.types';
import { RoleService } from 'src/role/role.service';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { PermissionDeniedException } from 'src/shared/exceptions/PermissionDeniedException';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly usersService: UsersService,
    private readonly roleService: RoleService,
    private readonly session: SessionService,
  ) {}

  async registerAdmin(data: AdminRegisterDTO): Promise<Admin> {
    // 1. check if a there is already an admin
    const count = await this.adminService.count();
    if (count) {
      throw new PermissionDeniedException(
        'Admin registration has been truned off',
      );
    }

    this.roleService.createDefaultRole();

    return this.adminService.create(data);
  }

  /**
   * Login an admin
   * @param data AdminLoginDTO
   */
  async loginAdmin(data: AdminLoginDTO): Promise<AuthPayload> {
    const { identifier, password } = data;

    // find admin with identifier
    const admin = await this.adminService.getByIdentifier(identifier);
    if (!admin) throw new UnauthorizedException();

    // Matched password
    const passwordMatched = await admin.comparePassword(password);
    if (!passwordMatched) throw new UnauthorizedException();

    // generate token for admin
    const payload = await this.session.findOrCreateSession(
      admin._id,
      AUTH_DOMAIN.ADMIN,
    );

    return payload;
  }

  /**
   * Logout an admin
   * @param token JWTPayload
   */
  async logoutAdmin(token: JWTPayload): Promise<{ message: string }> {
    const { sub, domain } = token;
    if (this.session.deleteSession(sub, domain)) {
      return {
        message: 'You have logged out successfully',
      };
    } else {
      throw new ForbiddenException();
    }
  }

  /**
   * Register a new user
   * @param data UserRegisterDTO
   */

  async registerUser(data: UserRegisterDTO): Promise<User> {
    return this.usersService.create(data);
  }

  async loginUser(data: UserLoginDTO): Promise<AuthPayload> {
    const { identifier, password } = data;

    // find admin with identifier
    const user = await this.usersService.getByIdentifier(identifier);
    if (!user) throw new UnauthorizedException();

    // Matched password
    const passwordMatched = await user.comparePassword(password);
    if (!passwordMatched) throw new UnauthorizedException();

    // generate token for admin
    const authPayload = await this.session.findOrCreateSession(
      user._id,
      AUTH_DOMAIN.USER,
    );
    return authPayload;
  }

  /**
   * Logout a User
   * @param token JWTPayload
   */
  async logoutUser(token: JWTPayload): Promise<{ message: string }> {
    const { sub, domain } = token;
    if (this.session.deleteSession(sub, domain)) {
      return {
        message: 'You have logged out successfully',
      };
    } else {
      throw new ForbiddenException();
    }
  }
}
