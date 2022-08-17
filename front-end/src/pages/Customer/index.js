import React from 'react';
import Header from '../../components/Header';
import HeaderButton from '../../components/Header/HeaderButton';
import CardOrder from '../../components/CardOrder';

export default function Seller() {
  return (
    <div>
      <Header>
        <HeaderButton
          to=""
          label="Produtos"
        />
        <HeaderButton
          to=""
          label="Meus Pedidos"
        />
      </Header>
      <CardOrder />
    </div>
  );
}
