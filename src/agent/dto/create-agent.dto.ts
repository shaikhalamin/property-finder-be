import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAgentDto {
  @IsOptional()
  @IsNotEmpty()
  designation: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  fb_link: string;

  @IsOptional()
  @IsNotEmpty()
  instagram_link: string;

  @IsOptional()
  @IsNotEmpty()
  twitter_link: string;

  @IsOptional()
  @IsNotEmpty()
  linkedin_link: string;

  @IsOptional()
  @IsNotEmpty()
  agentImage: number;
}
