import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { disconnect, Model } from 'mongoose';
import { User } from 'src/database/schemas/user.schema';
import { UsersService } from '../users.service';

const mockUser = {
  _id: 'userId123',
  email: 'test@example.com',
  password: 'hashedpassword',
};

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            findById: jest.fn(),
            exec: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            prototype: {
              save: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  describe('findByEmail', () => {
    it('should return a user if found', async () => {
      (model.findOne as jest.Mock).mockReturnValue({
        exec: () => Promise.resolve(mockUser),
      });

      const result = await service.findByEmail('test@example.com');
      expect(result).toEqual(mockUser);
      expect(model.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    });

    it('should return null if user not found', async () => {
      (model.findOne as jest.Mock).mockReturnValue({
        exec: () => Promise.resolve(null),
      });

      const result = await service.findByEmail('notfound@example.com');
      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      (model.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.createNewUser({
        email: 'test@example.com',
        hashedPassword: 'hashedpassword',
      });

      expect(result).toEqual(mockUser);
      expect(model.create).toHaveBeenCalledWith({
        email: 'test@example.com',
        hashedPassword: 'hashedpassword',
      });
    });
  });

  afterAll(async () => {
    await disconnect();
  });
});
