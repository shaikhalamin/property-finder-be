import { BaseEntity } from '@/common/entity/base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Property } from './property.entity';

@Entity('features')
export class Feature extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  slug: string;

  @ManyToMany(() => Property)
  @JoinTable()
  properties: Property[];
}
