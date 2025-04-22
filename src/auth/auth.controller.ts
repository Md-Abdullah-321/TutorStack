import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async singup(@Body() body) {
    return this.authService.register(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Body() body) {
    return this.authService.login(body);
  }
}
