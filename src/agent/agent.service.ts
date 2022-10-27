import { ExpressRequestUser } from '@/common/type/ExpressRequestUser';
import { StorageFileService } from '@/storage-file/storage-file.service';
import { UserService } from '@/user/user.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Agent } from './entities/agent.entity';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
    private readonly storageFileService: StorageFileService,
    private readonly userService: UserService,
  ) {}

  async create(createAgentDto: CreateAgentDto, user: ExpressRequestUser) {
    try {
      const agentUser = await this.userService.findOne(user.id, 'agent');
      if (agentUser.agent) {
        throw new BadRequestException('Agent info of this user already exists');
      }
      const agent = Object.assign(new Agent(), createAgentDto) as Agent;
      agent.user = agentUser;
      createAgentDto.agentImage &&
        (agent.agentImage = await this.storageFileService.findOne(
          createAgentDto.agentImage,
        ));
      return await this.agentRepository.save(agent);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.agentRepository.find({
      relations: ['user', 'agentImage'],
    });
  }

  async findOne(id: number) {
    try {
      return await this.agentRepository.findOneOrFail({
        relations: ['user', 'properties', 'agentImage'],
        where: {
          id,
        },
      });
    } catch (error) {
      throw new NotFoundException('Agent not found');
    }
  }

  async update(id: number, updateAgentDto: UpdateAgentDto) {
    try {
      let agent = await this.findOne(id);
      if (!agent) {
        throw new NotFoundException('Agent not found !');
      }
      agent = Object.assign(agent, {
        ...updateAgentDto,
      });

      updateAgentDto.agentImage &&
        (agent.agentImage = await this.storageFileService.findOne(
          updateAgentDto.agentImage,
        ));

      return this.agentRepository.save(agent);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} agent`;
  }
}
