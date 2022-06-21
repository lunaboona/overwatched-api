import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type EpisodeDocument = Episode & Document;

@Schema()
export class Episode {
  @Prop()
  name: string;

  @Prop()
  number: number;

  @Prop()
  duration: number;

  @Prop({ type: Types.ObjectId, ref: 'Season' })
  season: ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'User' }])
  watchedBy: ObjectId;
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);
