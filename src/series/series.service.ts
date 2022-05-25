import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { Series, SeriesDocument } from './schemas/series.schema';

@Injectable()
export class SeriesService {
  constructor(
    @InjectModel(Series.name) private seriesModel: Model<SeriesDocument>,
  ) {}

  async create(createSeriesDto: CreateSeriesDto): Promise<Series> {
    const createdSeries = new this.seriesModel(createSeriesDto);
    return createdSeries.save();
  }

  async findAll(): Promise<Series[]> {
    return this.seriesModel.find().exec();
  }

  async findOne(id: string): Promise<Series> {
    return this.seriesModel.findById(id).exec();
  }

  async update(id: string, updateSeriesDto: UpdateSeriesDto) {
    // TODO return updated document instead of current one
    return this.seriesModel.findByIdAndUpdate(id, updateSeriesDto);
  }

  async remove(id: string) {
    // TODO dont return document
    return this.seriesModel.findByIdAndRemove(id);
  }
}
