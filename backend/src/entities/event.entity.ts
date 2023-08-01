import { BaseEntity } from 'src/common/base';
import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

export enum EventStatus {
  draft = 'draft',
  live = 'live',
}

@Entity()
export class Event extends BaseEntity {
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @ApiProperty()
  @Column()
  name: string;

  @IsEnum(EventStatus)
  @ApiProperty({
    enum: EventStatus,
  })
  @Column({ default: EventStatus.draft })
  status: EventStatus;
}
