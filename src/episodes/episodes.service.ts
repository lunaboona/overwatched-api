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
    return this.episodeModel.find({ season: seasonId }).sort({ number: 1 }).exec();
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

  async addWatched(id: string, userId: string) {
    return this.episodeModel.findByIdAndUpdate(id, { $push: { watched: userId } }, { new: true, useFindAndModify: false });
  }

  async removeWatched(id: string, userId: string) {
    return this.episodeModel.findByIdAndUpdate(id, { $pull: { watched: userId } }, { new: true, useFindAndModify: false });
  }
}
