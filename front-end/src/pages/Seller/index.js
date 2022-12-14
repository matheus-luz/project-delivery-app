import React from 'react';
import Header from '../../components/Header';
import HeaderButton from '../../components/Header/HeaderButton';
import CardOrder from '../../components/CardOrder';

export default function Seller() {
  return (
    <div>
      <Header>
        <HeaderButton
          to="/seller/orders"
          label="PEDIDOS"
          testid="customer_products__element-navbar-link-orders"
        />
      </Header>
      <CardOrder />
    </div>
  );
}
