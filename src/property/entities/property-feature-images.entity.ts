import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@/common/entity/base.entity';
import { Property } from './property.entity';

@Entity('property_feature_images')
export class PropertyFeatureImage extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  image_url: string;

  @ManyToOne(() => Property, (property) => property.propertyFeatureImages)
  @JoinColumn()
  property: Property;
}
