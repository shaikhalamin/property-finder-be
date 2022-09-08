import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-feature.dto';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {}
