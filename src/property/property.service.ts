import { StorageFileService } from '@/storage-file/storage-file.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Feature } from './entities/feature.entity';
import { PropertyFeature } from './entities/property-feature.entity';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
    @InjectRepository(PropertyFeature)
    private readonly propertyFeatureRepository: Repository<PropertyFeature>,
    private readonly storageFileService: StorageFileService,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    try {
      const {
        features,
        propertyImages,
        floorPlans,
        rentCriteria,
        ...allFields
      } = createPropertyDto;

      let property = Object.assign(new Property(), allFields) as Property;
      property.slug = property.name.toLocaleLowerCase().split(' ').join('-');
      property.propertyImages = await this.storageFileService.findByIds(
        propertyImages,
      );

      if (property.purpose === 'RENT') {
        property = Object.assign(property, { ...rentCriteria });
      }

      const savedProperty = await this.propertyRepository.save(property);
      await this.setPropertyFeature(features, savedProperty);

      return await this.propertyRepository.find({
        relations: ['propertyFeatures.feature'],
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.propertyRepository.find({
      relations: ['propertyFeatures.feature'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
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
}
