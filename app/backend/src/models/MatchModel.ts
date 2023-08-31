import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatch from '../Interfaces/matches/IMatch';
import IMatchModel from '../Interfaces/matches/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';
import IUpdateMatchParams from '../Interfaces/matches/IUpdateMatchParams';
import ICreateMatchParams from '../Interfaces/matches/ICreateMatchParams';

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

  public async findByProgress(inProgress: string): Promise<IMatch[]> {
    const matches = await this.matchModel.findAll({
      include: [
        { model: this.teamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: this.teamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress: inProgress === 'true' },
    });

    return matches;
  }

  public async finishMatch(id: number): Promise<number> {
    const [status] = await this.matchModel.update(
      { inProgress: false },
      { where: { id } },
    );

    return status;
  }

  public async updateMatch(updateMatchParams: IUpdateMatchParams): Promise<number> {
    const { homeTeamGoals, awayTeamGoals, id } = updateMatchParams;
    const [status] = await this.matchModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    return status;
  }

  public async createMatch(createMatchParams: ICreateMatchParams): Promise<IMatch> {
    const dbData = await this.matchModel.create({ ...createMatchParams, inProgress: true });
    const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatch = dbData;
    const matchCreated = {
      id,
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress,
    };

    return matchCreated;
  }
}
