import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ImgDocument = HydratedDocument<Imgs>;

@Schema()
export class Imgs {
  @Prop()
  image: string;

  @Prop()
  created_at: Date;
}

export const ImgsSchema = SchemaFactory.createForClass(Imgs);
