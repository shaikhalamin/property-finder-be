import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isVerified: boolean;

  @IsOptional()
  @IsNotEmpty()
  role: string;
}
