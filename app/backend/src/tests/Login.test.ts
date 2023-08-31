import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeam from '../database/models/SequelizeTeam';
import { user } from '../mocks/User.mock';
import SequelizeUser from '../database/models/SequelizeUser';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login test', function() {
  afterEach(function() {
    sinon.restore();
  });
  
  it('Should not return a token if email/password field is empty', async function() {
    const { status, body } = await chai.request(app).post('/login');

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('Should not return a token if email field is wrong', async function() {
    const { status, body } = await chai.request(app).post('/login').send({ email: 'teste@', password: '1234567' });

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('Should not return a token if password field is wrong', async function() {
    const { status, body } = await chai.request(app).post('/login').send({ email: 'teste@email.com', password: '12' });

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('Should not return a token if user does not exists', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login').send({ email: 'teste@email.com', password: '1234567' });

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('Should return a token if fields are correct', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any);

    const { status, body } = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(status).to.equal(200);
    expect(body).to.have.key('token');
  })
});
