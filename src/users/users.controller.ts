import { Controller, Get, Query } from '@nestjs/common';
import { PaginationQueryDTO, ResourceList } from 'src/shared/types';
import { UsersService } from './users.service';
import { User } from './users.model';
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginationQuery } from 'src/shared/decorators/api-pagination.decorator';
import { RoleService } from 'src/role/role.service';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly roleService: RoleService,
  ) {}

  @Get()
  @ApiPaginationQuery()
  userList(@Query() query: PaginationQueryDTO): Promise<ResourceList<User>> {
    return this.usersService.list(query);
  }
}
