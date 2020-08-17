import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { App } from './apps.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { destroy } from 'quick-crud';
import { CreateAppDTO, UpdateAppDTO } from './apps.dto';

@Injectable()
export class AppsService {
  constructor(
    @InjectModel(App)
    private readonly model: ReturnModelType<typeof App>,
  ) {}

  async list(): Promise<App[]> {
    return this.model.find({}).sort({ updatedAt: -1 });
  }

  async create(data: CreateAppDTO): Promise<App> {
    return this.model.create(data);
  }

  async update(_id: string, data: UpdateAppDTO): Promise<App> {
    return this.model.findByIdAndUpdate(_id, data);
  }
  async getById(_id: string): Promise<any> {
    return this.model.findById({ _id });
  }

  async getByClientId(clientid: string): Promise<any> {
    return this.model.find({ clientid });
  }

  async getByClientSecrey(clientSecret: string): Promise<any> {
    return this.model.find({ clientSecret });
  }

  async deleteApp(_id: string): Promise<any> {
    return destroy({ model: this.model, where: { _id } });
  }
}
