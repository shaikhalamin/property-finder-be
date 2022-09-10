import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Feature } from './feature.entity';
import { FloorPlan } from './floor-plan.entity';
import { Agent } from '@/agent/entities/agent.entity';
import { City } from '@/city/entities/city.entity';
import { BaseEntity } from '@/common/entity/base.entity';
import { PropertyType } from '@/property-type/entities/property-type.entity';
import { StorageFile } from '@/storage-file/entities/storage-file.entity';

@Entity('properties')
export class Property extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  slug: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  purpose: string;

  @Column({ nullable: false, type: 'text' })
  descriptions: string;

  @Column({ nullable: false, type: 'text' })
  address: string;

  @Column({ nullable: false, type: 'double' })
  price: number;

  @Column({ nullable: false, type: 'tinyint' })
  noOfBedRoom: number;

  @Column({ nullable: false, type: 'tinyint' })
  noOfBathRoom: number;

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

  @Column({ nullable: true, type: 'varchar' })
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

  @ManyToOne(() => PropertyType, (propertyType) => propertyType.properties)
  @JoinColumn()
  propertyType: PropertyType;

  @ManyToOne(() => City, (city) => city.properties)
  @JoinColumn()
  city: City;

  @ManyToMany(() => Feature, (feature) => feature.properties)
  features: Feature[];

  @OneToMany(() => FloorPlan, (floorPlan) => floorPlan.property)
  floorPlans: FloorPlan[];

  @ManyToMany(() => Agent, (agent) => agent.properties)
  @JoinColumn()
  agent: Agent;

  @Column({ nullable: true, type: 'varchar' })
  headerImage: string;

  // by setting type [header and feature] we can get header and feature images of any property
  @OneToMany(() => StorageFile, (storageFile) => storageFile.property)
  propertyImages: StorageFile[];

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
