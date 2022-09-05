import { BaseEntity } from '@/common/entity/base.entity';
import { City } from 'src/city/entities/city.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('properties')
export class Property extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  slug: string;

  @Column({ nullable: false, type: 'text' })
  descriptions: string;

  @Column({ nullable: false, type: 'text' })
  address: string;

  @Column({ nullable: false, type: 'double' })
  price: number;

  @Column({ nullable: false, type: 'tinyint' })
  bedroom: number;

  @Column({ nullable: false, type: 'tinyint' })
  bathroom: number;

  @Column({ nullable: false, type: 'tinyint' })
  propertySize: number;

  @Column({ nullable: false, type: 'tinyint' })
  yearBuild: number;

  @Column({ nullable: false, type: 'tinyint' })
  totalFloors: number;

  @Column({ nullable: false, type: 'varchar' })
  accommodations: string;

  @Column({ nullable: false, type: 'double' })
  ceilingHeight: number;

  @Column({ nullable: false, type: 'double' })
  distanceFromCenter: number;

  @Column({ nullable: false, type: 'varchar' })
  parking: string;

  @Column({ nullable: false, type: 'double' })
  areaSize: number;

  @Column({ nullable: false, type: 'boolean' })
  garage: boolean;

  @Column({ nullable: true, type: 'double' })
  garageSize: number;

  @Column({ nullable: false, type: 'varchar' })
  additionalSpec: string;

  @Column({ nullable: false, type: 'tinyint' })
  utilityCost: number;

  @Column({ nullable: false, type: 'tinyint' })
  cableTvCost: number;

  @Column({ nullable: false, type: 'varchar' })
  electricityCost: string;

  @Column({ nullable: true, type: 'double' })
  lat: number;

  @Column({ nullable: true, type: 'double' })
  long: number;

  @Column({ nullable: true, type: 'varchar' })
  videoTourLink: string;

  @ManyToOne(() => City, (city) => city.properties)
  @JoinColumn()
  city: City;

  //   @Column({ nullable: true })
  //   feature: Feature[];

  //   @Column({ nullable: true })
  //   floorPlan: FloorPlan[];

  //   @Column({ nullable: true })
  //   agent: Agent;

  //   @Column({ nullable: true })
  //   headerImages: HeaderImages[];

  //   @Column({ nullable: true })
  //   featureImages: FeatureImages[];

  @Column({ nullable: false, type: 'varchar', length: 50 })
  purpose: string;

  @Column({ nullable: true, type: 'double' })
  deposit: number;

  @Column({ nullable: true, type: 'boolean' })
  petAllowed: boolean;

  @Column({ nullable: true, type: 'varchar', length: 100 })
  paymentPeriod: string;

  @Column({ nullable: true, type: 'varchar', length: 100 })
  habitable: string;

  @Column({ nullable: true, type: 'tinyint' })
  minimumStayDuration: number;
}
