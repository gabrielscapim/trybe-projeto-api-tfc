import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import IMatch from '../Interfaces/matches/IMatch';

export default class Leaderboard {
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
    const totalPoints = Leaderboard.calculatePoints(awayTeamGoals, homeTeamGoals);
    const newStats = {
      name: String(match.homeTeam?.teamName),
      totalGames: 1,
      totalPoints,
      totalVictories: Leaderboard.calculteVictories(awayTeamGoals, homeTeamGoals),
      totalDraws: Leaderboard.calculteDraws(awayTeamGoals, homeTeamGoals),
      totalLosses: Leaderboard.calculteLosses(awayTeamGoals, homeTeamGoals),
      goalsFavor: homeTeamGoals,
      goalsOwn: awayTeamGoals,
      goalsBalance: homeTeamGoals - awayTeamGoals,
      efficiency: Math.round((((totalPoints) / (1 * 3)) * 100) * 100) / 100,
    };

    return newStats;
  }

  static calculateEfficiency(team: ILeaderboard): number {
    const { totalPoints, totalGames } = team;
    const efficiency = Math.round((((totalPoints) / (totalGames * 3)) * 100) * 100) / 100;

    return efficiency;
  }

  public calculateHomeLeaderboard(matches: IMatch[]): void {
    this._leaderboard = [];
    matches.forEach((match: IMatch) => {
      const currentTeam = this._leaderboard.find((team) => team.name === match.homeTeam?.teamName);
      const newStats = Leaderboard.generateNewStats(match);
      const { totalPoints, totalVictories, totalDraws, totalLosses } = newStats;
      const { homeTeamGoals, awayTeamGoals } = match;

      if (!currentTeam) return this._leaderboard.push(newStats);

      currentTeam.totalPoints += totalPoints;
      currentTeam.totalGames += 1;
      currentTeam.totalVictories += totalVictories;
      currentTeam.totalDraws += totalDraws;
      currentTeam.totalLosses += totalLosses;
      currentTeam.goalsFavor += homeTeamGoals;
      currentTeam.goalsOwn += awayTeamGoals;
      currentTeam.goalsBalance = (homeTeamGoals - awayTeamGoals) + currentTeam.goalsBalance;
      currentTeam.efficiency = Leaderboard.calculateEfficiency(currentTeam);
    });
  }

  public sortLeaderboard(): ILeaderboard[] {
    const sortedLeaderboard: ILeaderboard[] = this._leaderboard.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }

      if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }

      if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }

      return b.goalsFavor - a.goalsFavor;
    });

    return sortedLeaderboard;
  }
}
