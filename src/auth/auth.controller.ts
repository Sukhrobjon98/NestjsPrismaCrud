import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from 'src/users/dto/create.user.dto';
import { UserLoginDto } from './dto/user.login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: createUserDto) {
    return this.authService.register(userData);
  }

  @Post('login')
  async login(@Body() userData: UserLoginDto) {
    return this.authService.login(userData);
  }
}
