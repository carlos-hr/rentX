import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories/UsersRepository';

interface IPayload {
  sub: string;
}

export async function verifyAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('Token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      '073dba17fba0dc86eca7ce3c877125ae'
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User not found.');
    }

    next();
  } catch {
    throw new Error('Invalid token.');
  }
}
