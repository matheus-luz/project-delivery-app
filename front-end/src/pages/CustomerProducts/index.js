import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CardList from '../../components/CardList';
import Header from '../../components/Header';
import HeaderButton from '../../components/Header/HeaderButton';
import Button from '../../components/Library/Button';
import { CartContext } from '../../context/cartContext';

function CustomerProducts() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const CART = 'cart';
  const products = cart.filter((e) => e.quantity > 0);

  if (!JSON.parse(localStorage.getItem(CART))) {
    localStorage.setItem(CART, JSON.stringify([]));
  }

  const setProducts = (key, data) => localStorage
    .setItem(key, JSON.stringify(data));

  const handleCartBtn = () => {
    setProducts(CART, products);
    navigate('/customer/checkout');
  };

  return (
    <div className="h-screen w-screen">
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
          onClick={ handleCartBtn }
          testid="customer_products__button-cart"
        >
          Ver carrinho
        </Button>
      </div>
    </div>
  );
}

export default CustomerProducts;
