import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import CONFIG from './src/shared/config';
import routes from './src/routes';
import { globalErrorHandler, logRequestData } from './src/middlewares/request.middleware';
import { NODE_ENV } from './src/shared/enums/node_env.enum';

// connect to mongodb before other entities
await mongoose.connect(CONFIG.MONGODB_URL, {
  user: CONFIG.MONGODB_USER,
  pass: CONFIG.MONGODB_PASSWORD,
  dbName: CONFIG.MONGODB_DBNAME,
});

// set up expres app
const app: Application = express();

if (process.env.NODE_ENV !== NODE_ENV.PRODUCTION) {
  app.use(cors());
}

app.use(express.json({ limit: '15mb' }));
app.use(logRequestData);

// initialize routes
app.use('/api', routes);

// error handling
app.use(globalErrorHandler);

if (process.env.NODE_ENV !== NODE_ENV.TEST) {
  // listen for requests
  app.listen(CONFIG.PORT, () => console.log('Server listening on port ' + CONFIG.PORT));
}

export const expressApp = app;
