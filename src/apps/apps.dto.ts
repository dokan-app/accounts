import { IsNotEmpty, IsUrl, MinLength } from 'class-validator';

export class CreateAppDTO {
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsNotEmpty()
  @IsUrl()
  redirectUrl: string;
}

export class UpdateAppDTO {
  @MinLength(5)
  name: string;

  @IsUrl()
  redirectUrl: string;
}
