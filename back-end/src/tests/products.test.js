const chai = require('chai');
const { stub } = require('sinon');
const chaiHttp = require('chai-http');
const { Product } = require('../database/models');
const generateToken = require('../utils/generateToken');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../api/app');

let chaiHttpResponse;

const productsMock = [
  {
    "id": 1,
    "name": "Skol Lata 250ml",
    "price": "2",
    "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg"
  },
  {
    "id": 2,
    "name": "Heineken 600ml",
    "price": "8",
    "urlImage": "http://localhost:3001/images/heineken_600ml.jpg"
  },
  {
    "id": 3,
    "name": "Antarctica Pilsen 300ml",
    "price": "2",
    "urlImage": "http://localhost:3001/images/antarctica_pilsen_300ml.jpg"
  },
]

describe('Route GET /customer/products', () => {
  before(() => stub(Product, "findAll").resolves(productsMock));

  after(() => Product.findAll.restore());

  it('If the request is successful', async () => {
  const token = generateToken(3, 'zebirita@email.com');

    chaiHttpResponse = await chai
      .request(app)
      .get('/customer/products')
      .set({"authorization": token})

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(productsMock);
  });

  it('If token is not found', async () => {
  const token = '';

    chaiHttpResponse = await chai
    .request(app)
    .get('/customer/products')
    .set({"authorization": token})

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Token not found');
  });

  it('If token is invalid', async () => {
  const token = 'invalidToken';
  
    chaiHttpResponse = await chai
    .request(app)
    .get('/customer/products')
    .set({"authorization": token})

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Expired or invalid token');
  });
});
