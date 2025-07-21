import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }

  async register(email: string, password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      throw new ConflictException('Passwords do not match');
    }
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException(
        'An account with this email already exist, try signing in instead',
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUserInfo = { email, hashedPassword };
    const user = await this.usersService.createNewUser(newUserInfo);

    return { message: 'User was created successfully', userId: user._id };
  }
}
