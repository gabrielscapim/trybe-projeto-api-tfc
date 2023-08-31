import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { matches } from '../mocks/Matches.mock';
import SequelizeMatch from '../database/models/SequelizeMatch';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', function() {
  afterEach(function() {
    sinon.restore();
  });

  it('Should return all matches', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('Should not return all matches', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(undefined);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Matches not found' });
  });
})