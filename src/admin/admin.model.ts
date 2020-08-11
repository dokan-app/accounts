import { prop, pre, plugin } from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';
import * as uniqueValidator from 'mongoose-unique-validator';
import { compare } from 'bcryptjs';

@plugin(uniqueValidator, { message: '{VALUE} already taken' })
@pre<Admin>('save', function() {
  this.password = hashSync(this.password);
})
export class Admin {
  @prop({ required: true })
  name: string;

  @prop({ unique: true })
  username: string;

  @prop({ unique: true })
  email: string;

  @prop({ minlength: 6 })
  password: string;

  comparePassword(passwordText: string): Promise<boolean> {
    return compare(passwordText, this.password);
  }
}
