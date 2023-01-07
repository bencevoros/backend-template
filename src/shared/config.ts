import * as dotenv from 'dotenv';
dotenv.config()

export default {
  MONGODB_URL: process.env.MONGODB_URL || '',
  MONGODB_USER: process.env.MONGODB_USER || '',
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD || '',
  MONGODB_DBNAME: process.env.MONGODB_DBNAME || '',
  PORT: Number.parseInt(process.env.PORT || '') || 4000,
};  
