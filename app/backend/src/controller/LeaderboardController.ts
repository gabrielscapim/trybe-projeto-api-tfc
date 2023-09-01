import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  private internalErrorMessage = { message: 'Erro interno' };

  public async findHomeLeaderboard(_req: Request, res: Response) {
    try {
      const serviceResponse = await this.leaderboardService.findHomeLeaderboard();

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
