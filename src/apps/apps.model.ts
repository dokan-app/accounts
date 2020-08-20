import { prop, pre, plugin, modelOptions } from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';
import * as uniqueValidator from 'mongoose-unique-validator';
import { randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';

const jwt = new JwtService({
  secret: 'dfsliugoidksfugldsfgjdfl', // TODO: get from config service
});

@plugin(uniqueValidator, { message: '{VALUE} already taken' })
@pre<App>('save', async function() {
  const buffer = randomBytes(12);
  const clientid = buffer.toString('hex');
  this.clientSecret = await jwt.signAsync({ clientid });
  this.clientId = clientid;
})
@modelOptions({ schemaOptions: { timestamps: true } })
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
