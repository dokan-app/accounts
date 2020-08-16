import {} from 'class-validator';
import { AuthPayload } from 'src/auth/auth.dto';
import { AUTH_DOMAIN } from 'src/session/session.types';

export interface ResourceList<DataModel> {
  currentPage: number;
  pageCount: number;
  resourceCount: number;
  data: DataModel[];
}

export class PaginationQueryDTO {
  page?: number;

  limit?: number;

  sort?: string;
}

export interface SessionUser {
  name: string;
  username: string;
  email: string;
  domain: AUTH_DOMAIN;
  token: string;
}

export interface AppRequest extends Request {
  user: SessionUser;
  login: any;
  logout: any;
  isAuthenticated: any;
  flash: any;
}

export interface AdminSession {
  adminId: string;
}
