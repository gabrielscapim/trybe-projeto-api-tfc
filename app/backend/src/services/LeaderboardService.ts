import IMatchModel from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../Interfaces/IServiceResponse';
import Leaderboard from '../utils/Leaderboard';
import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private leaderboard = new Leaderboard(),
  ) { }

  public async findLeaderboard(main = ''): Promise<ServiceResponse<ILeaderboard[]>> {
    const matches = await this.matchModel.findByProgress('false');
    this.leaderboard.calculateLeaderboard(matches, main);

    if (main === '') {
      this.leaderboard.calculateLeaderboard(matches);
    }

    this.leaderboard.sortLeaderboard();

    if (!this.leaderboard.leaderboard) {
      return { status: 'ERROR', data: { message: 'Unable to get leaderboard' } };
    }

    return { status: 'SUCCESSFUL', data: this.leaderboard.leaderboard };
  }
}
