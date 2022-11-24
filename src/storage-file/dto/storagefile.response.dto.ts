import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class StorageFileResponseDto {
  @Expose()
  id: number;

  @Expose()
  fileName: string;

  @Expose()
  type: string;

  @Expose()
  size: string;

  @Expose()
  public_id: string;

  @Expose()
  image_url: string;
}
