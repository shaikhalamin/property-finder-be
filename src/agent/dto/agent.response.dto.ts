import { StorageFileResponseDto } from '@/storage-file/dto/storagefile.response.dto';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AgentResponseDto {
  @Expose()
  designation: string;
  @Expose()
  description: string;
  @Expose()
  fb_link: string;
  @Expose()
  instagram_link: string;
  @Expose()
  twitter_link: string;
  @Expose()
  linkedin_link: string;
  @Expose()
  agentImage: StorageFileResponseDto;
}
