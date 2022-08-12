const chai = require('chai');
const { stub } = require('sinon');
const chaiHttp = require('chai-http');
const { User, Sale, Product, SaleProduct } = require('../database/models');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../api/app');
const { sequelize } = require('../services/Customer');

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
    stub(Sale, 'findAll').resolves(orders);
  });

  after(() => {
    User.findOne.restore();
    Sale.findAll.restore();
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
        "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg",
        "salesProducts": {
          "quantity": 1
        }
      },
      {
        "id": 4,
        "name": "Brahma 600ml",
        "price": "7.50",
        "urlImage": "http://localhost:3001/images/heineken_600ml.jpg",
        "salesProducts": {
          "quantity": 1
        }
      }
    ]
  }

  before(() => {
    stub(User, 'findOne').resolves(customerMock);
    stub(Sale, 'findByPk').resolves(order);
  });

  after(() => {
    User.findOne.restore();
    Sale.findByPk.restore();
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

describe('Method POST /customer/checkout', () => {
  const customerMock = {
    id: 3,
    name: "Cliente Zé Birita",
    email: "zebirita@email.com",
    password: "1c37466c159755ce1fa181bd247cb925",
    role: "customer"
  }

  const wrongSale = {
    "sellerId": 1,
    "totalPrice": 42,
    "deliveryAddress": "--adm2@21!!--",
    "products": [{
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 4,
      "quantity": 2
    }
    ]
  }

  const saleToCreate = {
    "sellerId": 1,
    "totalPrice": 42,
    "deliveryAddress": "--adm2@21!!--",
    "deliveryNumber": "24",
    "products": [{
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 4,
      "quantity": 2
    }
    ]
  }

  before(() => {
    stub(User, 'findOne').resolves(customerMock);
    stub(Product, 'findAndCountAll')
      .onCall(0).resolves({ count: 1 })
      .onCall(1).resolves({ count: 2 });
    stub(sequelize, 'transaction').resolves();
  });

  after(() => {
    User.findOne.restore();
    Product.findAndCountAll.restore();
    sequelize.transaction.restore();
  });

  describe('If the information of the sale is not passed correctly', () => {
    let response;

    before( async () => {
      const { body: { token } } = await chai.request(app).post('/login').send({
        email: "zebirita@email.com",
        password: "$#zebirita#$"
      });
      response = await chai.request(app).post('/customer/checkout').set('authorization', token)
        .send(wrongSale);
    });

    it('should return the status code 400', () => {
      expect(response).to.have.status(400);
    });
    it('should return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });
    it('should return the error message ""deliveryNumber" is required"', () => {
      expect(response.body.message).to.be.equal('"deliveryNumber" is required');
    });
  });

  describe('If a productId is not found on the DB', () => {
    let response;

    before( async () => {
      const { body: { token } } = await chai.request(app).post('/login').send({
        email: "zebirita@email.com",
        password: "$#zebirita#$"
      });
      response = await chai.request(app).post('/customer/checkout').set('authorization', token)
        .send(saleToCreate);
    });

    it('should return the status code 404', () => {
      expect(response).to.have.status(404);
    });
    it('should return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });
    it('should return the error message ""productIds" not found"', () => {
      expect(response.body.message).to.be.equal('"productIds" not found');
    });
  });

  describe('If the request is successful', () => {
    let response;

    before( async () => {
      const { body: { token } } = await chai.request(app).post('/login').send({
        email: "zebirita@email.com",
        password: "$#zebirita#$"
      });
      response = await chai.request(app).post('/customer/checkout').set('authorization', token)
        .send(saleToCreate);
    });

    it('should return the status code 201', () => {
      expect(response).to.have.status(201);
    });
    it('should return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });
    it('should return the message "Sale successfully created"', () => {
      expect(response.body.message).to.be.equal('Sale successfully created');
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
    stub(Sale, 'update').resolves();
  });

  after(() => {
    User.findOne.restore();
    Sale.update.restore();
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