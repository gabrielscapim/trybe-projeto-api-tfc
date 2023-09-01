import ITeamModel from '../Interfaces/teams/ITeamModel';
import IMatchModel from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import { ServiceResponse } from '../Interfaces/IServiceResponse';
import HomeLeaderboard from '../utils/HomeLeaderboard';
import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private homeLeaderboard = new HomeLeaderboard(),
  ) { }

  public async findHomeLeaderboard():Promise<ServiceResponse<ILeaderboard[]>> {
    const matches = await this.matchModel.findAll();

    this.homeLeaderboard.calculateHomeLeaderboard(matches);
    console.log(matches);

    const { leaderboard } = this.homeLeaderboard;

    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
