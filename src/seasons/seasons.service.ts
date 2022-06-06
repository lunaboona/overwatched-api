import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Season, SeasonDocument } from './schemas/season.schema';

@Injectable()
export class SeasonsService {
  constructor(
    @InjectModel(Season.name) private seasonModel: Model<SeasonDocument>,
  ) {}

  async create(input: Season): Promise<Season> {
    const createdSeason = new this.seasonModel(input);
    return createdSeason.save();
  }

  async findAll(seriesId: string): Promise<Season[]> {
    // TODO order by number
    return this.seasonModel.find({ series: seriesId }).sort({ number: 1 }).exec();
  }

  async findOne(id: string): Promise<Season> {
    return this.seasonModel.findById(id).exec();
  }

  async update(id: string, input: Season) {
    return this.seasonModel.findByIdAndUpdate(id, input);
  }

  async remove(id: string) {
    return this.seasonModel.findByIdAndRemove(id);
  }
}
