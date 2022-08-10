const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /seller', () => {

  it('', async () => {
    const chaiHttpResponse = await chai.request(app)
    .get('/seller/orders').send();

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.eql();
  });

  it('', async () => {
    const chaiHttpResponse = await chai.request(app)
    .get('/seller/orders/2').send();

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.eql();
  });
});