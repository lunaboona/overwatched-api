import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Request } from '@nestjs/common';
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
  findAll(@Query('season') seasonId: string, @Request() req: any) {
    return this.episodesService.findAll(seasonId, req.user.userId);
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
  addWatched(@Param('id') id: string, @Request() req: any) {
    return this.episodesService.addWatched(id, req.user.userId);
  }

  @Patch(':id/remove-watched')
  removeWatched(@Param('id') id: string, @Request() req: any) {
    return this.episodesService.removeWatched(id, req.user.userId);
  }
}
