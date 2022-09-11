import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Feature } from './entities/feature.entity';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(Feature)
    private readonly featureRepository: Repository<Feature>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    try {
      const { features, floorPlans, propertyImages, ...allFields } =
        createPropertyDto;

      const property = Object.assign(new Property(), allFields) as Property;
      property.slug = property.name.toLocaleLowerCase().split(' ').join('-');

      const savedProperty = await this.propertyRepository.save(property);

      this.savePropertyFeatures(features, savedProperty);

      return await this.propertyRepository.find({
        relations: ['features'],
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return `This action returns all property`;
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

  async savePropertyFeatures(features: number[], savedProperty: Property) {
    try {
      const featuresByIds = await this.featureRepository.findBy({
        id: In([...features]),
      });

      for await (const feature of featuresByIds) {
        feature.property = [savedProperty];
        await this.featureRepository.save(feature);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
