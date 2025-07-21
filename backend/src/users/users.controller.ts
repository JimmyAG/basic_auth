import { Controller, Get, Logger, Req, UseGuards } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { JWTAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Get('/me')
  async getMe(@Req() req: Request) {
    try {
      const reqUser = (req as any).user;
      const user = await this.usersService.findByEmail(reqUser.email);

      return plainToClass(UserResponseDto, user, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      Logger.log(JSON.stringify(error));
      throw new Error(JSON.stringify(error));
    }
  }
}
