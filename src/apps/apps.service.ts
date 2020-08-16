import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { App } from './apps.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { destroy } from 'quick-crud';

@Injectable()
export class AppsService {
  constructor(
    @InjectModel(App)
    private readonly model: ReturnModelType<typeof App>,
  ) {}

  async create(name: string, redirectUrl: string): Promise<App> {
    return this.model.create({ name, redirectUrl });
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
