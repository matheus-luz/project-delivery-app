import React from 'react';
import Header from '../../components/Header';

function MyDetails() {
  return (
    <div>
      <Header />
      <h1>Meus Pedidos</h1>
      <div>
        <h4
          data-testid="customer_orders__element-order-id-<id>"
        >
          Pedido 0001
        </h4>

        <h3
          data-testid="customer_orders__element-delivery-status-<id>"
        >
          PENDENTE
        </h3>

        <h4
          data-testid="customer_orders__element-order-date-<id>"
        >
          08/04/2021
        </h4>

        <h4
          data-testid="customer_orders__element-card-price-<id>"
        >
          23,80
        </h4>
      </div>
    </div>
  );
}
export default MyDetails;
