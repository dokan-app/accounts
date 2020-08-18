import { IsNotEmpty, IsUrl, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppDTO {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  redirectUrl: string;
}

export class UpdateAppDTO {
  @ApiProperty()
  @MinLength(5)
  name: string;

  @ApiProperty()
  @IsUrl()
  redirectUrl: string;
}
