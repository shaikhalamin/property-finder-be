import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StorageFileService } from './storage-file.service';
import { CreateStorageFileDto } from './dto/create-storage-file.dto';
import { UpdateStorageFileDto } from './dto/update-storage-file.dto';

@Controller('storage-file')
export class StorageFileController {
  constructor(private readonly storageFileService: StorageFileService) {}

  @Post()
  create(@Body() createStorageFileDto: CreateStorageFileDto) {
    return this.storageFileService.create(createStorageFileDto);
  }

  @Get()
  findAll() {
    return this.storageFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storageFileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStorageFileDto: UpdateStorageFileDto,
  ) {
    return this.storageFileService.update(+id, updateStorageFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storageFileService.remove(+id);
  }
}
