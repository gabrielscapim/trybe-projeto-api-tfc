import IMatchModel from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../Interfaces/IServiceResponse';
import GenerateLeaderboard from '../utils/GenerateLeaderboard';
import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private homeLeaderboard = new GenerateLeaderboard(),
  ) { }

  public async findHomeLeaderboard():Promise<ServiceResponse<ILeaderboard[]>> {
    const matches = await this.matchModel.findByProgress('false');

    this.homeLeaderboard.calculateHomeLeaderboard(matches);

    const { leaderboard } = this.homeLeaderboard;

    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
