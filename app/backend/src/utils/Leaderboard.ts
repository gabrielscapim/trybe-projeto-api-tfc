import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import IMatch from '../Interfaces/matches/IMatch';

export default class Leaderboard {
  private _leaderboard: ILeaderboard[] = [];

  public get leaderboard(): ILeaderboard[] {
    return this._leaderboard;
  }

  static calculateAwayPoints(awayTeamGoals: number, homeTeamGoals: number): number {
    if (awayTeamGoals > homeTeamGoals) {
      return 3;
    }
    if (awayTeamGoals < homeTeamGoals) {
      return 0;
    }

    return 1;
  }

  static calculateHomePoints(awayTeamGoals: number, homeTeamGoals: number): number {
    if (awayTeamGoals < homeTeamGoals) {
      return 3;
    }
    if (awayTeamGoals > homeTeamGoals) {
      return 0;
    }

    return 1;
  }

  static calculateEfficiency(team: ILeaderboard): number {
    const { totalPoints, totalGames } = team;
    const efficiency = Math.round((((totalPoints) / (totalGames * 3)) * 100) * 100) / 100;

    return efficiency;
  }

  static calculateGoalsBalance(match: IMatch, currentTeam: ILeaderboard, main: string): number {
    const { homeTeamGoals, awayTeamGoals } = match;
    const { goalsBalance } = currentTeam;

    if (main === 'home') {
      return (homeTeamGoals - awayTeamGoals) + goalsBalance;
    }

    return (awayTeamGoals - homeTeamGoals) + goalsBalance;
  }

  static generateHomeTeamStats(match: IMatch): ILeaderboard {
    const { awayTeamGoals, homeTeamGoals } = match;
    const totalPoints = Leaderboard.calculateHomePoints(awayTeamGoals, homeTeamGoals);
    const goalsBalance = homeTeamGoals - awayTeamGoals;
    const efficiency = Math.round((((totalPoints) / (1 * 3)) * 100) * 100) / 100;
    const newStats = {
      name: String(match.homeTeam?.teamName),
      totalGames: 1,
      totalPoints,
      totalVictories: homeTeamGoals > awayTeamGoals ? 1 : 0,
      totalDraws: homeTeamGoals === awayTeamGoals ? 1 : 0,
      totalLosses: homeTeamGoals < awayTeamGoals ? 1 : 0,
      goalsFavor: homeTeamGoals,
      goalsOwn: awayTeamGoals,
      goalsBalance,
      efficiency,
    };

    return newStats;
  }

  static generateAwayTeamStats(match: IMatch): ILeaderboard {
    const { awayTeamGoals, homeTeamGoals } = match;
    const totalPoints = Leaderboard.calculateAwayPoints(awayTeamGoals, homeTeamGoals);
    const goalsBalance = awayTeamGoals - homeTeamGoals;
    const efficiency = Math.round((((totalPoints) / (1 * 3)) * 100) * 100) / 100;
    const newStats = {
      name: String(match.awayTeam?.teamName),
      totalGames: 1,
      totalPoints,
      totalVictories: awayTeamGoals > homeTeamGoals ? 1 : 0,
      totalDraws: homeTeamGoals === awayTeamGoals ? 1 : 0,
      totalLosses: awayTeamGoals < homeTeamGoals ? 1 : 0,
      goalsFavor: awayTeamGoals,
      goalsOwn: homeTeamGoals,
      goalsBalance,
      efficiency,
    };

    return newStats;
  }

  private calculateHomeLeaderboard(matches: IMatch[]): void {
    matches.forEach((match: IMatch) => {
      const currentTeam = this._leaderboard.find((team) => team.name === match.homeTeam?.teamName);
      const teamStats = Leaderboard.generateHomeTeamStats(match);
      if (!currentTeam) return this._leaderboard.push(teamStats);
      const { totalPoints, totalVictories, totalDraws, totalLosses } = teamStats;
      const { goalsBalance } = currentTeam;
      const { homeTeamGoals, awayTeamGoals } = match;

      currentTeam.totalPoints += totalPoints;
      currentTeam.totalGames += 1;
      currentTeam.totalVictories += totalVictories;
      currentTeam.totalDraws += totalDraws;
      currentTeam.totalLosses += totalLosses;
      currentTeam.goalsFavor += homeTeamGoals;
      currentTeam.goalsOwn += awayTeamGoals;
      currentTeam.goalsBalance = (homeTeamGoals - awayTeamGoals) + goalsBalance;
      currentTeam.efficiency = Leaderboard.calculateEfficiency(currentTeam);
    });
  }

  private calculateAwayLeaderboard(matches: IMatch[]): void {
    matches.forEach((match: IMatch) => {
      const currentTeam = this._leaderboard.find((team) => team.name === match.awayTeam?.teamName);
      const teamStats = Leaderboard.generateAwayTeamStats(match);
      if (!currentTeam) return this._leaderboard.push(teamStats);
      const { totalPoints, totalVictories, totalDraws, totalLosses } = teamStats;
      const { goalsBalance } = currentTeam;
      const { homeTeamGoals, awayTeamGoals } = match;

      currentTeam.totalPoints += totalPoints;
      currentTeam.totalGames += 1;
      currentTeam.totalVictories += totalVictories;
      currentTeam.totalDraws += totalDraws;
      currentTeam.totalLosses += totalLosses;
      currentTeam.goalsFavor += awayTeamGoals;
      currentTeam.goalsOwn += homeTeamGoals;
      currentTeam.goalsBalance = (awayTeamGoals - homeTeamGoals) + goalsBalance;
      currentTeam.efficiency = Leaderboard.calculateEfficiency(currentTeam);
    });
  }

  public calculateLeaderboard(matches: IMatch[], main = ''): void {
    this._leaderboard = [];

    switch (main) {
      case 'home':
        this.calculateHomeLeaderboard(matches);
        break;
      case 'away':
        this.calculateAwayLeaderboard(matches);
        break;
      default:
        this.calculateHomeLeaderboard(matches);
        this.calculateAwayLeaderboard(matches);
        break;
    }
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
