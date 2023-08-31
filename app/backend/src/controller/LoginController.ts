import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) { }

  private internalErrorMessage = { message: 'Erro interno' };

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const serviceResponse = await this.loginService.login(email, password);

      if (serviceResponse.status !== 'SUCCESSFUL') {
        return res.status(401).json(serviceResponse.data);
      }

      return res.status(200).json({ token: serviceResponse.data });
    } catch (error) {
      console.log(error);
      return res.status(500).json(this.internalErrorMessage);
    }
  }

  public getUserRole(req: Request, res: Response) {
    try {
      const { payload: { role } } = req.body;

      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }

      return res.status(200).json({ role });
    } catch (error) {
      console.log(error);
      return res.status(500).json(this.internalErrorMessage);
    }
  }
}
