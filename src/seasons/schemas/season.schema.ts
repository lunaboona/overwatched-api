import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type SeasonDocument = Season & Document;

@Schema()
export class Season {
  @Prop()
  name: string;

  @Prop()
  number: number;

  @Prop({ type: Types.ObjectId, ref: 'Series' })
  series: ObjectId;
}

export const SeasonSchema = SchemaFactory.createForClass(Season);
