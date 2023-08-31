import { ServiceResponse } from '../Interfaces/IServiceResponse';
import IMatchModel from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import IMatch from '../Interfaces/matches/IMatch';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll();

    if (!matches) return { status: 'NOT_FOUND', data: { message: 'Matches not found' } };

    return { status: 'SUCCESSFUL', data: matches };
  }
}
