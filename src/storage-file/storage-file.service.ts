import { Injectable } from '@nestjs/common';
import { CreateStorageFileDto } from './dto/create-storage-file.dto';
import { UpdateStorageFileDto } from './dto/update-storage-file.dto';

@Injectable()
export class StorageFileService {
  create(createStorageFileDto: CreateStorageFileDto) {
    return 'This action adds a new storageFile';
  }

  findAll() {
    return `This action returns all storageFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storageFile`;
  }

  update(id: number, updateStorageFileDto: UpdateStorageFileDto) {
    return `This action updates a #${id} storageFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} storageFile`;
  }
}
