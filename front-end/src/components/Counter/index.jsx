import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../context/cartContext';

function Counter({ product }) {
  const { cart, setCart } = useContext(CartContext);

  const handleCounter = (operation, quantity) => {
    const products = [...cart];
    const i = products.findIndex((item) => item.id === product.id);

    if (operation === 'increment') {
      products[i].quantity += 1;
    } else if (operation === 'decrement') {
      if (products[i].quantity > 0) products[i].quantity -= 1;
    } else if (operation === 'set') {
      products[i].quantity = quantity;
    }

    setCart(products);
  };

  return (
    <div>
      <button
        className="bg-trybe-primary text-lg px-2 text-white rounded-l-lg"
        data-testid={ `customer_products__button-card-rm-item-${product.id}` }
        type="button"
        onClick={ (() => handleCounter('decrement')) }
      >
        -
      </button>
      <input
        className="text-center text-lg"
        data-testid={ `customer_products__input-card-quantity-${product.id}` }
        type="number"
        value={ product.quantity }
        onChange={ ((e) => handleCounter('set', e.target.value)) }
      />
      <button
        className="bg-trybe-primary text-lg px-2 text-white rounded-r-lg"
        data-testid={ `customer_products__button-card-add-item-${product.id}` }
        type="button"
        onClick={ (() => handleCounter('increment')) }
      >
        +
      </button>
    </div>
  );
}

Counter.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default Counter;
