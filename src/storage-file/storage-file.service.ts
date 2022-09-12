import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateStorageFileDto } from './dto/create-storage-file.dto';
import { UpdateStorageFileDto } from './dto/update-storage-file.dto';
import { StorageFile } from './entities/storage-file.entity';

@Injectable()
export class StorageFileService {
  constructor(
    @InjectRepository(StorageFile)
    private readonly storageFileRepository: Repository<StorageFile>,
  ) {}

  async create(createDto: CreateStorageFileDto, fileName: string) {
    try {
      const storageFile = this.storageFileRepository.create({
        ...createDto,
        fileName,
      });
      return await this.storageFileRepository.save(storageFile);
    } catch (error) {
      Logger.log(error);
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return `This action returns all storageFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storageFile`;
  }

  async findByIds(ids: number[]) {
    try {
      return await this.storageFileRepository.findBy({ id: In([...ids]) });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  update(id: number, updateStorageFileDto: UpdateStorageFileDto) {
    return `This action updates a #${id} storageFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} storageFile`;
  }
}
