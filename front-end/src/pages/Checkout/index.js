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
      <Orders />
      <AddressDetails />
    </div>
  );
}

export default Checkout;
