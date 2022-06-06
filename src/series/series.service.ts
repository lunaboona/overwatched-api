import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Series, SeriesDocument } from './schemas/series.schema';

@Injectable()
export class SeriesService {
  constructor(
    @InjectModel(Series.name) private seriesModel: Model<SeriesDocument>,
  ) {}

  async create(input: Series): Promise<Series> {
    const createdSeries = new this.seriesModel(input);
    return createdSeries.save();
  }

  async findAll(): Promise<Series[]> {
    return this.seriesModel.find().populate('seasons').exec();
  }

  async findOne(id: string): Promise<Series> {
    return this.seriesModel.findById(id).populate('seasons').exec();
  }

  async update(id: string, input: Series) {
    return this.seriesModel.findByIdAndUpdate(id, input);
  }

  async remove(id: string) {
    return this.seriesModel.findByIdAndRemove(id);
  }
}
