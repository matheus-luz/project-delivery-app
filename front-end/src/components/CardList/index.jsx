import React from 'react';
import productsMock from '../../helpers/productsMock';
import CardProduct from '../CardProduct';

function CardProducts() {
  const data = productsMock;
  return (
    <>
      {
        data.map((product) => <CardProduct key={ product.id } product={ product } />)
      }
    </>
  );
}

export default CardProducts;
