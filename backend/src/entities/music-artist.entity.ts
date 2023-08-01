// music-artist.entity.ts
import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/base';

@Entity()
export class MusicArtist extends BaseEntity {
  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @Column()
  genre: string;

  // You can add more properties here, such as bio, albums, etc.
}
