import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  private internalErrorMessage = { message: 'Erro interno' };

  public async findAll(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;
      let serviceResponse = await this.matchService.findAll();

      if (inProgress) {
        serviceResponse = await this.matchService.findByProgress(String(inProgress));
      }

      if (serviceResponse.status !== 'SUCCESSFUL') {
        return res.status(404).json(serviceResponse.data);
      }

      return res.status(200).json(serviceResponse.data);
    } catch (error) {
      console.log(error);
      return res.status(500).json(this.internalErrorMessage);
    }
  }

  public async finishMatch(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const serviceResponse = await this.matchService.finishMatch(Number(id));

      if (serviceResponse.status !== 'SUCCESSFUL') {
        return res.status(404).json(serviceResponse.data);
      }

      return res.status(200).json(serviceResponse.data);
    } catch (error) {
      console.log(error);
      return res.status(500).json(this.internalErrorMessage);
    }
  }

  public async updateMatch(req: Request, res: Response) {
    try {
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const { id } = req.params;
      const updateMatchParams = { homeTeamGoals, awayTeamGoals, id: Number(id) };
      const serviceResponse = await this.matchService.updateMatch(updateMatchParams);

      if (serviceResponse.status !== 'SUCCESSFUL') {
        return res.status(404).json(serviceResponse.data);
      }

      return res.status(200).json(serviceResponse.data);
    } catch (error) {
      console.log(error);
      return res.status(500).json(this.internalErrorMessage);
    }
  }

  public async createMatch(req: Request, res: Response) {
    try {
      const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals } = req.body;
      const serviceResponse = await this
        .matchService
        .createMatch({ homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals });

      if (serviceResponse.status !== 'SUCCESSFUL') {
        return res.status(404).json(serviceResponse.data);
      }

      return res.status(201).json(serviceResponse.data);
    } catch (error) {
      console.log(error);
      return res.status(500).json(this.internalErrorMessage);
    }
  }
}
