import { StorageFileService } from '@/storage-file/storage-file.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, LessThanOrEqual, Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import {
  Filters,
  PropertyOrder,
  QueryFilterPropertyDto,
} from './dto/query-filter.property';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyFeature } from './entities/property-feature.entity';
import { Property } from './entities/property.entity';
import { PropertyPurpose } from './enum/property.enum';
import { FloorPlanService } from './floor-plan/floor-plan.service';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(PropertyFeature)
    private readonly propertyFeatureRepository: Repository<PropertyFeature>,
    private readonly storageFileService: StorageFileService,
    private readonly floorPlanService: FloorPlanService,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    try {
      const {
        features,
        propertyImages = [],
        floorPlans = [],
        rentCriteria,
        ...allFields
      } = createPropertyDto;

      let property = Object.assign(new Property(), allFields) as Property;
      property.slug = property.name.toLocaleLowerCase().split(' ').join('-');

      propertyImages.length > 1 &&
        (property.propertyImages = await this.storageFileService.findByIds(
          propertyImages,
        ));

      property.purpose === PropertyPurpose.RENT &&
        (property = Object.assign(property, { ...rentCriteria }));

      if (floorPlans.length > 0) {
        for await (const plan of floorPlans) {
          const newFloorPlan = await this.floorPlanService.create(plan);
          property.floorPlans = [newFloorPlan];
        }
      }

      const savedProperty = await this.propertyRepository.save(property);

      features.length > 0 &&
        (await this.setPropertyFeature(features, savedProperty));

      return await this.propertyRepository.find({
        relations: ['propertyImages', 'propertyFeatures.feature', 'floorPlans'],
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(query: QueryFilterPropertyDto) {
    try {
      const {
        page = 1,
        perPage = 20,
        order = PropertyOrder.DESC,
        filters = {},
      } = query;

      const queryFilters = this.customFilter(filters);

      const [results, total] = await this.propertyRepository.findAndCount({
        relations: [
          'propertyType',
          'city',
          'propertyImages',
          'propertyFeatures.feature',
          'floorPlans',
        ],
        where: {
          ...queryFilters,
        },
        take: Number(perPage),
        skip: (Number(page) - 1) * Number(perPage),
        order: {
          created_at: order,
        },
      });

      return {
        success: true,
        data: results,
        meta: {
          all_total: total,
          total: results.length,
          per_page: Number(perPage),
          page: Number(page),
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findOne(id: number) {
    return this.propertyRepository.findOneBy({ id: id });
  }

  update(id: number, updatePropertyDto: UpdatePropertyDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }

  async setPropertyFeature(features: number[], savedProperty: Property) {
    for await (const featureId of features) {
      const propertyFeatureInit = this.propertyFeatureRepository.create({
        featureId: featureId,
        propertyId: savedProperty.id,
      });
      await this.propertyFeatureRepository.save(propertyFeatureInit);
    }
  }

  removeFalsy(filters: Filters) {
    return Object.entries(filters).reduce(
      (a, [k, v]) => (v ? ((a[k] = v), a) : a),
      {} as Filters,
    );
  }

  customFilter(
    filters: Filters,
  ): FindOptionsWhere<Property>[] | FindOptionsWhere<Property> {
    const removeFalsy = this.removeFalsy(filters);

    let newFilters: FindOptionsWhere<Property>[] | FindOptionsWhere<Property> =
      {};

    if (Object.keys(removeFalsy).length > 0) {
      removeFalsy.purpose &&
        (newFilters = { ...newFilters, purpose: removeFalsy.purpose });

      removeFalsy.noOfBedRoom &&
        (newFilters = {
          ...newFilters,
          noOfBedRoom: removeFalsy.noOfBedRoom,
        });

      removeFalsy.price &&
        (newFilters = {
          ...newFilters,
          price: LessThanOrEqual(removeFalsy.price),
        });

      removeFalsy.propertyType &&
        (newFilters = {
          ...newFilters,
          propertyType: {
            alias: removeFalsy.propertyType,
          },
        });

      removeFalsy.cityId &&
        (newFilters = {
          ...newFilters,
          city: {
            id: removeFalsy.cityId,
          },
        });

      removeFalsy.propertyFeatures &&
        (newFilters = {
          ...newFilters,
          propertyFeatures: {
            featureId: In([
              ...removeFalsy.propertyFeatures?.split(',').map(Number),
            ]),
          },
        });
    }

    return newFilters;
  }
}
