import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtRefreshAuthGuard } from './guard/jwt-refresh-auth.guard';

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
    console.log(req.user);
    return this.authService.refreshTokens('sds', 'rere');
  }
}
