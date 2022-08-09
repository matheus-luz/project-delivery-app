import React from 'react';
import productsMock from '../../helpers/productsMock';
import CardProduct from '../CardProduct';

function CardProducts() {
  const data = productsMock;
  console.log({ data });
  return (
    <>

      {
        data.map((product) => <CardProduct key={ product.id } product={ product } />)
      }
      <button
        type="button"
        data-testid="customer_products__checkout-bottom-value"
      >
        Ver Carrinho

      </button>
    </>
  );
}

export default CardProducts;
