import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';

export default class ValidateToken {
  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { headers: { authorization } } = req;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = authorization.split(' ')[1];
    const payload = JWT.verify(token);

    if (payload === 'Token must be a valid Token') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    req.body.payload = payload;

    return next();
  }
}
