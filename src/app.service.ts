import { Injectable } from '@nestjs/common';
import { PropertyTypeService } from './property-type/property-type.service';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly propertyTypeService: PropertyTypeService,
    private readonly configService: ConfigService,
  ) {}

  async getHello() {
    const [property, frontend] = await Promise.all([
      this.getProperty(),
      this.callFrontend(),
    ]);
    return {
      property,
      frontend: frontend?.data?.status,
    };
  }

  async getProperty() {
    return await this.propertyTypeService.findAll();
  }

  async callFrontend() {
    return await axios.get(this.configService.get('FRONTEND_BASE_URL'));
  }
}
