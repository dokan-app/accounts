import { prop, pre, plugin } from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';
import * as uniqueValidator from 'mongoose-unique-validator';
import { randomBytes } from 'crypto';

@plugin(uniqueValidator, { message: '{VALUE} already taken' })
@pre<App>('save', function() {
  const buffer = randomBytes(12);
  const token = buffer.toString('hex');
  this.clientSecret = hashSync(token);
  this.clientId = token;
})
export class App {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  redirectUrl: string;

  @prop()
  clientId?: string;

  @prop()
  clientSecret?: string;
}
