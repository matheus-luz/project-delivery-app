import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/cartContext';

function Counter({ product }) {
  const [counter, setCounter] = useState(0);
  const { cart, setCart } = useContext(CartContext);

  const handleCounter = (operation) => {
    if (operation === 'increment') {
      setCounter((prev) => prev + 1);
    } else {
      setCounter((prev) => prev - 1);
    }

    const newCart = cart.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: counter };
      }
      return item;
    });
    setCart(newCart);
  };

  return (
    <div>
      <button
        className="bg-trybe-primary text-lg px-2 text-white rounded-l-lg"
        data-testid={ ` customer_products__button-card-rm-item-${product.id}` }
        type="button"
        onClick={ (() => handleCounter('decrease')) }
      >
        -
      </button>
      <input
        className="text-center text-lg"
        min={ 0 }
        data-testid={ `customer_products__input-card-quantity-${product.id} ` }
        type="text"
        readOnly
        value={ counter }
      />
      <button
        className="bg-trybe-primary text-lg px-2 text-white rounded-r-lg"
        data-testid={ `customer_products__button-card-add-item-${product.id} ` }
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
  }).isRequired,
};

export default Counter;
