import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(): string {
    return `Backend is running on port ${process.env.PORT}`;
  }
}
