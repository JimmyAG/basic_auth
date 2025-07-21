import { registerAs } from '@nestjs/config';

interface MongodbConfigType {
  mongodbUri: string;
  dbName: string;
}

const MongodbConfig: MongodbConfigType = {
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  dbName: process.env.DB_NAME || 'dev-db',
};

export default registerAs('mongodb', () => MongodbConfig);
