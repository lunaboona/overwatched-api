import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { Season } from './schemas/season.schema';

@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Post()
  create(@Body() input: Season) {
    return this.seasonsService.create(input);
  }

  @Get()
  findAll(@Query('series') seriesId: string) {
    return this.seasonsService.findAll(seriesId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seasonsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: Season) {
    return this.seasonsService.update(id, input);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seasonsService.remove(id);
  }
}
