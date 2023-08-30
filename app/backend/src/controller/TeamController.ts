import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async findAll(_req: Request, res: Response) {
    try {
      const serviceResponse = await this.teamService.findAll();

      if (serviceResponse.status !== 'SUCCESSFUL') {
        return res.status(404).json(serviceResponse.data);
      }

      return res.status(200).json(serviceResponse.data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro interno' });
    }
  }

  public async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const serviceResponse = await this.teamService.findById(Number(id));

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
