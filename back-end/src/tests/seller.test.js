const chai = require('chai');
const { stub } = require('sinon');
const chaiHttp = require('chai-http');
const { User } = require('../database/models');
const app = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;
const generateToken = require('../utils/generateToken');

const token = generateToken(999, 'customer')

describe('Method GET /seller/orders', () => {
  const orders = [
    {
      "user": {
        "name": "Cliente Zé Birita",
        "email": "zebirita@email.com",
        "role": "customer"
      },
      "seller": {
        "name": "Fulana Pereira",
        "email": "fulana@deliveryapp.com",
        "role": "seller"
      },
      "order": {
        "address": "Rua Liberdade",
        "adressNumber": "19",
        "saleDate": "01/07/2022",
        "totalPrice": "15.00",
        "status": "Em Trânsito"
      }
    },
    {
      "user": {
        "name": "Cliente Zé Birita",
        "email": "zebirita@email.com",
        "role": "customer"
      },
      "seller": {
        "name": "Fulana Pereira",
        "email": "fulana@deliveryapp.com",
        "role": "seller"
      },
      "order": {
        "address": "Rua Alfeneiros",
        "adressNumber": "14",
        "saleDate": "01/06/2022",
        "totalPrice": "9.70",
        "status": "Entregue"
      }
    }
  ]

  before(() => {
    stub(User, 'findAll').resolves(orders);
  });

  after(() => {
    User.findAll.restore();
  });

  describe('If the request is successful', () => {
    let response;

    before( async () => {
      response = await chai.request(app).get('/seller/orders').set('authorization', token);
    });

    it('should return the status code 200', () => {
      expect(response).to.have.status(200);
    });
    it('should return an array in the body', () => {
      expect(response.body).to.be.an('array');
    });
    it('should have all the sales made by the seller', () => {
      expect(response.body).to.have.length(2);
    });
  });
});