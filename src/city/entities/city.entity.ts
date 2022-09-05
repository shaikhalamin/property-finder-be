import { BaseEntity } from '@/common/entity/base.entity';
import { Property } from 'src/property/entities/property.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('cities')
export class City extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  slug: string;

  @OneToMany(() => Property, (property) => property.city)
  properties: Property[];
}
