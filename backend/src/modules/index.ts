import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserController, UserService } from './user';

import { Event } from 'src/entities/event.entity';
import { MusicArtist } from 'src/entities/music-artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Event, MusicArtist])],
  controllers: [UserController],
  providers: [UserService],
})
export class AllModule {}
