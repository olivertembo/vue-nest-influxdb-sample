import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserController, UserService } from './user';

import { Event } from 'src/entities/event.entity';
import { EventController, EventService } from './event';
import { MusicPreferenceController } from 'src/music-preference/music-preference.controller';
import { MusicPreferenceService } from 'src/music-preference/music-preference.service';
import { MusicArtist } from 'src/entities/music-artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Event, MusicArtist])],
  controllers: [UserController, EventController, MusicPreferenceController],
  providers: [UserService, EventService, MusicPreferenceService],
})
export class AllModule {}
