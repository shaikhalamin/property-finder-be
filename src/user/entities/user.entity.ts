import { BeforeInsert, Column, Entity, Index, OneToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from '@/common/entity/base.entity';
import { Agent } from '@/agent/entities/agent.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ nullable: false, length: 100 })
  firstName: string;

  @Column({ nullable: false, length: 100 })
  lastName: string;

  @Column({ nullable: false, length: 100 })
  @Index('usersUniqueName', { unique: true })
  username: string;

  @Column({ nullable: false, length: 255 })
  @Index('usersUniqueEmail', { unique: true })
  email: string;

  @Column({ nullable: false, length: 100 })
  phone: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true, default: 'user' })
  role: string;

  @OneToOne(() => Agent, (agent) => agent.user)
  agent: Agent;

  @BeforeInsert()
  async hashPassword() {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
