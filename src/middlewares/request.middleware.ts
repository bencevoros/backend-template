import { Request, Response, NextFunction } from 'express';
import { CommonError } from '../shared/errors/common.error';

function afterResponseCallback(responseCode: number, requestPath: string, requestMethod: string) {
  console.log(`End of request for path: ${requestPath}, status: ${responseCode}, method: ${requestMethod}`);
  console.log('>>>>>>>>>>>>>>>> END REQUEST <<<<<<<<<<<<<<<<');
}

export const logRequestData = (request: Request, response: Response, next: NextFunction) => {
  console.log('>>>>>>>>>>>>>>> START REQUEST <<<<<<<<<<<<<<<');
  const requestPath = request.path;
  console.log(`path: ${requestPath}`);
  console.log(`method: ${request.method}`);
  console.log('queries: ', request.query);
  console.log('body: ', request.body);
  response.on('finish', () => afterResponseCallback(response.statusCode, requestPath, request.method));
  next();
}

export const globalErrorHandler = (err: CommonError, req: Request, res: Response) => {
  console.log('Error occurred:', err);
  const status = err.status || 400;
  res.status(status).send({ error: err.message });
}
