import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/base';
import { Column, Entity } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class Admin extends BaseEntity {
  @ApiProperty()
  @Column({ default: false })
  is_verified: boolean;

  // hashed
  @Exclude()
  @Column({ select: false, nullable: true })
  password: string;

  @ApiProperty()
  @Column()
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
}
