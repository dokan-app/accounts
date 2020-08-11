import { Request } from 'express';

export enum AUTH_DOMAIN {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

// TODO: exp
export interface JWTPayload {
  iss: string;
  sub: string;
  domain: AUTH_DOMAIN;
}

export interface SessionRequest extends Request {
  user: JWTPayload;
}
