import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { finishedMatches } from '../mocks/Matches.mock';
import { leaderboardAway, leaderboardHome } from '../mocks/Leaderboard.mock'; 

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard test', function () {
  afterEach(function() {
    sinon.restore();
  });

  it('Should return sorted home leaderboard', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(finishedMatches as any);

    const { status, body } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(leaderboardHome);
  })

  it('Should return sorted away leaderboard', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(finishedMatches as any);

    const { status, body } = await chai.request(app).get('/leaderboard/away');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(leaderboardAway);
  })
})