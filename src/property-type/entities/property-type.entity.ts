import { BaseEntity } from '@/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('property_types')
export class PropertyType extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  slug: string;
}
