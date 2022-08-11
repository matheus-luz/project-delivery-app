import PropTypes from 'prop-types';
import React, { useState } from 'react';

function Counter({ product }) {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <button
        className="bg-trybe-primary text-lg px-2 text-white rounded-l-lg"
        data-testid={ ` customer_products__button-card-rm-item-${product.id}` }
        type="button"
        onClick={ (() => setCounter(counter - 1)) }
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
        onClick={ (() => setCounter(counter + 1)) }
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
