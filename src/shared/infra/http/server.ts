/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import { AppError } from '@errors/AppError';
import { router } from './routes';
import swaggerSetup from '../../../swagger.json';
import '../database';
import '@shared/container';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res
    .status(500)
    .json({ message: `Internal server error - ${err.message}` });
});

app.listen(3333, () => console.log('Server running!'));