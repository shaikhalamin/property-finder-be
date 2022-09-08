import { Injectable } from '@nestjs/common';
import { CreateFeatureDto } from '../dto/feature/create-feature.dto';
import { UpdateFeatureDto } from '../dto/feature/update-feature.dto';

@Injectable()
export class FeatureService {
  create(createFeatureDto: CreateFeatureDto) {
    return 'This action adds a new property';
  }

  findAll() {
    return `This action returns all property`;
  }

  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  update(id: number, updateFeatureDto: UpdateFeatureDto) {
    return `This action updates a #${id} property`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
