import { Module } from '@nestjs/common';
import { StorageFileService } from './storage-file.service';
import { StorageFileController } from './storage-file.controller';

@Module({
  controllers: [StorageFileController],
  providers: [StorageFileService]
})
export class StorageFileModule {}
