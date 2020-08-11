import { prop, pre, plugin, Ref, modelOptions } from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';
import * as uniqueValidator from 'mongoose-unique-validator';
import { compare } from 'bcryptjs';
import { USER_GENDER } from './users.type';
import { Role } from 'src/role/role.model';

@plugin(uniqueValidator, { message: '{VALUE} already taken' })
@pre<User>('save', function() {
  this.password = hashSync(this.password);
})
@pre<User>(/^find/, function() {
  this.populate('role');
})
@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class User {
  @prop({ required: true })
  name: string;

  @prop({ unique: true })
  username: string;

  @prop({ unique: true })
  email: string;

  @prop({ minlength: 6 })
  password: string;

  // @prop({ enum: USER_GENDER })
  // gender: USER_GENDER;

  @prop({ ref: Role })
  role: Ref<Role>;

  comparePassword(passwordText: string): Promise<boolean> {
    return compare(passwordText, this.password);
  }
}
