// music-preference.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  Req,
} from '@nestjs/common';
import { MusicPreferenceService } from './music-preference.service';

import { MusicPreferenceDTO } from './dto/music-preference.dto';
import { MusicArtist } from 'src/entities/music-artist.entity';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InRegistrationProgress, Public } from 'src/auth/auth.guard';
import { User } from 'src/entities/user.entity';

@ApiBearerAuth('JWT')
@ApiTags('music-preferences')
@Controller('music_preferences')
export class MusicPreferenceController {
  constructor(
    private readonly musicPreferenceService: MusicPreferenceService,
  ) {}

  @InRegistrationProgress()
  @Get('artists')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: MusicArtist,
    isArray: true,
  })
  async getAllArtists(): Promise<MusicArtist[]> {
    return this.musicPreferenceService.getAllArtists();
  }

  @InRegistrationProgress()
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: User,
  })
  async setUserPreferences(
    @Req() request,
    @Body() musicPreferenceDTO: MusicPreferenceDTO,
  ): Promise<User> {
    const userId = request.user?.id;

    return this.musicPreferenceService.setUserPreferences(
      userId,
      musicPreferenceDTO,
    );
  }
}
