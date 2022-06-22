import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EpisodeDto } from './dto/episode.dto';
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

  async findAll(seasonId: string, userId: string): Promise<EpisodeDto[]> {
    const result = await this.episodeModel.find({ season: seasonId }).sort({ number: 1 }).exec();
    return result.map(ep => <EpisodeDto>{
      _id: ep._id.toString(),
      name: ep.name,
      number: ep.number,
      duration: ep.duration,
      season: ep.season.toString(),
      watched: (ep.watchedBy as unknown as string[]).includes(userId)
    });
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
    return this.episodeModel.findByIdAndUpdate(id, { $push: { watchedBy: userId } }, { new: true, useFindAndModify: false });
  }

  async removeWatched(id: string, userId: string) {
    return this.episodeModel.findByIdAndUpdate(id, { $pull: { watchedBy: userId } }, { new: true, useFindAndModify: false });
  }
}
