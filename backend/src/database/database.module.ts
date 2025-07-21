import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import MongodbConfig from '../config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [MongodbConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.mongodbUri'),
        dbName: configService.get<string>('mongodb.dbName'),
      }),
    }),
  ],
})
export class DatabaseModule {}
