import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/base';

import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { MusicArtist } from './music-artist.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @Column({ default: true })
  is_verified: boolean;

  // hashed
  @Exclude()
  @Column({ select: false, nullable: true })
  password: string;

  @ApiProperty()
  @Column({ default: '' })
  email: string;

  @ApiProperty()
  @Column({ default: '' })
  first_name: string;

  @ApiProperty()
  @Column({ default: '' })
  last_name: string;

  @ApiProperty()
  @Column({ default: '' })
  username: string;

  @ApiProperty()
  @Column({ nullable: true })
  instagram?: string;

  @ApiProperty()
  @Column({ nullable: true })
  facebook?: string;

  @ApiProperty()
  @Column({ nullable: true })
  spotify?: string;

  @ApiProperty()
  @ManyToMany(() => MusicArtist, { eager: true }) // Set eager to true to automatically fetch musicPreferences when loading users
  @JoinTable()
  music_preferences: MusicArtist[];
}
