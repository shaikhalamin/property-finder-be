import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropertyTypeDto } from './dto/create-property-type.dto';
import { UpdatePropertyTypeDto } from './dto/update-property-type.dto';
import { PropertyType } from './entities/property-type.entity';

@Injectable()
export class PropertyTypeService {
  constructor(
    @InjectRepository(PropertyType)
    private readonly propertyTypeRepository: Repository<PropertyType>,
  ) {}

  async create(createPropertyTypeDto: CreatePropertyTypeDto) {
    try {
      const propertyType = Object.assign(
        new PropertyType(),
        createPropertyTypeDto,
      ) as PropertyType;
      return await this.propertyTypeRepository.save(propertyType);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.propertyTypeRepository.find({
      relations: ['properties'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} propertyType`;
  }

  update(id: number, updatePropertyTypeDto: UpdatePropertyTypeDto) {
    return `This action updates a #${id} propertyType`;
  }

  remove(id: number) {
    return `This action removes a #${id} propertyType`;
  }
}
