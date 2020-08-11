import { Controller, Get, Body, Post, UseFilters, Query } from '@nestjs/common';
import { DocumentType } from '@typegoose/typegoose';
import { RoleService } from './role.service';
import { ResourceList, PaginationQueryDTO } from 'src/shared/types';
import { Role } from './role.model';
import { CreateRoleDTO } from './role.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AUTH_DOMAIN } from 'src/session/session.types';
import { MongoExceptionFilter } from 'src/utils/app-exception.filter';
import { ApiPaginationQuery } from 'src/shared/decorators/api-pagination.decorator';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @Auth(AUTH_DOMAIN.ADMIN)
  @ApiPaginationQuery()
  async roleList(
    @Query() query: PaginationQueryDTO,
  ): Promise<ResourceList<DocumentType<Role>>> {
    return this.roleService.roleList(query);
  }

  @Post()
  @Auth(AUTH_DOMAIN.ADMIN)
  @UseFilters(MongoExceptionFilter)
  async createRole(@Body() body: CreateRoleDTO): Promise<DocumentType<Role>> {
    return this.roleService.createRole(body);
  }
}
