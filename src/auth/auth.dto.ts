import { IsNotEmpty, IsEmail } from 'class-validator';
import { AUTH_DOMAIN } from 'src/session/session.types';
import { ApiProperty } from '@nestjs/swagger';
// import { ApiProperty } from '@nestjs/swagger';

export class AdminRegisterDTO {
  @ApiProperty({
    type: String,
    description: 'Admin username',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Admin username',
    required: true,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    description: 'Admin email address',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password for admin',
    required: true,
  })
  @IsNotEmpty()
  password: string;
}

export class AdminLoginDTO {
  @ApiProperty({
    type: String,
    description: 'username/email address',
    required: true,
  })
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({
    type: String,
    description: 'password',
    required: true,
  })
  @IsNotEmpty()
  password: string;
}

export class UserLoginDTO extends AdminLoginDTO {}

export interface AuthPayload {
  domain: AUTH_DOMAIN;
  token: string;
  sub: string;
}

export class UserRegisterDTO {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  password: string;
}

export class OAuthQueryparams {
  @IsNotEmpty()
  clientId: string;

  @IsNotEmpty()
  redirectUrl: string;
}
