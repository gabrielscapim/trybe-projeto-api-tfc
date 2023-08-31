import IMatch from './IMatch';
import IUpdateMatchParams from './IUpdateMatchParams';

export default interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findByProgress(inProgress: string): Promise<IMatch[]>;
  finishMatch(id: number): Promise<number>;
  updateMatch(updateMatchParams: IUpdateMatchParams): Promise<number>
}
