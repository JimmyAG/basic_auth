import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/database/schemas/user.schema';
import { CreateNewUser } from './interfaces/create-new-user';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email }).exec();

    return user;
  }

  async createNewUser(newUserInfo: CreateNewUser) {
    return await this.userModel.create(newUserInfo);
  }
}
