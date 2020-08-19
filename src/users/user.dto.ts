import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Match } from 'src/shared/decorators/match.decorator';

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  password: string;
}

export class UpdateUserDTO {
  name: string;
  username: string;

  @IsEmail()
  email: string;
}

// Source: https://stackoverflow.com/a/60954034/3705299
export class UpdatePasswordDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'password too weak',
  // })
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('password', { message: 'Password did not matched' })
  passwordConfirm: string;
}
