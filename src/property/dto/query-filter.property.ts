import { Exclude, Expose, Transform } from 'class-transformer';
import { IsOptional, IsNotEmpty } from 'class-validator';

export enum PropertyOrder {
  ASC = 'ASC',
  DESC = 'DESC',
  ONE = 1,
  NEGONE = -1,
}

// @Exclude()
// export class Filters {
//     @Expose()
//     @IsOptional()
//     @IsNotEmpty()
//     @Transform(({ value }) => Number(value))
//     jobLocation?: number;

//     @Expose()
//     @IsOptional()
//     @IsNotEmpty()
//     @Transform(({ value }) => Number(value))
//     jobIndustry?: number;

//     @Expose()
//     @IsOptional()
//     @IsNotEmpty()
//     @Transform(({ value }) => Number(value))
//     company?: number;

//     @Expose()
//     @IsOptional()
//     @IsNotEmpty()
//     @Transform(({ value }) => Number(value))
//     employmentType?: number;

//     @Expose()
//     @IsOptional()
//     @IsNotEmpty()
//     @Transform(({ value }) => Number(value))
//     jobLevel?: number;

// }

@Exclude()
export class QueryFilterPropertyDto {
  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => (value == undefined || !value ? 1 : Number(value)))
  page: number;

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (value > 500) {
      return 500;
    }
    return Number(value == undefined || !value ? 20 : value);
  })
  perPage: number;

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  order: PropertyOrder;

  @IsOptional()
  @IsNotEmpty()
  filters: any;
}
