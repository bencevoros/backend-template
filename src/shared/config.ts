import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { NODE_ENV } from './enums/node_env.enum';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === NODE_ENV.TEST) {
  dotenv.config({ path: path.join(__dirname, '..', '..', '.env.test') });
} else {
  dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });
}

export default {
  MONGODB_URL: process.env.MONGODB_URL || '',
  MONGODB_USER: process.env.MONGODB_USER || '',
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD || '',
  MONGODB_DBNAME: process.env.MONGODB_DBNAME || '',
  PORT: Number.parseInt(process.env.PORT || '') || 4000,
};  
