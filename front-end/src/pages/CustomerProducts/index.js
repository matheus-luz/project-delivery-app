import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CardList from '../../components/CardList';
import Header from '../../components/Header';
import HeaderButton from '../../components/Header/HeaderButton';
import Button from '../../components/Library/Button';
import { CartContext } from '../../context/cartContext';
import { setProducts } from '../../utils/localStorage';

function CustomerProducts() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const products = cart.filter((e) => e.quantity > 0);

  const handleCartBtn = () => {
    setProducts(products);
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
