import { IsNotEmpty, IsUrl } from 'class-validator';

export class OAuthQueryparams {
  @IsNotEmpty()
  clientId: string;

  @IsNotEmpty()
  redirectUrl: string;
}

export class OAuthResourceRequestBody {
  @IsNotEmpty()
  clientId: string;

  @IsNotEmpty()
  oauth_code: string;

  @IsNotEmpty()
  @IsUrl()
  redirectUrl: string;
}
