const chai = require('chai');
const { stub } = require('sinon');
const chaiHttp = require('chai-http');
const { User } = require('../database/models');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../api/app');

const admMock = {
  "id": 1,
  "name": "Delivery App Admin",
  "email": "adm@deliveryapp.com",
  "password": "a4c86edecc5aee06eff8fdeda69e0d04",
  "role": "administrator"
}

describe('Method GET /admin', () => {
  const sellerMock = {
    "id": 2,
    "name": "Fulana Pereira",
    "email": "fulana@deliveryapp.com",
    "password": "3c28d2b0881bf46457a853e0b07531c6",
    "role": "seller"
  }

  const usersMock = [
    {
      "id": 2,
      "name": "Fulana Pereira",
      "email": "fulana@deliveryapp.com",
      "password": "3c28d2b0881bf46457a853e0b07531c6",
      "role": "seller"
    },
    {
      "id": 3,
      "name": "Cliente Zé Birita",
      "email": "zebirita@email.com",
      "password": "1c37466c159755ce1fa181bd247cb925",
      "role": "customer"
    },
  ]

  before(() => {
    stub(User, 'findOne')
      .onCall(0).resolves(sellerMock)
      .onCall(1).resolves(admMock);
    stub(User, 'findAll').resolves(usersMock);
  });

  after(() => {
    User.findOne.restore()
    User.findAll.restore()
  });

  describe('if no token is passed', () => {
    let response;

    before( async () => {
      response = await chai.request(app).get('/admin')
    });

    it('should return the status code 401', () => {
      expect(response).to.have.status(401);
    });
    it('should have the error message "Token not found"', () => {
      expect(response.body.message).to.be.equal('Token not found');
    });
  });

  describe('if the token passed is invalid', () => {
    let response;

    before( async () => {
      response = await chai.request(app).get('/admin').set('authorization', 'invalidtoken')
    });

    it('should return the status code 401', () => {
      expect(response).to.have.status(401);
    });
    it('should have the error message "Expired or invalid token"', () => {
      expect(response.body.message).to.be.equal('Expired or invalid token');
    });
  });

  describe('if the user logged on is not an administrator', () => {
    let response;

    before( async () => {
      const { body: { token } } = await chai.request(app).post('/login').send({
        email: "fulana@deliveryapp.com",
        password: "fulana@123"
      });
      response = await chai.request(app).get('/admin').set('authorization', token)
    });

    it('should return the status code 401', () => {
      expect(response).to.have.status(401);
    });
    it('should have the error message "Administrator required"', () => {
      expect(response.body.message).to.be.equal('Administrator required');
    });
  });

  describe('if the request is successful', () => {
    let response;

    before( async () => {
      const { body: { token } } = await chai.request(app).post('/login').send({
        email: "adm@deliveryapp.com",
        password: "--adm2@21!!--"
      });
      response = await chai.request(app).get('/admin').set('authorization', token)
    });

    it('should return the status code 200', () => {
      expect(response).to.have.status(200);
    });
    it('should return an array in the body', () => {
      expect(response.body).to.be.an('array');
    });
    it('should have all the users in the db that are not admins', () => {
      expect(response.body).to.have.length(2);
    });
  });
});

describe('Method POST /admin', () => {
  before(() => {
    stub(User, 'findOne')
      .onCall(0).resolves(admMock)
      .onCall(1).resolves(admMock)
      .onCall(2).resolves();
    stub(User, 'create').resolves();
  });

  after(() => {
    User.findOne.restore();
    User.create.restore();
  });

  describe('if the request passed is incomplete', () => {
    let response;

    before( async () => {
      const { body: { token } } = await chai.request(app).post('/login').send({
        email: "adm@deliveryapp.com",
        password: "--adm2@21!!--"
      });
      response = await chai.request(app).post('/admin').set('authorization', token).send({
        "name": "Fulano Vendedor",
        "email": "fulano@vendedor.com",
        "password": "fulano@321"
      })
    });

    it('should return the status code 400', () => {
      expect(response).to.have.status(400);
    });
    it('should have the error message ""role" is required"', () => {
      expect(response.body.message).to.be.equal('"role" is required');
    });
  });

  describe('if the request is successful', () => {
    let response;

    before( async () => {
      const { body: { token } } = await chai.request(app).post('/login').send({
        email: "adm@deliveryapp.com",
        password: "--adm2@21!!--"
      });
      response = await chai.request(app).post('/admin').set('authorization', token).send({
        "name": "Fulano Vendedor",
        "email": "fulano@vendedor.com",
        "password": "fulano@321",
        "role": "seller"
      })
    });

    it('should return the status code 201', () => {
      expect(response).to.have.status(201);
    });
    it('should have no response from the body', () => {
      expect(response.body).to.be.empty;
    });
  });
});

describe('Method DELETE /admin', () => {
  before(() => {
    stub(User, 'findOne').resolves(admMock);
    stub(User, 'destroy').resolves();
  });

  after(() => {
    User.findOne.restore();
    User.destroy.restore();
  });

  describe('if the id is not passed', () => {
    let response;

    before( async () => {
      const { body: { token } } = await chai.request(app).post('/login').send({
        email: "adm@deliveryapp.com",
        password: "--adm2@21!!--"
      });
      response = await chai.request(app).delete('/admin').set('authorization', token).send()
    });

    it('should return the status code 400', () => {
      expect(response).to.have.status(400);
    });
    it('should have the error message ""id" is required"', () => {
      expect(response.body.message).to.be.equal('"id" is required');
    });
  });

  describe('if the request is successful', () => {
    let response;

    before( async () => {
      const { body: { token } } = await chai.request(app).post('/login').send({
        email: "adm@deliveryapp.com",
        password: "--adm2@21!!--"
      });
      response = await chai.request(app).delete('/admin').set('authorization', token).send({
        "id": 3
      })
    });

    it('should return the status code 204', () => {
      expect(response).to.have.status(204);
    });
    it('should have no response from the body', () => {
      expect(response.body).to.be.empty;
    });
  });
});