import React from 'react';
import AdressDetails from '../../components/Checkout/AdressDetails';
import FinalizingOrder from '../../components/Checkout/finalizingOrder';
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
      <FinalizingOrder />
      <AdressDetails />
    </div>
  );
}

export default Checkout;
