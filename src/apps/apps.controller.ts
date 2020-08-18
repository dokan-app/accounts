import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppsService } from './apps.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AUTH_DOMAIN } from 'src/session/session.types';

@ApiTags('OAuth Applications')
@Controller('api/apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Auth(AUTH_DOMAIN.ADMIN)
  @Get()
  async index() {
    const apps = await this.appsService.list();
    return apps;
  }
}
