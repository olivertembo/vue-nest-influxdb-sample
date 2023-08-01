// music-preference.service.ts
import { Injectable } from '@nestjs/common';

import { MusicPreferenceDTO } from './dto/music-preference.dto';

import { MusicArtist } from 'src/entities/music-artist.entity';

import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MusicPreferenceService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(MusicArtist)
    private readonly musicArtistRepository: Repository<MusicArtist>,
  ) {}

  async getAllArtists(): Promise<MusicArtist[]> {
    return this.musicArtistRepository.find();
  }

  async setUserPreferences(
    userId: number,
    musicPreferenceDTO: MusicPreferenceDTO,
  ): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    const selectedArtistIds = musicPreferenceDTO.selected_artists;
    const socialMedia = musicPreferenceDTO.social_media;
    const selectedArtists = await this.musicArtistRepository.findByIds(
      selectedArtistIds,
    );
    user.music_preferences = selectedArtists;
    if (socialMedia) {
      if (socialMedia.spotify) {
        user.spotify = socialMedia.spotify;
      }

      if (socialMedia.instagram) {
        user.instagram = socialMedia.instagram;
      }

      if (socialMedia.facebook) {
        user.facebook = socialMedia.facebook;
      }
    }
    return await this.userRepository.save(user);
  }
}
