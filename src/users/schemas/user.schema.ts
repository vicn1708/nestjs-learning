import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop()
  ur_name: string;

  @Prop()
  ur_email: string;

  @Prop()
  ur_pass: string;

  @Prop()
  ur_role: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
