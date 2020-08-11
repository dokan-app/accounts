import { prop, plugin, arrayProp } from '@typegoose/typegoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { Permissions } from './role.type';

@plugin(uniqueValidator, { message: '{VALUE} already taken' })
export class Role {
  @prop({ required: true, unique: true })
  name: string;

  @arrayProp({
    items: String,
    enum: Object.values(Permissions),
    required: true,
  })
  permissions: Permissions[];
}
