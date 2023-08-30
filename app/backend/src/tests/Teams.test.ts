import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import SequelizeTeam from '../database/models/SequelizeTeam';
import { team, teams } from '../mocks/Teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test', function() {
  it('Should return all teams', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('Should return team by id', async function() {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });

  it('Should not return team by id if team does not exists', async function() {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/10000');

    expect(status).to.equal(404);
    expect(body).to.deep.equal('Team 10000 not found');
  });
});
