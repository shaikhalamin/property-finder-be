import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateFloorPlanDto } from './floor-plan/create-floor-plan.dto';
export class CreatePropertyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  purpose: string;

  @IsNotEmpty()
  descriptions: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  noOfBedRoom: number;

  @IsNotEmpty()
  noOfBathRoom: number;

  @IsNotEmpty()
  propertySize: number;

  @IsNotEmpty()
  yearBuild: number;

  @IsNotEmpty()
  totalFloors: number;

  @IsNotEmpty()
  accommodations: string;

  @IsNotEmpty()
  ceilingHeight: number;

  @IsNotEmpty()
  distanceFromCenter: number;

  @IsNotEmpty()
  parking: string;

  @IsNotEmpty()
  areaSize: number;

  @IsNotEmpty()
  garage: boolean;

  @IsNotEmpty()
  garageSize: number;

  @IsOptional()
  @IsNotEmpty()
  additionalSpec: string;

  @IsNotEmpty()
  utilityCost: number;

  @IsNotEmpty()
  cableTvCost: number;

  @IsNotEmpty()
  electricityCost: string;

  @IsNotEmpty()
  lat: number;

  @IsNotEmpty()
  long: number;

  @IsNotEmpty()
  videoTourLink: string;

  @IsNotEmpty()
  propertyType: number;

  @IsNotEmpty()
  city: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  features: number[];

  @IsOptional()
  @IsNotEmpty()
  floorPlans: CreateFloorPlanDto[];

  @IsNotEmpty()
  agent: number;

  @IsNotEmpty()
  propertyImages: number[];

  @IsNotEmpty()
  deposit: number;

  @IsNotEmpty()
  petAllowed: boolean;

  @IsNotEmpty()
  paymentPeriod: string;

  @IsNotEmpty()
  habitable: string;

  @IsNotEmpty()
  minimumStayDuration: number;
}
