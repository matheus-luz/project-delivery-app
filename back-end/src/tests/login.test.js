const chai = require('chai');
const { stub } = require('sinon');
const chaiHttp = require('chai-http');
const { User } = require('../database/models');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../api/app');

describe('Method POST /login', () => {
  const userMock = {
    name: "Delivery App Admin",
    email: "adm@deliveryapp.com",
    password: "a4c86edecc5aee06eff8fdeda69e0d04",
    role: "administrator"
  }

  before(() => stub(User, 'findOne')
                .onCall(0).resolves(null)
                .onCall(1).resolves(userMock)
                .onCall(2).resolves(userMock));

  after(() => User.findOne.restore());

  describe('if the email is not passed correctly', () => {
    let response;

    before( async () => {
      response = await chai.request(app).post('/login').send({
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
      response = await chai.request(app).post('/login').send({
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

  describe('If the user doesn\'t exists on the DB', () => {
    let response;

    before( async () => {
      response = await chai.request(app).post('/login').send({
        email: "exemplo@gmail.com",
        password: "123321"
      });
    });

    it('should return the status code 404', () => {
      expect(response).to.have.status(404);
    });
    it('should have the error message "Email is not registered"', () => {
      expect(response.body.message).to.be.equal('Email is not registered');
    });
  });

  describe('If the password passed is incorrect', () => {
    let response;

    before( async () => {
      response = await chai.request(app).post('/login').send({
        email: "email@dominio.com",
        password: "incorrectPassword"
      });
    });

    it('should return the status code 401', () => {
      expect(response).to.have.status(401);
    });
    it('should have the error message "Incorrect password"', () => {
      expect(response.body.message).to.be.equal('Incorrect password');
    });
  });

  describe('If the request is successful', () => {
    let response;

    before( async () => {
      response = await chai.request(app).post('/login').send({
        email: "email@dominio.com",
        password: "--adm2@21!!--"
      });
    });

    it('should return the status code 200', () => {
      expect(response).to.have.status(200);
    });
    it('should return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });
    it('should have the keys "name", "email", "role" and "token"', () => {
      expect(response.body).to.have.keys(['name', 'email', 'role', 'token']);
    });
  });
});