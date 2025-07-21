import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/log-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @Post('/login')
  login(@Body() signInData: SignInDto) {
    return this.authService.login(signInData.email, signInData.password);
  }

  @ApiOperation({ summary: 'User registration' })
  @Post('/signup')
  register(@Body() signUpData: SignUpDto) {
    return this.authService.register(
      signUpData.email,
      signUpData.password,
      signUpData.confirmPassword,
    );
  }
}
