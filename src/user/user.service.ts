import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = Object.assign(new User(), createUserDto) as User;
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find({
        relations: ['agent'],
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      return await this.userRepository.findOneBy({ id: id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      let user = await this.findOne(id);
      if (!user) {
        throw new NotFoundException('Agent not found !');
      }
      user = Object.assign(user, {
        ...updateUserDto,
      });
      return this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async insertAll() {
    const userArray = [
      {
        firstName: 'Susan',
        lastName: 'Oneill',
        username: 'susan',
        email: 'susan@gmail.com',
        phone: '+12345668',
        password: '1234',
      },
      {
        firstName: 'Andrew',
        lastName: 'Miller',
        username: 'andrew',
        email: 'andrew@gmail.com',
        phone: '+6838497385',
        password: '6498945',
      },

      {
        firstName: 'Anna',
        lastName: 'Olson',
        username: 'anna',
        email: 'anna@gmail.com',
        phone: '+76205723857',
        password: '6498945',
      },

      {
        firstName: 'Jacob',
        lastName: 'Scrat',
        username: 'jacob',
        email: 'jacob@gmail.com',
        phone: '+6092957284',
        password: '6498945',
      },

      {
        firstName: 'John',
        lastName: 'Borthwick',
        username: 'john',
        email: 'john@gmail.com',
        phone: '+7034950274',
        password: '6498945',
      },

      {
        firstName: 'Mary',
        lastName: 'Scott',
        username: 'mary',
        email: 'mary@gmail.com',
        phone: '+67092467872',
        password: '6498945',
      },

      {
        firstName: 'Sarah',
        lastName: 'Jonson',
        username: 'sarah',
        email: 'sarah@gmail.com',
        phone: '+67092467872',
        password: '6498945',
      },

      {
        firstName: 'Tom',
        lastName: 'Knolltonns',
        username: 'tom',
        email: 'tom@gmail.com',
        phone: '+67092467872',
        password: '6498945',
      },
    ];

    const userCount = await this.userRepository.count({});

    if (!userCount) {
      Logger.log('Running user seeder');
      await this.userRepository.insert(userArray);
    }

    return await this.userRepository.find({});
  }
}
