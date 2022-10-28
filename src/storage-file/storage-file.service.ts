import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateStorageFileDto } from './dto/create-storage-file.dto';
import { UpdateStorageFileDto } from './dto/update-storage-file.dto';
import { StorageFile } from './entities/storage-file.entity';
import { cloudinaryUpload } from '@/common/util/cloudniary';
@Injectable()
export class StorageFileService {
  constructor(
    @InjectRepository(StorageFile)
    private readonly storageFileRepository: Repository<StorageFile>,
  ) {}

  async create(createDto: CreateStorageFileDto, file: Express.Multer.File) {
    try {
      const storageFile = this.storageFileRepository.create({
        ...createDto,
        fileName: file.filename,
      });

      const fileUpload = await cloudinaryUpload(file.path, createDto.type);
      storageFile.image_url = fileUpload.secure_url;

      return await this.storageFileRepository.save(storageFile);
    } catch (error) {
      Logger.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.storageFileRepository.find({});
  }

  async findOne(id: number) {
    return await this.storageFileRepository.findOneBy({ id: id });
  }

  async findByIds(ids: number[]) {
    try {
      return await this.storageFileRepository.find({
        where: { id: In([...ids]) },
      });
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
