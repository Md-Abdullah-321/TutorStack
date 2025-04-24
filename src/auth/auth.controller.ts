import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async singup(@Body() dto: SignUpDto) {
    return this.authService.register(dto);
  }

  @Post('signin')
  async signin(@Body() dto: SignInDto) {
    return this.authService.login(dto);
  }
}
