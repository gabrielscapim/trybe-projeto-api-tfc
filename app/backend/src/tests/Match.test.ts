import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { finishedMatches, match, matches, matchesInProgress } from '../mocks/Matches.mock';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { user } from '../mocks/User.mock';
import SequelizeUser from '../database/models/SequelizeUser';

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

  it('Should return all matches in progress', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesInProgress as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesInProgress);
  });

  it('Should return only finished matches', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(finishedMatches as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(finishedMatches);
  });

  it('Should finish a match', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
    sinon.stub(SequelizeMatch, 'update').resolves([1] as any);

    const { body: { token } } = await chai
      .request(app).post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    const { status, body } = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('Authorization', `Bearer ${token}`);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Finished' });
  });

  it('Should not finish a match', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
    sinon.stub(SequelizeMatch, 'update').resolves([0] as any);

    const { body: { token } } = await chai
      .request(app).post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    const { status, body } = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('Authorization', `Bearer ${token}`);

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Unable to finish the match' });
  })

  it('Should update a match', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
    sinon.stub(SequelizeMatch, 'update').resolves([1] as any);

    const { body: { token } } = await chai
      .request(app).post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    const { status, body } = await chai
      .request(app)
      .patch('/matches/1')
      .set('Authorization', `Bearer ${token}`);
    
    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Match updated' });
  })

  it('Should not update a match', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
    sinon.stub(SequelizeMatch, 'update').resolves([0] as any);

    const { body: { token } } = await chai
      .request(app).post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    const { status, body } = await chai
      .request(app)
      .patch('/matches/1')
      .set('Authorization', `Bearer ${token}`);
    
    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Unable to update match' });
  })

  it('Should create a match', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
    sinon.stub(SequelizeMatch, 'create').resolves(match as any);

    const { body: { token } } = await chai
      .request(app).post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    const { status, body } = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', `Bearer ${token}`);
    
    expect(status).to.equal(201);
    expect(body).to.deep.equal(match);
  })
})