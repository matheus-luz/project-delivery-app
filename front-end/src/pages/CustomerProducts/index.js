import React from 'react';
import CardList from '../../components/CardList';
import Header from '../../components/Header';
import HeaderButton from '../../components/Header/HeaderButton';
import Button from '../../components/Library/Button';

function CustomerProducts() {
  return (
    <div className="h-screen w-screen">
      <Header>
        <HeaderButton
          to="/"
          testid="customer_products__element-navbar-link-products"
          label="Produtos"
        />
        <HeaderButton
          to="/"
          testid="customer_products__element-navbar-link-orders"
          label="Meus pedidos"
        />
      </Header>
      <CardList />
      <div className="absolute bottom-0 right-0 m-3">
        <Button
          testid="customer_products__button-cart"
        >
          Ver carrinho
        </Button>
      </div>
    </div>
  );
}

export default CustomerProducts;
