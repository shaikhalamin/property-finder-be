import { User } from '@/user/entities/user.entity';
import { UserService } from '@/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{
    access_token: string;
    refresh_token: string;
    user: User;
    expires_at: number;
  }> {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    const payload = {
      userId: user.id,
    };
    return {
      access_token: this.getAccessToken(payload),
      refresh_token: this.getRefreshToken(payload),
      user: user,
      expires_at: Date.now() + ms('5m'),
    };
  }

  private async validateUser(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.userService.findByUserName(username);
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException('Invalid username or password !');
    }
    delete user.password;
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userService.findOne(id);
    delete user.password;
    return user;
  }

  getAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: 'accessTokenSecret',
      expiresIn: '5m',
    });
  }

  getRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: 'refreshTokenSecret',
      expiresIn: '30d',
    });
  }
}
