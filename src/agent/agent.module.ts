import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from './entities/agent.entity';
import { StorageFileModule } from '@/storage-file/storage-file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Agent]), StorageFileModule],
  controllers: [AgentController],
  providers: [AgentService],
})
export class AgentModule {}
