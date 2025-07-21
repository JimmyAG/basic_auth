import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { disconnect } from 'mongoose';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  beforeEach(() => {
    usersService = {
      findByEmail: jest.fn(),
      createNewUser: jest.fn(),
    };

    jwtService = {
      signAsync: jest.fn().mockResolvedValue('mockToken'),
    };

    authService = new AuthService(
      usersService as UsersService,
      jwtService as JwtService,
    );
  });

  it('should login a user with correct credentials', async () => {
    const user = {
      _id: '123',
      email: 'test@email.com',
      hashedPassword: await bcrypt.hash('password', 10),
    };

    (usersService.findByEmail as jest.Mock).mockResolvedValue(user);

    const result = await authService.login(user.email, 'password');
    expect(result).toEqual({ access_token: 'mockToken' });
  });

  it('should throw on wrong password', async () => {
    const user = {
      email: 'test@email.com',
      hashedPassword: await bcrypt.hash('password', 10),
    };

    (usersService.findByEmail as jest.Mock).mockResolvedValue(user);

    await expect(
      authService.login(user.email, 'wrong#password'),
    ).rejects.toThrow(UnauthorizedException);
  });

  afterAll(async () => {
    await disconnect();
  });
});
