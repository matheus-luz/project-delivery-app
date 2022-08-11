const chai = require('chai');
const { stub } = require('sinon');
const chaiHttp = require('chai-http');
const { User } = require('../database/models');
const app = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Method GET /seller/orders', () => {
  const sellerMock = {
    id: 2,
    name: "Fulana Pereira",
    email: "fulana@deliveryapp.com",
    password: "3c28d2b0881bf46457a853e0b07531c6",
    role: "seller"
  }

  const orders = [
    {
      "user": {
        "id": 3,
        "name": "Cliente Zé Birita",
        "email": "zebirita@email.com",
        "role": "customer"
      },
      "seller": {
        "id": 2,
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
        "id": 3,
        "name": "Cliente Zé Birita",
        "email": "zebirita@email.com",
        "role": "customer"
      },
      "seller": {
        "id": 2,
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
    stub(User, 'findOne').resolves(sellerMock);
    stub(User, 'findAll').resolves(orders);
  });

  after(() => {
    User.findOne.restore();
    User.findAll.restore();
  });

  describe('If the request is successful', () => {
    let response;

    before( async () => {
      const { body: { token } } = await chai.request(app).post('/login').send({
        email: "fulana@deliveryapp.com",
        password: "fulana@123"
      });
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

describe('Method GET /seller/orders/:id', () => {
  const sellerMock = {
    id: 2,
    name: "Fulana Pereira",
    email: "fulana@deliveryapp.com",
    password: "3c28d2b0881bf46457a853e0b07531c6",
    role: "seller"
  }

  const order = {
    "saleDate": "01/06/2022",
    "id": 2,
    "totalPrice": "9.70",
    "status": "Entregue",
    "seller": {
      "name": "Fulana Pereira"
    },
    "products": [
      {
        "id": 1,
        "name": "Skol Lata 250ml",
        "price": "2.20",
        "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg",
        "salesProducts": {
          "quantity": 1
        }
      },
      {
        "id": 2,
        "name": "Heineken 600ml",
        "price": "7.50",
        "urlImage": "http://localhost:3001/images/heineken_600ml.jpg",
        "salesProducts": {
          "quantity": 1
        }
      }
    ]
  }

  before(() => {
    stub(User, 'findOne').resolves(sellerMock);
    stub(User, 'findAll').resolves(order);
  });

  after(() => {
    User.findOne.restore();
    User.findAll.restore();
  });

  describe('If the request is successful', () => {
    let response;

    before( async () => {
      const { body: { token } } = await chai.request(app).post('/login').send({
        email: "fulana@deliveryapp.com",
        password: "fulana@123"
      });
      response = await chai.request(app).get('/seller/orders/2').set('authorization', token);
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
    it('"products" should have the keys "id", "name", "price", "urlImage" and "salesProducts"', () => {
      expect(response.body.products[0]).to.have
        .keys(['id', 'name', 'price', 'salesProducts', 'urlImage']);
    });
    it('"salesProducts" should have the key "quantity"', () => {
      expect(response.body.products[0].salesProducts).to.have.key('quantity');
    });
  });
});

describe('Method PATCH /seller/orders/update/:id', () => {
  const sellerMock = {
    id: 2,
    name: "Fulana Pereira",
    email: "fulana@deliveryapp.com",
    password: "3c28d2b0881bf46457a853e0b07531c6",
    role: "seller"
  }

  before(() => {
    stub(User, 'findOne').resolves(sellerMock);
  });

  after(() => {
    User.findOne.restore();
  });

  describe('If the status passed isn\'t a valid one', () => {
    let response;

    before( async () => {
      const { body: { token } } = await chai.request(app).post('/login').send({
        email: "fulana@deliveryapp.com",
        password: "fulana@123"
      });
      response = await chai.request(app).patch('/seller/orders/update/1').set('authorization', token).send({
        status: 'A caminho'
      });
    });

    it('should return the status code 400', () => {
      expect(response).to.have.status(400);
    });
    it('should return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });
    it('should return the error message ""status" must be one of [Em Trânsito, Preparando]"', () => {
      expect(response.body.message).to.be.equal('"status" must be one of [Em Trânsito, Preparando]');
    });
  });

  describe('If the request is successful', () => {
    let response;

    before( async () => {
      const { body: { token } } = await chai.request(app).post('/login').send({
        email: "fulana@deliveryapp.com",
        password: "fulana@123"
      });
      response = await chai.request(app).patch('/seller/orders/update/1').set('authorization', token).send({
        status: 'Preparando'
      });
    });

    it('should return the status code 200', () => {
      expect(response).to.have.status(200);
    });
    it('should return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });
    it('should return the message "Updated"', () => {
      expect(response.body.message).to.be.equal('Updated');
    });
  });
});