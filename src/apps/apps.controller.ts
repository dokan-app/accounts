import {
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  Body,
  Res,
  applyDecorators,
  Put,
  Delete,
} from '@nestjs/common';
import { AppsService } from './apps.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AUTH_DOMAIN } from 'src/session/session.types';
import { PaginationQueryDTO, ResourceList } from 'src/shared/types';
import { App } from './apps.model';
import { CreateAppDTO, UpdateAppDTO } from './apps.dto';
// import { CreateAppDTO, UpdateAppDTO } from 'dist/apps/apps.dto';

@ApiTags('OAuth Applications')
@Controller('api/apps')
@applyDecorators(Auth(AUTH_DOMAIN.ADMIN))
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Get()
  async index(query: PaginationQueryDTO): Promise<ResourceList<App>> {
    return this.appsService.index(query);
  }

  @Post()
  async store(@Body() data: CreateAppDTO): Promise<App> {
    return this.appsService.store(data);
  }

  @Put(':_id')
  async edit(@Param('_id') _id: string, data: UpdateAppDTO): Promise<App> {
    return this.appsService.update(_id, data);
  }

  @Delete(':_id')
  destroy(@Param('_id') _id: string): Promise<App> {
    return this.appsService.deleteApp(_id);
  }
}
