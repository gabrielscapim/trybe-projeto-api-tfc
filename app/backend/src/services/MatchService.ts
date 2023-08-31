import {
  ServiceResponse,
  ServiceResponseMessage,
} from '../Interfaces/IServiceResponse';
import IMatchModel from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import IMatch from '../Interfaces/matches/IMatch';
import IUpdateMatchParams from '../Interfaces/matches/IUpdateMatchParams';
import ICreateMatchParams from '../Interfaces/matches/ICreateMatchParams';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll();

    if (!matches) return { status: 'NOT_FOUND', data: { message: 'Matches not found' } };

    return { status: 'SUCCESSFUL', data: matches };
  }

  public async findByProgress(inProgress: string): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findByProgress(inProgress);

    if (!matches) return { status: 'NOT_FOUND', data: { message: 'Matches not found' } };

    return { status: 'SUCCESSFUL', data: matches };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceResponseMessage>> {
    const responseFromModel = await this.matchModel.finishMatch(id);

    if (!responseFromModel) {
      return { status: 'ERROR', data: { message: 'Unable to finish the match' } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(updateMatchParams: IUpdateMatchParams):
  Promise<ServiceResponse<ServiceResponseMessage>> {
    const responseFromModel = await this.matchModel.updateMatch(updateMatchParams);

    if (!responseFromModel) {
      return { status: 'ERROR', data: { message: 'Unable to update match' } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Match updated' } };
  }

  public async createMatch(createMatchParams: ICreateMatchParams):
  Promise<ServiceResponse<IMatch>> {
    const matchCreated = await this.matchModel.createMatch(createMatchParams);

    if (!matchCreated) {
      return { status: 'ERROR', data: { message: 'Unable to create match' } };
    }

    return { status: 'SUCCESSFUL', data: matchCreated };
  }
}
