import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardList from '../../components/CardList';
import Header from '../../components/Header';
import HeaderButton from '../../components/Header/HeaderButton';
import { CartContext } from '../../context/cartContext';
import { setProducts } from '../../utils/localStorage';

function CustomerProducts() {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const products = cart.filter((e) => e.quantity > 0);

  useEffect(() => {
    setDisabled(products.length === 0);
  }, [cart, products]);

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
      <div className="fixed bottom-0 right-0 m-3">
        <button
          className={ `tracking-wide 
          bg-trybe-primary 
          text-white 
          hover:bg-trybe-primary-dark 
          disabled:bg-slate-400
          uppercase
          text-lg
          py-2 px-4 rounded-lg` }
          onClick={ handleCartBtn }
          data-testid="customer_products__button-cart"
          disabled={ disabled }
          type="button"
        >
          Ver carrinho: R$
          <span data-testid="customer_products__checkout-bottom-value">
            { products.reduce((acc, e) => acc + e.price * e.quantity, 0)
              .toFixed(2)
              .replace(/\./, ',') }
          </span>
        </button>
      </div>
    </div>
  );
}

export default CustomerProducts;
