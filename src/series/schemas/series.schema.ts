import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SeriesDocument = Series & Document;

@Schema()
export class Series {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  coverUrl: string;

  @Prop()
  releaseYear: string;

  @Prop()
  endingYear: string;

  @Prop([String])
  genres: string[];

  @Prop()
  score: number;
}

export const SeriesSchema = SchemaFactory.createForClass(Series);
