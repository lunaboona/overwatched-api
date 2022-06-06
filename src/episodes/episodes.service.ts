import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Episode, EpisodeDocument } from './schemas/episode.schema';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectModel(Episode.name) private episodeModel: Model<EpisodeDocument>,
  ) { }

  async create(input: Episode): Promise<Episode> {
    const createdEpisode = new this.episodeModel(input);
    return createdEpisode.save();
  }

  async findAll(seasonId: string): Promise<Episode[]> {
    // TODO order by number
    return this.episodeModel.find({ season: seasonId }).exec();
  }

  async findOne(id: string): Promise<Episode> {
    return this.episodeModel.findById(id).exec();
  }

  async update(id: string, input: Episode) {
    return this.episodeModel.findByIdAndUpdate(id, input);
  }

  async remove(id: string) {
    return this.episodeModel.findByIdAndRemove(id);
  }
}
