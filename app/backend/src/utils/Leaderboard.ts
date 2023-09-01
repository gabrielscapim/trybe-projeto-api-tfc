import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import IMatch from '../Interfaces/matches/IMatch';

export default class Leaderboard {
  private _leaderboard: ILeaderboard[] = [];

  public get leaderboard(): ILeaderboard[] {
    return this._leaderboard;
  }

  static calculateLosses(awayTeamGoals: number, homeTeamGoals: number, main: string): number {
    if (awayTeamGoals > homeTeamGoals && main === 'home') {
      return 1;
    }
    if (awayTeamGoals < homeTeamGoals && main === 'away') {
      return 1;
    }

    return 0;
  }

  static calculateVictories(awayTeamGoals: number, homeTeamGoals: number, main: string): number {
    if (awayTeamGoals < homeTeamGoals && main === 'home') {
      return 1;
    }
    if (awayTeamGoals > homeTeamGoals && main === 'away') {
      return 1;
    }

    return 0;
  }

  static calculatePoints(awayTeamGoals: number, homeTeamGoals: number, main: string): number {
    if (awayTeamGoals < homeTeamGoals && main === 'home') {
      return 3;
    }
    if (awayTeamGoals > homeTeamGoals && main === 'home') {
      return 0;
    }
    if (awayTeamGoals > homeTeamGoals && main === 'away') {
      return 3;
    }
    if (awayTeamGoals < homeTeamGoals && main === 'away') {
      return 0;
    }

    return 1;
  }

  static calculateDraws(awayTeamGoals: number, homeTeamGoals: number): number {
    if (awayTeamGoals === homeTeamGoals) {
      return 1;
    }

    return 0;
  }

  static generateNewStats(match: IMatch, main: string): ILeaderboard {
    const { awayTeamGoals, homeTeamGoals } = match;
    const totalPoints = Leaderboard.calculatePoints(awayTeamGoals, homeTeamGoals, main);
    const goalsBalance = main === 'home'
      ? homeTeamGoals - awayTeamGoals : awayTeamGoals - homeTeamGoals;

    const newStats = {
      name: main === 'home' ? String(match.homeTeam?.teamName) : String(match.awayTeam?.teamName),
      totalGames: 1,
      totalPoints,
      totalVictories: Leaderboard.calculateVictories(awayTeamGoals, homeTeamGoals, main),
      totalDraws: Leaderboard.calculateDraws(awayTeamGoals, homeTeamGoals),
      totalLosses: Leaderboard.calculateLosses(awayTeamGoals, homeTeamGoals, main),
      goalsFavor: main === 'home' ? homeTeamGoals : awayTeamGoals,
      goalsOwn: main === 'home' ? awayTeamGoals : homeTeamGoals,
      goalsBalance,
      efficiency: Math.round((((totalPoints) / (1 * 3)) * 100) * 100) / 100,
    };

    return newStats;
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

  public calculateLeaderboard(matches: IMatch[], main: string): void {
    this._leaderboard = [];
    matches.forEach((match: IMatch) => {
      const currentTeam = this.findLeaderboardMain(main, match);
      const newStats = Leaderboard.generateNewStats(match, main);
      const { totalPoints, totalVictories, totalDraws, totalLosses } = newStats;
      const goalsFavor = main === 'home' ? match.homeTeamGoals : match.awayTeamGoals;
      const goalsOwn = main === 'home' ? match.awayTeamGoals : match.homeTeamGoals;
      if (!currentTeam) return this._leaderboard.push(newStats);

      currentTeam.totalPoints += totalPoints;
      currentTeam.totalGames += 1;
      currentTeam.totalVictories += totalVictories;
      currentTeam.totalDraws += totalDraws;
      currentTeam.totalLosses += totalLosses;
      currentTeam.goalsFavor += goalsFavor;
      currentTeam.goalsOwn += goalsOwn;
      currentTeam.goalsBalance = Leaderboard.calculateGoalsBalance(match, currentTeam, main);
      currentTeam.efficiency = Leaderboard.calculateEfficiency(currentTeam);
    });
  }

  private findLeaderboardMain(main: string, match: IMatch): ILeaderboard | undefined {
    if (main === 'home') {
      return this._leaderboard.find((team) => team.name === match.homeTeam?.teamName);
    }

    return this._leaderboard.find((team) => team.name === match.awayTeam?.teamName);
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
