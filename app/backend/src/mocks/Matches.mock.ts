const matches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo',
    },
    awayTeam: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'Internacional',
    },
    awayTeam: {
      teamName: 'Santos',
    },
  },
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: 'Corinthians',
    },
    awayTeam: {
      teamName: 'Napoli-SC',
    },
  },
  {
    id: 4,
    homeTeamId: 3,
    homeTeamGoals: 0,
    awayTeamId: 2,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: 'Botafogo',
    },
    awayTeam: {
      teamName: 'Bahia',
    },
  },
];

const match = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: false,
};

const matchesInProgress = [
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'São Paulo',
    },
    awayTeam: {
      teamName: 'Internacional',
    },
  },
  {
    id: 42,
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'Ferroviária',
    },
    awayTeam: {
      teamName: 'Avaí/Kindermann',
    },
  },
  {
    id: 43,
    homeTeamId: 11,
    homeTeamGoals: 0,
    awayTeamId: 10,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'Napoli-SC',
    },
    awayTeam: {
      teamName: 'Minas Brasília',
    },
  },
];

const finishedMatches = matches;

export {
  matches,
  match,
  matchesInProgress,
  finishedMatches,
};
