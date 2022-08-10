const chai = require('chai');
const { stub } = require('sinon');
const chaiHttp = require('chai-http');
const { User } = require('../database/models');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../api/app');
const generateToken = require('../utils/generateToken');

const token = generateToken(999, 'customer')

describe.only('Method GET /customer/orders/:id', () => {
  const order = {
    "saleDate": "01/07/2022",
    "id": 1,
    "totalPrice": "15.00",
    "status": "Em Trânsito",
    "seller": {
      "name": "Fulana Pereira"
    },
    "products": [
      {
        "id": 2,
        "name": "Heineken 600ml",
        "price": "7.50",
        "salesProducts": {
          "quantity": 1
        }
      },
      {
        "id": 4,
        "name": "Brahma 600ml",
        "price": "7.50",
        "salesProducts": {
          "quantity": 1
        }
      }
    ]
  }

  before(() => {
    stub(User, 'findByPk').resolves(order);
  });

  after(() => {
    User.findByPk.restore();
  });

  describe('If the request is successful', () => {
    let response;

    before( async () => {
      response = await chai.request(app).get('/customer/orders/1').set('authorization', token);
    });

    it('should return the status code 200', () => {
      expect(response).to.have.status(200);
    });
    it('should return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });
    it('should have the keys "saleDate", "id", "totalPrice", "status", "seller" and "products"', () => {
      expect(response.body).to.have
        .keys(['saleDate', 'id', 'totalPrice', 'status', 'seller', 'products']);
    });
    it('"seller" should have the key "name"', () => {
      expect(response.body.seller).to.have.key('name');
    });
    it('"products" should have the keys "id", "name", "price" and "salesProducts"', () => {
      expect(response.body.products[0]).to.have.keys(['id', 'name', 'price', 'salesProducts']);
    });
    it('"salesProducts" should have the key "quantity"', () => {
      expect(response.body.products[0].salesProducts).to.have.key('quantity');
    });
  });
});