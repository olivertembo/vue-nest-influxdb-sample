// music-preference.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class MusicPreferenceDTO {
  @ApiProperty()
  selected_artists: string[]; // An array of artist IDs representing the selected preferences

  @ApiProperty()
  social_media: {
    instagram: string;
    facebook: string;
    spotify: string;
  };
}
