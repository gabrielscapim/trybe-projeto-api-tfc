import { NextFunction, Request, Response } from 'express';
import TeamModel from '../models/TeamModel';
import ITeamModel from '../Interfaces/teams/ITeamModel';

export default class ValidateCreateMatch {
  constructor(
    protected teamModel: ITeamModel = new TeamModel(),
  ) {}

  static validateTeamsNames(req: Request, res: Response, next: NextFunction): Response | void {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res
        .status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    return next();
  }

  public async validateTeamsId(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;
    console.log(homeTeamId);
    console.log(this.teamModel);
    const homeTeam = await this.teamModel.findById(Number(homeTeamId));
    const awayTeam = await this.teamModel.findById(Number(awayTeamId));

    if (!homeTeam || !awayTeam) {
      return res
        .status(404)
        .json({ message: 'There is no team with such id!' });
    }

    return next();
  }
}
