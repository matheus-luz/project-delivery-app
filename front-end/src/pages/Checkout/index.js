import React from 'react';
import AddressDetails from '../../components/Checkout/AddressDetails';
import Orders from '../../components/Checkout/Orders';
import Header from '../../components/Header';
import HeaderButton from '../../components/Header/HeaderButton';

function Checkout() {
  return (
    <div>
      <Header>
        <HeaderButton
          to="/customer/products"
          testid="customer_products__element-navbar-link-products"
          label="Produtos"
        />
        <HeaderButton
          to="/customer/orders"
          testid="customer_products__element-navbar-link-orders"
          label="Meus pedidos"
        />
      </Header>
      <div
        className="flex flex-col items-center justify-center"
      >
        <div className="mt-5">
          <h1 className="font-bold text-xl text-trybe-primary-dark">
            Finalizar pedido
          </h1>
          <Orders />
        </div>
        <AddressDetails />
      </div>
    </div>
  );
}

export default Checkout;
