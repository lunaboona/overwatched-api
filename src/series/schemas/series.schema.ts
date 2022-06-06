import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Season } from 'src/seasons/schemas/season.schema';

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

  @Prop([{ type: Types.ObjectId, ref: 'Season' }])
  seasons: Season[];
}

export const SeriesSchema = SchemaFactory.createForClass(Series);
