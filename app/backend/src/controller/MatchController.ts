import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  private internalErrorMessage = { message: 'Erro interno' };

  public async findAll(req: Request, res: Response) {
    try {
      const serviceResponse = await this.matchService.findAll();

      if (serviceResponse.status !== 'SUCCESSFUL') {
        return res.status(404).json(serviceResponse.data);
      }

      return res.status(200).json(serviceResponse.data);
    } catch (error) {
      console.log(error);
      return res.status(500).json(this.internalErrorMessage);
    }
  }
}
