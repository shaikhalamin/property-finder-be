import { BaseEntity } from '@/common/entity/base.entity';
import { User } from '@/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('agents')
export class Agent extends BaseEntity {
  @Column({ nullable: true })
  designation: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  fb_link: string;

  @Column({ nullable: true })
  instagram_link: string;

  @Column({ nullable: true })
  twitter_link: string;

  @Column({ nullable: true })
  linkedin_link: string;

  @OneToOne(() => User, (user) => user.agent)
  @JoinColumn()
  user: User;
}
