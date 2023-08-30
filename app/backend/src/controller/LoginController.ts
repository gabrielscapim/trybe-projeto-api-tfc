import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) { }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const serviceResponse = await this.loginService.login(email, password);

      if (serviceResponse.status !== 'SUCCESSFUL') {
        return res.status(404).json(serviceResponse.data);
      }

      return res.status(200).json(serviceResponse.data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro interno' });
    }
  }
}
