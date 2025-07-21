import { registerAs } from '@nestjs/config';

interface AuthConfigType {
  secret: string;
  expiresIn: string;
}

const AuthConfig: AuthConfigType = {
  secret: process.env.AUTH_SECRET!,
  expiresIn: process.env.TOKEN_EXPIRES_IN || '10d',
};

export default registerAs('auth', () => AuthConfig);
