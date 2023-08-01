import { BaseEntity } from 'src/common/base';
import { User } from './user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum VerificationAction {
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
}

@Entity()
export class Verification extends BaseEntity {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  user_id: string;

  @Column()
  code: string;

  @Column()
  action: VerificationAction;

  @Column({ default: true })
  is_active: boolean;
}
