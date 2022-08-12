import React from 'react';
import Header from '../../components/Header';
import CardOrder from '../../components/CardOrder';

export default function Seller() {
  return (
    <div>
      <Header screen="Pedidos" />
      <CardOrder />
    </div>
  );
}
