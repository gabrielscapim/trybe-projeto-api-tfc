import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import IMatch from '../Interfaces/matches/IMatch';

export default class GenerateLeaderboard {
  private _leaderboard: ILeaderboard[] = [];

  public get leaderboard(): ILeaderboard[] {
    return this._leaderboard;
  }

  static calculteLosses(awayTeamGoals: number, homeTeamGoals: number): number {
    if (awayTeamGoals > homeTeamGoals) {
      return 1;
    }
    return 0;
  }

  static calculteVictories(awayTeamGoals: number, homeTeamGoals: number): number {
    if (awayTeamGoals < homeTeamGoals) {
      return 1;
    }
    return 0;
  }

  static calculatePoints(awayTeamGoals: number, homeTeamGoals: number): number {
    if (awayTeamGoals < homeTeamGoals) {
      return 3;
    }
    if (awayTeamGoals > homeTeamGoals) {
      return 0;
    }
    return 1;
  }

  static calculteDraws(awayTeamGoals: number, homeTeamGoals: number): number {
    if (awayTeamGoals === homeTeamGoals) {
      return 1;
    }
    return 0;
  }

  static generateNewStats(match: IMatch): ILeaderboard {
    const { awayTeamGoals, homeTeamGoals } = match;
    const newStats = {
      name: String(match.homeTeam?.teamName),
      totalGames: 1,
      totalPoints: GenerateLeaderboard.calculatePoints(awayTeamGoals, homeTeamGoals),
      totalVictories: GenerateLeaderboard.calculteVictories(awayTeamGoals, homeTeamGoals),
      totalDraws: GenerateLeaderboard.calculteDraws(awayTeamGoals, homeTeamGoals),
      totalLosses: GenerateLeaderboard.calculteLosses(awayTeamGoals, homeTeamGoals),
      goalsFavor: homeTeamGoals,
      goalsOwn: awayTeamGoals,
    };

    return newStats;
  }

  public calculateHomeLeaderboard(matches: IMatch[]): void {
    this._leaderboard = [];
    matches.forEach((match: IMatch) => {
      const findTeamInLeaderboard = this._leaderboard
        .find((team) => team.name === match.homeTeam?.teamName);
      const newStats = GenerateLeaderboard.generateNewStats(match);
      const { totalPoints, totalVictories, totalDraws, totalLosses } = newStats;

      if (!findTeamInLeaderboard) {
        return this._leaderboard.push(newStats);
      }

      findTeamInLeaderboard.totalPoints += totalPoints;
      findTeamInLeaderboard.totalGames += 1;
      findTeamInLeaderboard.totalVictories += totalVictories;
      findTeamInLeaderboard.totalDraws += totalDraws;
      findTeamInLeaderboard.totalLosses += totalLosses;
      findTeamInLeaderboard.goalsFavor += match.homeTeamGoals;
      findTeamInLeaderboard.goalsOwn += match.awayTeamGoals;
    });
  }
}
