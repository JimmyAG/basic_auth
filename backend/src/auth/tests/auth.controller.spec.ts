import { disconnect } from 'mongoose';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: Partial<AuthService>;

  beforeEach(() => {
    authService = {
      login: jest.fn().mockResolvedValue({ access_token: 'mockToken' }),
      register: jest.fn(),
    };

    controller = new AuthController(authService as AuthService);
  });

  it('should call authService.login', async () => {
    const result = await controller.login({
      email: 'test@email.com',
      password: '123',
    });
    expect(result).toEqual({ access_token: 'mockToken' });
  });

  it('should call authService.register', async () => {
    await controller.register({
      email: 't@e.com',
      password: '123',
      confirmPassword: '123',
    });

    expect(authService.register).toHaveBeenCalledWith('t@e.com', '123', '123');
  });

  afterAll(async () => {
    await disconnect();
  });
});
