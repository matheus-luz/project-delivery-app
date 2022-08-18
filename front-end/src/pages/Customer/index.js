import React from 'react';
import Header from '../../components/Header';
import HeaderButton from '../../components/Header/HeaderButton';
import CardOrder from '../../components/CardOrder';

export default function Customer() {
  return (
    <div>
      <Header>
        <HeaderButton
          to="/customer/products"
          label="PRODUTOS"
          testid="customer_products__element-navbar-link-products"
        />
        <HeaderButton
          to="/customer/orders"
          label="MEUS PEDIDOS"
          testid="customer_products__element-navbar-link-orders"
        />
      </Header>
      <CardOrder />
    </div>
  );
}
