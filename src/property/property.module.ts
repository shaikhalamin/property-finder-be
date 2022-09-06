import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Feature } from './entities/feature.entity';
import { FloorPlan } from './entities/floor-plan.entity';
import { PropertyFeatureImage } from './entities/property-feature-images.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Property,
      Feature,
      FloorPlan,
      PropertyFeatureImage,
    ]),
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
