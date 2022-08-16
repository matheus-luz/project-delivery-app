import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardList from '../../components/CardList';
import Header from '../../components/Header';
import HeaderButton from '../../components/Header/HeaderButton';
import Button from '../../components/Library/Button';
import CartContextProvider from '../../context/cartContext';

function CustomerProducts() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen">
      <CartContextProvider>
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
        <CardList />
        <div className="absolute bottom-0 right-0 m-3">
          <Button
            onClick={ () => navigate('/customer/checkout') }
            testid="customer_products__button-cart"
          >
            Ver carrinho
          </Button>
        </div>
      </CartContextProvider>
    </div>
  );
}

export default CustomerProducts;
