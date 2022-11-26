import { StorageFileResponseDto } from '@/storage-file/dto/storagefile.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AgentResponseDto {
  @Expose()
  @ApiProperty({
    default: 'Real State Agent',
  })
  designation: string;

  @Expose()
  @ApiProperty({
    default: 'Neo dthe ort di dor sgd weyerbdm dundjfh ',
  })
  description: string;

  @Expose()
  @ApiProperty({
    default: 'http://fb.com',
  })
  fb_link: string;

  @Expose()
  @ApiProperty({
    default: 'http://instagram.com',
  })
  instagram_link: string;

  @Expose()
  @ApiProperty({
    default: 'http://twitter.com',
  })
  twitter_link: string;

  @Expose()
  @ApiProperty({
    default: 'http://linkedin.com',
  })
  linkedin_link: string;

  @Expose()
  @ApiProperty()
  agentImage: StorageFileResponseDto;
}
