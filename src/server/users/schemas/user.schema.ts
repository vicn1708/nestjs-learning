import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/server/auth/enums/role.enum';

export type UserDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop()
  userName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: Role.User;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
