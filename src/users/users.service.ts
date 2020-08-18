import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './users.model';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { store, show, index } from 'quick-crud';
import { CreateUserDTO } from './user.dto';
import { ResourceList, PaginationQueryDTO } from 'src/shared/types';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly model: ReturnModelType<typeof User>,
    private readonly roleService: RoleService,
  ) {}

  async list(query: PaginationQueryDTO): Promise<ResourceList<User>> {
    return index({ model: this.model, paginationOptions: query });
  }

  async create(data: CreateUserDTO): Promise<DocumentType<User>> {
    // const { _id: roleId } = await this.roleService.getRoleByName('USER');

    const user = await store({
      model: this.model,
      // data: { ...data, role: roleId },
      data: { ...data },
    });

    return user;
  }

  async getById(_id: string): Promise<DocumentType<User>> {
    const doc = await this.model.findById(_id);
    return doc;
  }

  async getByUsername(username: string): Promise<DocumentType<User>> {
    return await show({ model: this.model, where: { username } });
  }

  async getByEmail(email: string): Promise<User> {
    return await show({ model: this.model, where: { email } });
  }

  async getByIdentifier(identifier: string): Promise<DocumentType<User>> {
    const user = await this.model.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    return user;
  }

  async count(): Promise<any> {
    return this.model.countDocuments({});
  }
}
