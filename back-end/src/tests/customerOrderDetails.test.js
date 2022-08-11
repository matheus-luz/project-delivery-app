const chai = require('chai');
const { stub } = require('sinon');
const chaiHttp = require('chai-http');
const { User } = require('../database/models');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../api/app');

describe('Method GET /customer/orders', () => {
  const customerMock = {
    id: 3,
    name: "Cliente Zé Birita",
    email: "zebirita@email.com",
    password: "1c37466c159755ce1fa181bd247cb925",
    role: "customer"
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
    stub(User, 'findOne').resolves(customerMock);
    stub(User, 'findByPk').resolves(orders);
  });

  after(() => {
    User.findOne.restore();
    User.findByPk.restore();
  });

  describe('If the request is successful', () => {
    let response;

    before( async () => {
      const { body: { token } } = await chai.request(app).post('/login').send({
        email: "zebirita@email.com",
        password: "$#zebirita#$"
      });
      response = await chai.request(app).get('/customer/orders').set('authorization', token);
    });

    it('should return the status code 200', () => {
      expect(response).to.have.status(200);
    });
    it('should return an array in the body', () => {
      expect(response.body).to.be.an('array');
    });
    it('should have all the purchases made by the customer', () => {
      expect(response.body).to.have.length(2);
    });
  });
});

describe('Method GET /customer/orders/:id', () => {
  const customerMock = {
    id: 3,
    name: "Cliente Zé Birita",
    email: "zebirita@email.com",
    password: "1c37466c159755ce1fa181bd247cb925",
    role: "customer"
  }

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
    stub(User, 'findOne').resolves(customerMock);
    stub(User, 'findByPk').resolves(order);
  });

  after(() => {
    User.findOne.restore();
    User.findByPk.restore();
  });

  describe('If the request is successful', () => {
    let response;

    before( async () => {
      const { body: { token } } = await chai.request(app).post('/login').send({
        email: "zebirita@email.com",
        password: "$#zebirita#$"
      });
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
    it('"products" should have the keys "id", "name", "price", "urlImage" and "salesProducts"', () => {
      expect(response.body.products[0]).to.have
        .keys(['id', 'name', 'price', 'salesProducts', 'urlImage']);
    });
    it('"salesProducts" should have the key "quantity"', () => {
      expect(response.body.products[0].salesProducts).to.have.key('quantity');
    });
  });
});

describe('Method PATCH /customer/orders/update/:id', () => {
  const customerMock = {
    id: 3,
    name: "Cliente Zé Birita",
    email: "zebirita@email.com",
    password: "1c37466c159755ce1fa181bd247cb925",
    role: "customer"
  }

  before(() => {
    stub(User, 'findOne').resolves(customerMock);
  });

  after(() => {
    User.findOne.restore();
  });

  describe('If the request is successful', () => {
    let response;

    before( async () => {
      const { body: { token } } = await chai.request(app).post('/login').send({
        email: "zebirita@email.com",
        password: "$#zebirita#$"
      });
      response = await chai.request(app).patch('/customer/orders/update/1').set('authorization', token);
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