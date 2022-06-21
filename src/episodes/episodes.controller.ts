import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ToggleWatchedDto } from './dto/toggle-watched.dto';
import { EpisodesService } from './episodes.service';
import { Episode } from './schemas/episode.schema';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Post()
  create(@Body() input: Episode) {
    return this.episodesService.create(input);
  }

  @Get()
  findAll(@Query('season') seasonId: string) {
    return this.episodesService.findAll(seasonId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: Episode) {
    return this.episodesService.update(id, input);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.episodesService.remove(id);
  }

  @Patch(':id/watched')
  addWatched(@Param('id') id: string, @Body() input: ToggleWatchedDto) {
    return this.episodesService.addWatched(id, input.userId);
  }

  @Patch(':id/remove-watched')
  removeWatched(@Param('id') id: string, @Body() input: ToggleWatchedDto) {
    return this.episodesService.removeWatched(id, input.userId);
  }
}
