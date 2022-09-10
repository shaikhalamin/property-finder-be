import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@/common/entity/base.entity';
import { Property } from '@/property/entities/property.entity';
import { FloorPlan } from '@/property/entities/floor-plan.entity';

@Entity('storage_files')
export class StorageFile extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  type: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  folder_path: string;

  @ManyToOne(() => Property, (property) => property.propertyImages)
  @JoinColumn()
  property: Property;

  @ManyToOne(() => FloorPlan, (floorPlan) => floorPlan.floorPlanImages)
  @JoinColumn()
  floorPlan: FloorPlan;
}
