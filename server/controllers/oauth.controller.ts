import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { login, callback } from '../services/ouath.service';
import { Request, Response } from 'express';

const authenticate = catchAsync(async (req: Request, res: Response) => {
  const loginUrl = login();
  res.status(httpStatus.CREATED).send({ loginUrl });
});

const requestToken = catchAsync(async (req: Request, res: Response) => {
  const token = await callback(req);
  res.status(httpStatus.CREATED).send({ token });
});

export {authenticate, requestToken};
