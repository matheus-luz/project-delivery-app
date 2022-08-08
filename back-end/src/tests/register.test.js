const chai = require('chai');
const { stub } = require('sinon');
const chaiHttp = require('chai-http');
const { User } = require('../database/models');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../api/app');

describe('Route POST /register', () => {
  const userMock = {
    name: "Rafael da Cunha Santos",
    email: "customer@deliveryapp.com",
    password: "a4c86edecc5aee06eff8fdeda69e0d04",
    role: "customer"
  }

  before(() => {
    stub(User, 'findOne')
      .onCall(0).resolves(userMock)
      .onCall(1).resolves(null)
      .onCall(2).resolves(userMock)
      .onCall(3).resolves(null)
      .onCall(4).resolves(null);
    stub(User, 'create').resolves(userMock);
  });

  after(() => User.findOne.restore());

  describe('if the name passed have less than 12 characters long', () => {
    let response;

    before( async () => {
      response = await chai.request(app).post('/register').send({
        name: 'wrongname',
        email: "exemplo@gmail.",
        password: "123321"
      });
    });

    it('should return the status code 400', () => {
      expect(response).to.have.status(400);
    });
    it('should have the error message "\"name\" length must be at least 12 characters long"', () => {
      expect(response.body.message).to.be.equal("\"name\" length must be at least 12 characters long");
    });
  });

  describe('if the email is not passed correctly', () => {
    let response;

    before( async () => {
      response = await chai.request(app).post('/register').send({
        name: 'Rafael da Cunha Santos',
        email: "exemplo@gmail.",
        password: "123321"
      });
    });

    it('should return the status code 400', () => {
      expect(response).to.have.status(400);
    });
    it('should have the error message "\"email\" must be a valid email"', () => {
      expect(response.body.message).to.be.equal("\"email\" must be a valid email");
    });
  });

  describe('if the password is not passed correctly', () => {
    let response;

    before( async () => {
      response = await chai.request(app).post('/register').send({
        name: 'Rafael da Cunha Santos',
        email: "exemplo@gmail.com",
        password: "123"
      });
    });

    it('should return the status code 400', () => {
      expect(response).to.have.status(400);
    });
    it('should have the error message "\"password\" length must be at least 6 characters long"', () => {
      expect(response.body.message).to.be.equal("\"password\" length must be at least 6 characters long");
    });
  });

  describe('If the email already exists on the DB', () => {
    let response;

    before( async () => {
      response = await chai.request(app).post('/register').send({
        name: 'Rafael da Cunha Santos',
        email: "exemplo@gmail.com",
        password: "123321"
      });
    });

    it('should return the status code 409', () => {
      expect(response).to.have.status(409);
    });
    it('should have the error message "Email already registered"', () => {
      expect(response.body.message).to.be.equal('Email already registered');
    });
  });

  describe('If the name already exists on the DB', () => {
    let response;

    before( async () => {
      response = await chai.request(app).post('/register').send({
        name: 'Rafael da Cunha Santos',
        email: "email@dominio.com",
        password: "incorrectPassword"
      });
    });

    it('should return the status code 409', () => {
      expect(response).to.have.status(409);
    });
    it('should have the error message "Name already registered"', () => {
      expect(response.body.message).to.be.equal('Name already registered');
    });
  });

  describe('If the request is successful', () => {
    let response;

    before( async () => {
      response = await chai.request(app).post('/register').send({
        name: 'Rafael da Cunha Santos',
        email: "customer@deliveryapp.com",
        password: "--adm2@21!!--"
      });
    });

    it('should return the status code 201', () => {
      expect(response).to.have.status(201);
    });
    it('should return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });
    it('should have the keys "name", "email", "role" and "token"', () => {
      expect(response.body).to.have.keys(['name', 'email', 'role', 'token']);
    });
  });
});