import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatch from '../Interfaces/matches/IMatch';
import IMatchModel from '../Interfaces/matches/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class MatchModel implements IMatchModel {
  private matchModel = SequelizeMatch;
  private teamModel = SequelizeTeam;

  public async findAll(): Promise<IMatch[]> {
    const matches = await this.matchModel.findAll({
      include: [
        { model: this.teamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: this.teamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }
}
