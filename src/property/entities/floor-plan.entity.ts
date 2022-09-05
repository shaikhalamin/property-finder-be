import { BaseEntity } from '@/common/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Property } from './property.entity';

@Entity('floor_plans')
export class FloorPlan extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'tinyint' })
  noOfBathRoom: number;

  @Column({ nullable: false, type: 'tinyint' })
  propertySize: number;

  @Column({ nullable: false, type: 'tinyint' })
  noOfBedRoom: number;

  @ManyToOne(() => Property, (property) => property.floorPlans)
  @JoinColumn()
  property: Property;
}
