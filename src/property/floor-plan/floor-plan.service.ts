import { StorageFile } from '@/storage-file/entities/storage-file.entity';
import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { FloorPlan } from '../entities/floor-plan.entity';
import { CreateFloorPlanDto } from './dto/create-floor-plan.dto';
import { UpdateFloorPlanDto } from './dto/update-floor-plan.dto';

@Injectable()
export class FloorPlanService {
  constructor(
    @InjectRepository(FloorPlan)
    private readonly floorPlanRepository: Repository<FloorPlan>,
    @InjectRepository(StorageFile)
    private readonly storageFileRepository: Repository<StorageFile>,
  ) {}

  async create(createFloorPlanDto: CreateFloorPlanDto) {
    try {
      const { floorPlanImages, ...allFields } = createFloorPlanDto;
      const floorPlan = Object.assign(new FloorPlan(), allFields) as FloorPlan;
      floorPlan.floorPlanImages = await this.storageFileRepository.findBy({
        id: In([...floorPlanImages]),
      });

      return await this.floorPlanRepository.save(floorPlan);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return `This action returns all floorPlan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} floorPlan`;
  }

  update(id: number, updateFloorPlanDto: UpdateFloorPlanDto) {
    return `This action updates a #${id} floorPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} floorPlan`;
  }
}
