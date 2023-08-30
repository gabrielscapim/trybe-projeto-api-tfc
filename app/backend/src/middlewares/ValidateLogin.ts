import { NextFunction, Request, Response } from 'express';
import { emailRegex, emptyString } from '../utils/regex';

export default class ValidateLogin {
  static validateLoginFields(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!emailRegex.test(email) || password.replace(emptyString, '').length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return next();
  }
}
