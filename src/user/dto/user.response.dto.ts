import { AgentResponseDto } from '@/agent/dto/agent.response.dto';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  isActive: boolean;

  @Expose()
  role: string;

  @Expose()
  agent?: AgentResponseDto;
}
