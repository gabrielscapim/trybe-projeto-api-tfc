/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import IMatch from '../Interfaces/matches/IMatch';

const leaderboard: ILeaderboard[] = [];

export default class HomeLeaderboard {
  private _leaderboard: ILeaderboard[] = [];

  public get leaderboard(): ILeaderboard[] {
    return this._leaderboard;
  }

  public calculateHomeLeaderboard(matchesFromSequelize: IMatch[]): void {
    matchesFromSequelize.forEach((match: IMatch) => {
      const findTeamInLeaderboard = this._leaderboard.find((team) => team.name === match.homeTeam?.teamName);

      const name = String(match.homeTeam?.teamName);
      let totalPoints = 0;
      const totalGames = 1;
      let totalVictories = 0;
      let totalDraws = 0;
      let totalLosses = 0;
      const goalsFavor = match.homeTeamGoals;
      const goalsOwn = match.awayTeamGoals;

      if (match.awayTeamGoals > match.homeTeamGoals) {
        totalLosses = 1;
      }

      if (match.awayTeamGoals < match.homeTeamGoals) {
        totalPoints = 3;
        totalVictories = 1;
      }

      if (match.awayTeamGoals === match.homeTeamGoals) {
        totalPoints = 1;
        totalDraws = 1;
      }

      if (!findTeamInLeaderboard) {
        return leaderboard.push({
          name,
          totalPoints,
          totalGames,
          totalVictories,
          totalDraws,
          totalLosses,
          goalsFavor,
          goalsOwn,
        });
      }

      findTeamInLeaderboard.totalPoints += totalPoints;
      findTeamInLeaderboard.totalGames += totalGames;
      findTeamInLeaderboard.totalVictories += totalVictories;
      findTeamInLeaderboard.totalDraws += totalDraws;
      findTeamInLeaderboard.totalLosses += totalLosses;
      findTeamInLeaderboard.goalsFavor += goalsFavor;
      findTeamInLeaderboard.goalsOwn += goalsOwn;
    });
  }
}
