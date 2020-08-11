import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { ConfigService } from '@nestjs/config';
import { CreateRoleDTO } from './role.dto';
import { Role } from './role.model';
import { store, index, show } from 'quick-crud';
import { ResourceList, PaginationQueryDTO } from 'src/shared/types';
import { Permissions } from './role.type';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private readonly model: ReturnModelType<typeof Role>,
    private readonly config: ConfigService,
  ) {}

  async roleList(
    query: PaginationQueryDTO,
  ): Promise<ResourceList<DocumentType<Role>>> {
    return index({ model: this.model, paginationOptions: query });
  }

  async createRole(data: CreateRoleDTO): Promise<DocumentType<Role>> {
    return store({ model: this.model, data });
  }

  async getRoleByName(name: string): Promise<DocumentType<Role>> {
    return show({ model: this.model, where: { name } });
  }

  async createDefaultRole(): Promise<DocumentType<Role>> {
    const role = await this.model.create({
      name: 'USER',
      permissions: [...Object.values(Permissions)],
    });
    return role;
  }
}
