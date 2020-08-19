import { Injectable, BadGatewayException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { App } from './apps.model';
import { DocumentType } from '@typegoose/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { destroy, index } from 'quick-crud';
import { CreateAppDTO, UpdateAppDTO } from './apps.dto';
import { ResourceList, PaginationQueryDTO } from 'src/shared/types';
import { RedisService } from 'nestjs-redis';
import { randomBytes } from 'crypto';
import { OAuthQueryparams } from 'src/oauth/oauth.dto';

@Injectable()
export class AppsService {
  constructor(
    @InjectModel(App)
    private readonly model: ReturnModelType<typeof App>,
    private readonly redis: RedisService,
  ) {}

  async index(query: PaginationQueryDTO): Promise<ResourceList<App>> {
    return index({ model: this.model, paginationOptions: query });
  }

  async store(data: CreateAppDTO): Promise<DocumentType<App>> {
    return this.model.create(data);
  }

  async update(_id: string, data: UpdateAppDTO): Promise<App> {
    return this.model.findByIdAndUpdate(_id, data);
  }

  async getById(_id: string): Promise<DocumentType<App>> {
    return this.model.findById({ _id });
  }

  async getByClientId(clientid: string): Promise<DocumentType<App>> {
    return this.model.findOne({ clientid });
  }

  async getByClientIdAndRedirectUrlAnd(query: OAuthQueryparams): Promise<App> {
    const app = await this.model.findOne(query);
    if (!app) throw new BadGatewayException('Invalid oAuth App');

    return app;
  }

  async getByClientIdAndRedirectUrl(query: OAuthQueryparams): Promise<App> {
    const app = await this.model.findOne(query);
    if (!app) throw new BadGatewayException('Invalid oAuth App');

    return app;
  }

  async getByClientSecrey(clientSecret: string): Promise<any> {
    return this.model.find({ clientSecret });
  }

  async deleteApp(_id: string): Promise<any> {
    return destroy({ model: this.model, where: { _id } });
  }

  async storeApplicationInCache(
    clientid: string,
    appName: string,
    userId: string,
  ): Promise<any> {
    // Create oAuth Code
    const buffer = randomBytes(10);
    const oAuthCode = buffer.toString('hex');

    const redis = this.redis.getClient('dokan-accounts');

    // check user exists on UserCache
    redis.sadd(`user-id-${userId}`, appName);

    // Store oAuthCode to cache
    redis.hset('oAuthCodes', oAuthCode, `${userId}|${appName}`);

    return oAuthCode;
  }
}
