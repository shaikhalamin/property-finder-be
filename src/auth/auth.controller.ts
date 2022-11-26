import { RequestUser } from '@/common/type/req-user';
import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtRefreshAuthGuard } from './guard/jwt-refresh-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('/refresh')
  @UseGuards(JwtRefreshAuthGuard)
  refresh(@Req() req: Request) {
    const userToken = req.user as RequestUser;

    return this.authService.refreshTokens(userToken);
  }
}
